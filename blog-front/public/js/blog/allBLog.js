layui.config({
    base:'/libs/'
}).extend({
    shenzc:'/common/ajax',
    shenzcTable:'/common/ajaxTable',
    shenzcSelect:'/common/select',
});
layui.use(['element','layer','jquery','shenzc','form','shenzcTable','shenzcSelect'], function(){
    var element = layui.element
        ,layer = layui.layer,
        shenzc= layui.shenzc,
        shenzcTable = layui.shenzcTable,
        shenzcSelect = layui.shenzcSelect,
        form = layui.form;
    var $ = layui.$;
    var layer;

    var index = 0;


    network();

    function network(){
        //加载tab
        loadSelect()
        //加载table
        loadTable()
    }

    function loadTable() {
        shenzcTable.render({
            elem: '#blog',
            url: '/selfArticle/blog/getBlog?index='+index,
            page: true,
            cols: [[ //表头
                {field: 'id',hide:true},
                {field: 'blogId',hide:true},
                {field: 'title', title: '标题',width:180,align: 'center'},
                {field: 'type', title: '文章类型',width:180,align: 'center', templet:function (d) {return shenzcTable.commbo(d.type,"blogType")} },
                {field: 'status', title: '审核状态',width:180,align: 'center',templet:function (d) {return shenzcTable.commbo(d.status,"blogStatus")} },
                {field: 'createAt', title: '创建时间',width:180,align: 'center'},
                {field: 'right', title: '修改', toolbar: '#operateBar',align: 'center'}
            ]]
        })
    }

    function loadSelect() {
        shenzcSelect.load({
            name:"month"
        })
        shenzcSelect.load({
            name:"blogType"
        })
        shenzcSelect.load({
            name:"blogYear"
        })
    }


    element.on('tab(title)', function(data){
        index = data.index
        shenzcTable.reload({
            elem: 'blog',
            where:{
                "index":index
            }
        })
    });


    //监听提交
    form.on('submit(submit)', function(data){
        var formData = data.field;
        shenzcTable.reload({
            elem:"blog",
            where: {
                "year": formData.year,
                "month":formData.month,
                "type":formData.type,
                "keyword":formData.keyword
            }
        })
        return false; // 阻止表单跳转
    });


    //列表栏操作
    shenzcTable.tool({
        elem:"blog",
        opreate:function (obj) {
            var data = obj.data
            if(obj.event === "readBlog"){
                parent.location.href="/blog/readBlog?"+"id="+encodeURI(data.id);
            }else if (obj.event === "deleteBlog"){
                shenzc.get({
                    url: '/selfArticle/blog/deleteBlog?blogId='+data.blogId,
                    async:'false',
                    success:function (data) {
                        if (data.code == 200){
                            shenzcTable.reload({
                                elem:"blog"
                            })
                            layer.alert("删除成功")
                        }
                    }
                })
            }else if (obj.event === "editBlog"){
                parent.location.href="/blog/writeBlog?"+"id="+encodeURI(data.id);
            }
        }
    })

})