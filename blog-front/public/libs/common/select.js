layui.config({
    base:'/libs/'
}).extend({
    formSelects:'/form-select/formSelects-v4',
    shenzc:'/common/ajax'
});
layui.link('/libs/form-select/formSelects-v4.css');
layui.define(['jquery','form','formSelects','layer'],function(exports){
    var $    = layui.$
    formSelects = layui.formSelects,
        shenzc = layui.shenzc,
        layer = layui.layer,
        form = layui.form;

    var shenzcSelect = {

        //初始化下拉框(如果有默认值，则赋值默认值)
        load:function(json){
            //id和字典中的name一样
            shenzc.get({
                url:'/article/dict/getDictByName?dictName='+json.name,
                async: false,
                success:function (data2) {
                    if (data2.code == 200){
                        var data1 = data2.data
                        let str='<option value="全部"></option>';
                        data1.forEach(function (data) {
                            if (json.value != undefined){
                                console.log(data.value)
                                if (json.value === data.value){
                                    str+='<option value="'+data.value+'" selected>'+data.name+'</option>';
                                }else {
                                    str+='<option value="'+data.value+'">'+data.name+'</option>';
                                }
                            }else {
                                str+='<option value="'+data.value+'">'+data.name+'</option>';
                            }
                        })
                        var selected = "#"+json.name
                        $(selected).html(str);
                        form.render();
                    }else if (data2.code == 500){
                        layer.msg("字典值中没有:"+json.name)
                    }
                },
                error:function (data1) {
                    console.log(data1)
                }
            })
        },

        //selects多选初始化
        selectsData: function (json) {
            formSelects.data(json.id, 'server', {
                url:"http://127.0.0.1:3000"+json.url,
                keyword: json.keyword,
                //开启联动
                linkage: true
            });
        },

        //selects多选点击事件
        selectsOn: function (json) {
            formSelects.on(json.id, function(id, vals, val, isAdd, isDisabled){
                //id:           点击select的id
                //vals:         当前select已选中的值
                //val:          当前select点击的值
                //isAdd:        当前操作选中or取消
                //isDisabled:   当前选项是否是disabled
                //如果return false, 那么将取消本次操作
                json.opreate(val,isAdd)
            })
        },

        //selects多选赋值
        selectsValue: function (id,arr) {
            formSelects.value(id, arr);
        },


    };

    //输出test接口
    exports('shenzcSelect', shenzcSelect);
});