layui.config({
    base:'/libs/'
}).extend({
    shenzc:'/common/ajax',
    shenzcTable:'/common/ajaxTable'
}).use(['table','form','jquery','tree','shenzc','shenzcTable'], function(){
    var table = layui.table,
        form  = layui.form,
        tree = layui.tree,
        shenzc = layui.shenzc,
        shenzcTable = layui.shenzcTable,
        $     = layui.$;

    shenzcTable.render({
        elem: '#roleTable',
        url: '/manage/role/getRoleList',
        page: true,
        cols: [[ //表头
            {field: 'id', title: 'id',hide:true},
            {field: 'roleId', title: '角色Id',align: 'center',   fixed: 'left',sort: true},
            {field: 'roleName', title: '角色名称',align: 'center'},
            {field: 'sum', title: '所属角色数量',align: 'center' },
            {field: 'right', title: '修改', toolbar: '#operateBar',align: 'center'}
        ]]
    })

    //监听提交
    form.on('submit(select)', function(data){
        debugger
        var formData = data.field;
        shenzcTable.reload({
            elem:'roleTable',
            where: {
                "roleId": formData.roleId,
                "roleName":formData.roleName
            }
        })
        return false; // 阻止表单跳转
    });

    $("#addRole").on('click',function () {
        layer.open({
            title: '新增角色',
            type: 1,
            area: ['500px','420px'],
            content: $('.addRoleContent'),
            btnAlign: 'c',
            btn: ['确认', '取消'],
            success:function(){
                form.val("formTest", {
                    "id":"",
                    "roleId": "",
                    "roleName":""
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
    form.on('submit(formTest)',function () {
        var data = form.val("formTest");
        console.log(data)
        shenzc.post({
            url: "/manage/role/insertOrUpdateRole",
            data: JSON.stringify(data),
            success:function (data) {
                if (data.code == 200){
                    layer.msg('角色添加成功');
                    layer.closeAll();
                    shenzcTable.reload({
                        elem:'roleTable',
                    })
                }else {
                    layer.msg('角色添加失败');
                }
            }
        })
        return false; // 阻止表单跳转
    });

    //列表栏操作
    table.on('tool(roleTable)', function (obj) {
        var data = obj.data;
        var id = data.id;
        var roleId = data.roleId;
        if (obj.event === "editRole") {
            layer.open({
                title: '更新角色',
                type: 1,
                area: ['500px','420px'],
                content: $('.addRoleContent'),
                btnAlign: 'c',
                btn: ['确认', '取消'],
                success:function(){
                    form.val("formTest", {
                        "id":data.id,
                        "roleId": data.roleId,
                        "roleName":data.roleName
                    });
                },
                yes: function(index) {
                    $("#button").click()
                },
                btn2:function(index){
                    layer.close(index);
                }
            });
        }else if (obj.event === "deleteRole"){
            shenzc.get({
                url: "/manage/menu/deleteRole?roleId="+id,
                method:"GET",
                async: false,
                success:function (data) {
                    if (data.code == 200){
                        layer.msg(data.msg);
                        shenzcTable.reload({
                            elem:'roleTable',
                        })
                    }else {
                        layer.msg(data.msg);
                    }
                },
            })
        }else if (obj.event == "editRoleMenu"){
            layer.open({
                title: '设置菜单权限',
                type: 1,
                area: ['500px','420px'],
                content: $('.addRoleMenu'),
                btnAlign: 'c',
                btn: ['确认', '取消'],
                success:function(){
                    shenzc.get({
                        url: "/manage/role/getTreeList?roleId="+roleId,
                        async: false,
                        success:function (data) {
                            if (data.code == 200){
                                //渲染
                                var inst1 = tree.render({
                                    elem: '#tree',  //绑定元素,
                                    id:'treeId',
                                    showCheckbox:true,
                                    data: data.data.all
                                });

                                tree.setChecked('treeId', data.data.selected); //批量勾选 id 为 2、3 的节点
                            }else {
                                layer.msg("获取菜单tree失败");
                            }
                        },
                    })
                },
                yes: function(index) {
                    var checkData = tree.getChecked('treeId');
                    shenzc.post({
                        url: "/manage/role/addRoleMenu?roleId="+roleId,
                        data: JSON.stringify(checkData),
                        async: false,
                        success:function (data) {
                            if (data.code == 200){
                                layer.closeAll();
                                layer.msg(data.msg);
                            }else {
                                layer.msg(data.msg);
                            }
                        },
                    })
                },
                btn2:function(index){
                    layer.close(index);
                }
            });
        }
    });




});