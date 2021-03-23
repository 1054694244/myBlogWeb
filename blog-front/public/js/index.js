layui.config({
    base:'/libs/'
}).extend({
    shenzc:'/common/ajax',
    cookie:'/js-cookie/cookie'
}).use(['element','layer','jquery','shenzc','carousel','cookie'], function(){
    var element = layui.element
        ,layer = layui.layer,
        shenzc= layui.shenzc,
        cookie=layui.cookie,
        carousel = layui.carousel;
    var $ = layui.jquery;
    var layer;


    network();

    function network(){

        //渲染上面
        //loadTop();

        //渲染左边分类
        loadLeft();
        //渲染中间
        loadCenter()
        //渲染右边
        loadRight()

    }

    function loadLeft() {
        shenzc.get({
            url: '/article/category/getParentCategory',
            async: false,
            success: function(data) {
                console.log(data)
                if (data.code===200) {
                    console.log(data.data)
                    console.log("请求数据成功");
                    var categoryList = data.data;
                    var html = "";
                    categoryList.forEach(function (category) {
                        html = html + "<a class='layui-btn layui-btn-primary' style='background-color:Transparent;border-color:Transparent;border-style:None'>"+category.categoryName+"</a>" + "<br>";
                    })
                    //html.appendTo("#left")
                    $("#left").html(html)
                } else{
                    layer.msg('暂无数据');
                }
            },
            error:function() {
                layer.msg("请求失败！");
            }
        })
    }

    function loadCenter() {
        //设置轮播图
        /*shenzc.get({
            url: '/front/img/getRotationChart',
            async: false,
            success: function(data) {
                if (data.code===200) {
                   var imgs = data.data;
                   var html = "";
                   imgs.forEach(function (data) {
                       html = html + "<div>"+"<img src='"+"' style='width: 100%;height: 100%'/>"+"</div>"
                   })
                    $("#img").append(html)
                } else{
                    layer.msg('暂无数据');
                }
            },
            error:function() {
                layer.msg("请求失败！");
            }
        })*/
        var html = "<div><img src='../images/123.jpeg' style='width: 100%;height: 100%'/></div>" +
            "<div><img src='../images/123.jpeg' style='width: 100%;height: 100%'/></div>\"";
        $("#rotationChartImg").append(html)
        carousel.render({
            elem: '#rotationChart'
        });
    }

    function loadRight() {

    }

})