layui.config({
    base:'/libs/'
}).extend({
    shenzc:'/common/ajax',
    shenzcTable:'/common/ajaxTable'
}).use(['table','form','jquery','shenzc','shenzcTable'], function(){
    var table = layui.table,
        form  = layui.form,
        shenzc = layui.shenzc,
        shenzcTable = layui.shenzcTable
        $     = layui.$;

    shenzcTable.render({
        elem: '#userTable',
        url: '/manage/user/getUserList', //数据接口
        page: true,
        cols: [[ //表头
            {field: 'id', title: 'id',hide:true},
            {field: 'userId', title: '用户ID',align: 'center',   fixed: 'left',sort: true},
            {field: 'username', title: '用户名称',align: 'center'},
            {field: 'roleName', title: '角色名称',align: 'center' },
            {field: 'phone', title: '电话',align: 'center' },
            {field: 'email', title: '邮箱',align: 'center' },
            {field: 'loginCount', title: '登录次数',align: 'center' },
            {field: 'right', title: '修改', toolbar: '#operateBar',align: 'center'}
        ]]
    })

    //监听提交
    form.on('submit(select)', function(data){
        var formData = data.field;
        shenzcTable.reload({
            elem:'userTable',
            where: {
                "userId": formData.userId,
                "username":formData.username,
                "roleName":formData.roleName
            }
        })
        return false; // 阻止表单跳转
    });

    $("#addUser").on('click',function () {
        layer.open({
            title: '新增人员',
            type: 1,
            area: ['500px','450px'],
            content: $('.addUserContent'),
            btnAlign: 'c',
            btn: ['确认', '取消'],
            success:function(){
                //获取到父菜单下拉框数据
                shenzc.get({
                    url: "/manage/user/getRole",
                    async: false,
                    success:function (data) {
                        if (data.code == 200){
                            let str='<option value="0"></option>';
                            $.each(data.data,function (index,item) {
                                str+='<option value="'+item.roleId+'">'+item.roleName+'</option>';
                                $("#roleId").html(str);
                                form.render();
                            })
                        }
                    },
                })
                form.val("formTest", {
                    "id":"",
                    "userId": "",
                    "username":"",
                    "phone":"",
                    "email":""
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
            url: "/manage/user/insertOrUpdateUser",
            data: JSON.stringify(data),
            success:function (data) {
                if (data.code == 200){
                    layer.msg('菜单添加成功');
                    layer.closeAll();
                    shenzcTable.reload({
                        elem:'userTable',
                    })
                }else {
                    layer.msg('菜单添加失败');
                }
            }
        })
        return false; // 阻止表单跳转
    });

    //列表栏操作
    table.on('tool(userTable)', function (obj) {
        var data = obj.data;
        var id = data.id;
        if (obj.event === "editUser") {
            layer.open({
                title: '用户修改',
                type: 1,
                area: ['500px','450px'],
                content: $('.addUserContent'),
                btnAlign: 'c',
                btn: ['确认', '取消'],
                success:function(){
                    form.val("formTest", {
                        "id":data.id,
                        "userId": data.userId,
                        "username":data.username,
                        "phone":data.phone,
                        "email":data.email
                    });
                    shenzc.get({
                        url: "/manage/user/getRole",
                        async: false,
                        success:function (data1) {
                            if (data1.code == 200){
                                let str='<option value="0"></option>';
                                $.each(data1.data,function (index,item) {
                                    if (data.roleName == item.roleName){
                                        str+='<option value="'+item.roleId+'"selected>'+item.roleName+'</option>';
                                    } else {
                                        str+='<option value="'+item.roleId+'">'+item.roleName+'</option>';
                                    }
                                    $("#roleId").html(str);
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
        }else if (obj.event === "deleteUser"){
            shenzc.get({
                url: "/manage/user/deleteUser?id="+id,
                async: false,
                success:function (data) {
                    if (data.code == 200){
                        layer.msg(data.msg);
                        table.reload('menuTable', {
                            url:"http://127.0.0.1:3000/user/getUserList",
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