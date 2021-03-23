layui.config({
    base:'/libs/'
}).extend({
    cookie:'/js-cookie/cookie'
});
layui.define(['jquery','cookie'],function(exports){
    var $ = layui.$;
    var cookie = layui.cookie;

    var shenzc = {
        get: function(json){
            $.ajax({
                url:"http://127.0.0.1:3000"+json.url,
                method:'GET',
                async:json.async,
                beforeSend: function (XMLHttpRequest) {
                     //传递token
                     XMLHttpRequest.setRequestHeader("Authorization", $.cookie('token'));
                },
                success:function(data){
                    json.success(data)
                },
                error:function (data) {
                    if ("当前用户未登录，请登录！！！"  === data.responseJSON.message ) {
                        //layer.msg("请登录！！！！！！")
                        location.href="login";
                    }else {
                        json.success(data)
                    }
                }
            })
        },
        post:function (json) {
            $.ajax({
                url:"http://127.0.0.1:3000"+json.url,
                method:'POST',
                contentType: "application/json",
                data:json.data,
                async:json.async,
                beforeSend: function (XMLHttpRequest) {
                    //传递token
                    XMLHttpRequest.setRequestHeader("Authorization", $.cookie('token'));
                },
                success:function(data){
                    json.success(data)
                },
                error:function (data) {
                    if ("当前用户未登录，请登录！！！"  === data.responseJSON.message ) {
                        layer.msg("请登录！！！！！！")
                    }else {
                        json.success(data)
                    }
                }
            })
        }
    };

    //输出test接口
    exports('shenzc', shenzc);
});