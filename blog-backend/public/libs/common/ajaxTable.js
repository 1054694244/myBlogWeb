layui.config({
    base:'/libs/'
}).extend({
    cookie:'/js-cookie/cookie'
});
layui.define(['jquery','table','cookie'],function(exports){
    var $ = layui.$,
        cookie = layui.cookie,
        table = layui.table;



    var shenzcTable = {
        render: function(json){
            table.render({
                elem: json.elem,
                headers:{
                    "Authorization" : $.cookie('token'),
                },
                url: 'http://127.0.0.1:3000'+json.url, //数据接口
                contentType: "application/json; charset=utf-8",
                method: "post",
                page: json.page,
                response:{
                    statusCode: 200
                },
                parseData: function (res) {
                    return {
                        "data": res.data.list,
                        "count": res.data.total,
                        "code": res.code,
                        "msg": res.msg
                    }
                },
                cols: json.cols,
                error:function (data) {
                    if ("当前用户未登录，请登录！！！"  === data.message ) {
                        layer.msg("请登录！！！！！！")
                        location.href="../login";
                    }
                }
            });
        },
        
        reload:function (json) {
            table.reload(json.elem,{
                where: json.where
            });
        }
    };
    
    
    //输出test接口
    exports('shenzcTable', shenzcTable);
});