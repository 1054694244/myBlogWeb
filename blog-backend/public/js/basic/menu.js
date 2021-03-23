layui.config({
    base:'/libs/'
}).extend({
    shenzcTable:'/common/ajaxTable',
    shenzc:'/common/ajax'
}).use(['table','jquery','form','shenzc','shenzcTable'], function(){
    var table = layui.table,
        form  = layui.form,
        shenzc = layui.shenzc,
        shenzcTable = layui.shenzcTable,
        $     = layui.$;


    shenzcTable.render({
        elem: '#menuTable',
        url: '/manage/menu/getList',
        page: true,
        cols: [[ //表头
            {field: 'id', title: 'ID',hide:true},
            {field: 'menuId', title: '菜单ID',align: 'center',   fixed: 'left',sort: true},
            {field: 'menuName', title: '菜单名称',align: 'center'},
            {field: 'parentMenuName', title: '父模块',align: 'center' },
            {field: 'url', title: 'url地址',align: 'center' },
            {field: 'right', title: '修改', toolbar: '#operateBar',align: 'center'}
        ]]
    })

    //监听提交
    form.on('submit(select)', function(data){
        var formData = data.field;
        shenzcTable.reload({
            elem:"menuTable",
            where: {
                "menuId": formData.menuId,
                "menuName":formData.menuName,
                "parentMenuName":formData.parentMenuName,
                "url":formData.url
            }
        })
        return false; // 阻止表单跳转
    });

    $("#addMenu").on('click',function () {
        layer.open({
            title: '新增菜单',
            type: 1,
            area: ['500px','420px'],
            content: $('.addMenuContent'),
            btnAlign: 'c',
            btn: ['确认', '取消'],
            success:function(){
                //获取到父菜单下拉框数据
                shenzc.get({
                    url:'/manage/menu/getParentMenu',
                    async:false,
                    success:function (data) {
                        if (data.code == 200){
                            let str='<option value="0"></option>';
                            $.each(data.data,function (index,item) {
                                str+='<option value="'+item.menuId+'">'+item.menuName+'</option>';
                                $("#selectId").html(str);
                                form.render();
                            })
                        }
                    }
                })
                form.val("formTest", {
                    "menuId": "",
                    "menuName":"",
                    "parentId":"",
                    "url":""
                });
            },
            yes: function(index) {
                $("#button").click()
            },
            btn2:function(index){
                layer.close(index);
            }
        });
    })

    //表单提交事件
    form.on('submit(formTest)',function (formTest) {
        var data = form.val("formTest");
        shenzc.post({
            url: "/manage/menu/addMenu",
            data: JSON.stringify(data),
            success:function (data) {
                if (data.code == 200){
                    layer.msg('菜单添加成功');
                    layer.closeAll();
                    shenzcTable.reload({
                        elem:'menuTable',
                    })
                }else {
                    layer.msg('菜单添加失败');
                }
            }
        })
        return false; // 阻止表单跳转
    });

    //列表栏操作
    table.on('tool(menuTable)', function (obj) {
        var data = obj.data;
        var menuId = data.menuId;
        if (obj.event === "editMenu") {
            layer.open({
                title: '跟新菜单',
                type: 1,
                area: ['500px','420px'],
                content: $('.addMenuContent'),
                btnAlign: 'c',
                btn: ['确认', '取消'],
                success:function(){
                    form.val("formTest", {
                        "id":data.id,
                        "menuId": data.menuId,
                        "menuName":data.menuName,
                        "url":data.url
                    });
                    shenzc.get({
                        url: "/manage/menu/getParentMenu",
                        async: false,
                        success:function (data1) {
                            if (data1.code == 200){
                                let str='<option value="0"></option>';
                                $.each(data1.data,function (index,item) {
                                    if (data.parentMenuName == item.menuName){
                                        str+='<option value="'+item.menuId+'"selected>'+item.menuName+'</option>';
                                    } else {
                                        str+='<option value="'+item.menuId+'">'+item.menuName+'</option>';
                                    }
                                    $("#selectId").html(str);
                                    form.render();
                                })
                            }
                        },
                    })
                },
                yes: function(index) {
                    $("#button").click()
                },
                btn2:function(index){
                    layer.close(index);
                }
            });
        }else if (obj.event === "deleteMenu"){
            shenzc.get({
                url: "/manage/menu/deleteMenu?menuId="+menuId,
                async: false,
                success:function (data) {
                    if (data.code == 200){
                        layer.msg(data.msg);
                        table.reload('menuTable', {
                            url:"http://127.0.0.1:3000/manage/menu/getList",
                            method:'POST',
                            where: {} //设定异步数据接口的额外参数
                        });
                    }else {
                        layer.msg(data.msg);
                    }
                },
            })
        }
    });
});