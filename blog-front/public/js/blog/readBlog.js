layui.config({
    base:'/libs/'
}).extend({
    shenzc:'/common/ajax',
});
layui.use(['element','layer','jquery','shenzc','form'], function(){
    var element = layui.element
        ,layer = layui.layer,
        shenzc= layui.shenzc,
        form = layui.form;
    var $ = layui.$;
    var layer;

    var index = 0;


    network();

    function network(){
        //初始化个人信息
        loadUserInfo()
    }

    function loadUserInfo() {
        $("#head").attr({src:'https://edu-shenzc.oss-cn-beijing.aliyuncs.com/blog/2020/11/04/02c39e16-134c-4135-a4f8-7a55ec1b202e.png'})
        $("#name").text("shenzc")
        $("#age").text("25")
        $("#auth").text("金牌")
    }



})