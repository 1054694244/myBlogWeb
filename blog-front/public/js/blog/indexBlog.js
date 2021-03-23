layui.config({
    base:'/libs/'
}).extend({
    shenzc:'/common/ajax'
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
        //loadLeft();
        //渲染中间
        //loadCenter()
    }


    $("#upload").on('click',function () {
        location.href = '/download/upload'
    })

    $("#head").attr({src:'https://edu-shenzc.oss-cn-beijing.aliyuncs.com/blog/2020/11/04/02c39e16-134c-4135-a4f8-7a55ec1b202e.png'})
    $("#name").text("shenzc")


})