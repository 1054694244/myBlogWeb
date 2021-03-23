layui.define(['jquery','table'],function(exports){
    var $ = layui.$,
        table = layui.table;

    var shenzcTable = {
        //表单初始化
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

        //表格重载
        reload:function (json) {
            table.reload(json.elem,{
                where: json.where
            });
        },

        //数据表格字段格式化取字典值
        commbo:function (value,dictName) {
            var result = ""
            $.ajax({
                url:'http://127.0.0.1:3000/article/dict/getDictByName?dictName='+dictName,
                method:'GET',
                async: false,
                success:function (data2) {
                    if (data2.code == 200){
                        var data1 = data2.data
                        data1.forEach(function (data) {
                            if (data.value == value){
                                result =  data.name
                            }
                        })
                        return result
                    }else if (data2.code == 500){
                        layer.msg("字典值中没有:"+dictName)
                    }
                }
            })
            return result
        },

        //列表栏操作
        tool:function (json) {
            table.on('tool('+json.elem+')', function (obj) {
               json.opreate(obj)
            });
        }

};
    
    
    //输出test接口
    exports('shenzcTable', shenzcTable);
});