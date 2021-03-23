layui.config({
    base:'/libs/'
}).extend({
    shenzc:'/common/ajax',
}).use(['element','layer','jquery','shenzc','carousel'], function(){
    var element = layui.element
        ,layer = layui.layer,
        shenzc= layui.shenzc,
        carousel = layui.carousel;
    var $ = layui.$;
    var layer;


    network();

    function network(){

        //渲染左边分类
        loadLeft();

    }

    function loadLeft() {
        shenzc.get({
            url: '/frontManage/menu/getAllMenu',
            async: false,
            success: function(data) {
                if (data.code===200) {
                    console.log(data.data)
                    console.log("请求数据成功");
                    var menuList = data.data;
                    //生成导航栏
                    loadTree(menuList);
                } else{
                    layer.msg('暂无数据');
                }
            },
            error:function() {
                layer.msg("请求失败！");
            }
        })
    }

    //加载菜单
    function loadTree(menuList){
        //判断是否有子节点
        menuList.forEach(function (menu) {
            var childList = menu.childFrontMenu;
            if(childList==null||childList==undefined||childList==""){
                loadParentMenu(menu)
            }else {
                loadChildMenu(menu)
            }
        })
        //渲染
        xuanran()
    }

    //加载没有子元素菜单
    function loadParentMenu(data){
        var fragment = document.getElementById("left_nav");
        var list = document.createElement('li');
        list.className="layui-nav-item";
        //aa
        list.innerHTML='<a class="site-demo-active"  data-menuId='+data.menuId+' data-src='+data.url+'>'+data.menuName+'</a>';
        fragment.appendChild(list);
        //console.log("1.=顶级菜单列表加载完毕");
    }

    //加载有子元素菜单
    function loadChildMenu(data){
        var fragment = document.getElementById("left_nav");
        var list = document.createElement('li');
        list.className="layui-nav-item";
        var child_one_Html='<a href="javascript:;">'+data.menuName+'</a>';
        var childmenus=data.childFrontMenu;
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

    function xuanran() {
        var layFilter = $("#left_nav").attr('lay-filter');
        element.render('nav', layFilter);

        // //当点击有site-demo-active属性的标签时，即左侧菜单栏中内容 ，触发点击事件
        $('.site-demo-active').on('click', function () {
            var dataid = $(this);
            //直接转换页面
            var url = dataid.attr("data-src")
            $("#iframe").attr("src",url)
        });

        console.log("==列表添加完后再次执行渲染");
    }

    $("#button").on('click',function () {
        $("#iframe").attr("src","/blog/writeBlog")
    })


})