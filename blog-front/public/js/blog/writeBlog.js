layui.config({
    base:'/libs/'
}).extend({
    shenzc:'/common/ajax',
    cookie:'/js-cookie/cookie',
    shenzcSelect:'/common/select',
});
layui.link('/libs/form-select/formSelects-v4.css');
layui.use(['element','layer','jquery','shenzc','carousel','cookie','layedit','shenzcSelect','form'], function(){
    var element = layui.element
        ,layer = layui.layer,
        shenzc= layui.shenzc,
        cookie=layui.cookie,
        layedit = layui.layedit,
        shenzcSelect = layui.shenzcSelect,
        form = layui.form,
        carousel = layui.carousel;
    var $ = layui.$;
    var layer;

    var index = "";


    network();

    function network(){
        //查看是新增还是编辑
        let isInsert = init();
        //渲染富文本编辑器
        index = layedit.build('blogContent');
        //初始话多选下拉框数据
        if (isInsert){
            loadFormSelects();
            initSelect();
        }
    }

    function initSelect(val) {
        shenzcSelect.load({
            name:"blogType",
            value:val
        })
    }

    function init() {
        var loc = location.href;
        var n1 = loc.length;//地址的总长度
        var n2 = loc.indexOf("=");//取得=号的位置
        //如果是新增就没有blogId
        if (n2 == -1){
            return true;
        }
        var id = decodeURI(loc.substr(n2+1, n1-n2));//从=号后面的内容
        shenzc.get({
            url:'/selfArticle/blog/getBlogById?id='+id,
            async:false,
            success:function (data) {
                if (data.code == 200){
                    console.log(data.data)
                    data = data.data
                    $("#blogId").val(data.blogId);
                    $("#blogTitle").val(data.title)
                    //初始化下拉框
                    initSelect(data.type)
                    $("#blogType").val()
                    //富文本先赋值，后渲染
                    $("#blogContent").val(data.content)
                    var categoryIdList = data.categoryIds.split(",");
                    loadFormSelects()
                    setTimeout(function() {selectValue("category2",categoryIdList);},500);	//延迟加载 不然标签显示不出来
                }
            }
        })
    }

    //初始化下拉框复制
    function selectValue(id,arr) {
        shenzcSelect.selectsValue(id,arr);
    }

    //加载单选下拉框
    function loadFormSelects() {
        shenzcSelect.selectsData({
            id: "category2",
            url: '/article/category/getAllCategory'
        })
    }

    //监听selects多选下拉框
    shenzcSelect.selectsOn({
        id: "category2",
        opreate:function (val,isAdd) {
            console.log(val)
            var html = ""
            if (isAdd){
                if (val.value.indexOf('/')){
                    var arr = val.value.split('/')
                    var idValue = arr[1]
                }else {
                    var idValue = val.value
                }
                html += "<div class='divClass' id='"+idValue+"'>"
                html += "<input type='button' value='"+val.name+"'class='inputClass'/>"
                html += "<i class='layui-icon layui-icon-close iconClass' id='"+val.value+"'></i>"
                html += "</div>"
                $("#category").append(html)
            }else {
                if (val.value.indexOf('/')){
                    var arr = val.value.split('/')
                    var select = "#"+arr[1]
                }else {
                    var select = "#"+val.value
                }
                $(select).remove()
            }
        }
    })

    //表单提交事件
    form.on('submit(submitBlog)',function () {
        var data = form.val("formTest");
        var content = layedit.getContent(index);
        data.status = 2
        data.content = content
        console.log(data)
        shenzc.post({
            url: "/selfArticle/blog/submitBlog",
            data: JSON.stringify(data),
            success:function (data) {
                if (data.code == 200){
                    layer.msg('文章添加成功');
                    layer.closeAll();
                }else {
                    layer.msg('文章添加失败');
                }
            }
        })
        return false; // 阻止表单跳转
    });

    //表单提交事件
    form.on('submit(saveBlog)',function () {
        var data = form.val("formTest");
        var content = layedit.getContent(index);
        data.status = 1
        data.content = content
        console.log(data)
        shenzc.post({
            url: "/selfArticle/blog/submitBlog",
            data: JSON.stringify(data),
            success:function (data) {
                if (data.code == 200){
                    layer.msg('文章添加成功');
                    layer.closeAll();
                }else {
                    layer.msg('文章添加失败');
                }
            }
        })
        return false; // 阻止表单跳转
    });



})