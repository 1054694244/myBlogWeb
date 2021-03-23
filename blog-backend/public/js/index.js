layui.config({
    base:'/libs/'
}).extend({
    shenzc:'/common/ajax',
    cookie:'/js-cookie/cookie'
}).use(['element','layer','jquery','shenzc','cookie'], function(){
    var element = layui.element
        ,layer = layui.layer,
        cookie = layui.cookie,
        shenzc= layui.shenzc;
    var $ = layui.$;
    var layer;


    network();
    /*
     * @todo 重新计算iframe高度
     */
    function FrameWH() {
        var h = $(window).height() - 164;
        console.log(h)
        //console.log("高度问题=="+h);
        $("iframe").css("height", h + "px");
        var w = $(window).width() - 164;
        $("iframe").css("width", w + "px");
    }
    function network(){

        //获取从login页面传来的值
        /*var loc = location.href;
        var n1 = loc.length;//地址的总长度
        var n2 = loc.indexOf("=");//取得=号的位置
        var roleId = decodeURI(loc.substr(n2+1, n1-n2));//从=号后面的内容*/

        shenzc.get({
            url: '/manage/menu/getMenu',
            async: false,
            success: function(res) {
                //console.log("首页请求结果=="+JSON.stringify(res));
                if (res.code===200) {
                    console.log(res.data)
                    console.log("请求数据成功");
                    loadnav(res.data);
                } else{
                    layer.msg('暂无数据');
                }
            },
            error:function() {
                layer.msg("请求失败！");
            }
        })
    }
    function loadnav (navdata) {
        for (var i=0;i<navdata.length;i++) {
            var  first_menu=navdata[i];
            var  childMenus=first_menu.menuList;
            //console.log("子菜单=="+JSON.stringify(childMenus));
            if(childMenus==null||childMenus==undefined||childMenus==""){
                //console.log("没有子菜单=="+first_menu.name);
                loadTopMenu(first_menu);
            }else{
                //console.log("有子菜单=="+first_menu.name);
                loadHasChildMenu(first_menu);
            }
        }
        //列表添加完后再次执行渲染
        xuanran();
        //设置用户名
        $("#username").text($.cookie("username"))
    }
    //加载带有子菜单的
    function loadHasChildMenu(data){
        var fragment = document.getElementById("left_nav");
        var list = document.createElement('li');
        list.className="layui-nav-item";
        var child_one_Html='<a href="javascript:;">'+data.menuName+'</a>';
        var childmenus=data.menuList;
        var child_two_Html='<dl class="layui-nav-child">';
        var childHtmls="";
        for (var i=0;i<childmenus.length;i++) {
            var childmenu=childmenus[i];
            //console.log("1.=多级菜单列表=="+childmenu.name+"=="); data-title
            var childHtml='<dd><a class="site-demo-active" data-menuId='+childmenu.menuId+' data-src='+childmenu.url+' data-title='+childmenu.menuName+'>'+childmenu.menuName+'</a></dd>';
            childHtmls+=childHtml;
        }
        child_two_Html +=childHtmls+'</dl>';
        list.innerHTML=child_one_Html+child_two_Html;
        fragment.appendChild(list);
        //console.log("2.=多级菜单列表加载完毕");
    }
    //加载顶级菜单(没有子菜单)
    function loadTopMenu(data){
        var fragment = document.getElementById("left_nav");
        var list = document.createElement('li');
        list.className="layui-nav-item";
        //aa
        list.innerHTML='<a class="site-demo-active"  data-menuId='+data.menuId+' data-src='+data.url+'>'+data.menuName+'</a>';
        fragment.appendChild(list);
        //console.log("1.=顶级菜单列表加载完毕");
    }
    function xuanran() {
        layui.use(['element','layer'], function(){
            var element = layui.element;
            layer=layui.layer;

            var layFilter = $("#left_nav").attr('lay-filter');
            element.render('nav', layFilter);

            var active = {
                //在这里给active绑定几项事件，后面可通过active调用这些事件
                tabAdd: function (url, id, name) {
                    //新增一个Tab项 传入三个参数，分别对应其标题，tab页面的地址，还有一个规定的id，是标签中data-id的属性值
                    var body_url=url;
                    console.log("要切换的页面地址="+body_url);
                    element.tabAdd('demo', {
                        title: name,
                        content: '<iframe data-frameid="' + id + '" scrolling="auto" frameborder="0" src="' + body_url + '"></iframe>',
                        id: id //规定好的id
                    })
                    FrameWH();  //计算iframe层的大小
                },
                tabChange: function (id) {
                    //切换到指定Tab项
                    element.tabChange('demo', id); //根据传入的id传入到指定的tab项
                },
                tabDelete: function (id) {
                    element.tabDelete("demo", id);//删除
                }
            };
            // //当点击有site-demo-active属性的标签时，即左侧菜单栏中内容 ，触发点击事件
            $('.site-demo-active').on('click', function () {
                var dataid = $(this);
                if ($(".layui-tab-title li[lay-id]").length <= 0) {
                    //如果比零小，则直接打开新的tab项
                    //console.log("1.没有tab页，新建tab页");
                    console.log("2.没有tab页，新建tab页=="+dataid.text()+"=="+dataid.attr("data-menuId")+"==="+dataid.attr("data-title"));
                    active.tabAdd(dataid.attr("data-src"), dataid.attr("data-menuId"),dataid.attr("data-title"));
                } else {
                    //否则判断该tab项是否以及存在
                    var isData = false; //初始化一个标志，为false说明未打开该tab项 为true则说明已有
                    $.each($(".layui-tab-title li[lay-id]"), function () {
                        //如果点击左侧菜单栏所传入的id 在右侧tab项中的lay-id属性可以找到，则说明该tab项已经打开
                        if ($(this).attr("lay-id") == dataid.attr("data-menuId")) {
                            console.log("如果点击左侧菜单栏所传入的id 在右侧tab项中的lay-id属性可以找到，则说明该tab项已经打开");
                            isData = true;
                        }
                    })
                    if (isData == false) {
                        //标志为false 新增一个tab项
                        console.log("新增一个tab项")
                        active.tabAdd(dataid.attr("data-src"), dataid.attr("data-menuId"),dataid.attr("data-title"));
                    }
                }
                //最后不管是否新增tab，最后都转到要打开的选项页面上
                active.tabChange(dataid.attr("data-menuId"));
            });
        })
        console.log("==列表添加完后再次执行渲染");
    }
})