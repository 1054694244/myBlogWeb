layui.config({
    base: '/libs/js-cookie/'
});
layui.use(['jquery','cookie'],function () {
    var $ = layui.$
        cookie = layui.cookie;

    var str = "";
    //判断是否登录
    if ($.cookie("username") == undefined ||$.cookie("username") == "null"){
        str += "<li class='layui-nav-item'><a href='/login' target=“_parent”>登录/注册</a></li>";
    } else {
        str +="<li class='layui-nav-item'><a href='/blog/manageBlog' target=“_parent” id='blogManage'>写作中心</a></li>"
        str +="<li class='layui-nav-item'>";
        str +="<a href='javascript:;'>";
        str +="<img src='http://t.cn/RCzsdCq' class='layui-nav-img' id='head'>";
        str +="<span id='username'>"+$.cookie("username")+"</span>";
        str +="</a>";
        str +="<dl class='layui-nav-child'> <dd><a href=''>基本资料</a></dd> <dd><a href=''>安全设置</a></dd> </dl>"
        str +="</li>";
        str +="<li class='layui-nav-item'><a href='' id='exit'>退了</a></li>"
    }
    $("#userInfo").html(str)


    $("#exit").on('click',function () {
        $.cookie("username",undefined);
        $.cookie("token",undefined);
    })

})