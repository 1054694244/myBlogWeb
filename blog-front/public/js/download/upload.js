layui.config({
    base:'/libs/'
}).extend({
    shenzc:'/common/ajax',
    shenzcSelect:'/common/select',
});
layui.link('/libs/form-select/formSelects-v4.css');
layui.use(['layer','jquery','shenzc','shenzcSelect','form','upload'], function(){
    var layer = layui.layer,
        shenzc= layui.shenzc,
        shenzcSelect = layui.shenzcSelect,
        form = layui.form,
        upload = layui.upload
        $ = layui.$;

    var uploadUrl = ""

    //上传组件
    shenzc.upload({
        id: '#upload',
        url: '/aliyun/oss/upload',
        data:{
            uploadUrl:uploadUrl
        },
        accept:'file',
        done:function (data) {
            if (data.code == 200){
                var fileName = data.data.name
                uploadUrl = data.data.url
                var html = '<i class="layui-icon">&#xe67c;</i>('+fileName+')重新上传'
                $("#upload").html(html);
            }
        }
    })

    //加载下拉框
    shenzcSelect.selectsData({
        id: 'category',
        url: '/article/category/getAllCategory',
    })


    //表单提交事件
    form.on('submit(submit)',function () {
        var data = form.val("formTest");
        data.file = uploadUrl
        console.log(data)
        shenzc.post({
            url: "/selfArticle/file/submitFile",
            data: JSON.stringify(data),
            success:function (data) {
                if (data.code == 200){
                    layer.msg('文章添加成功');
                    layer.closeAll();
                }else {
                    layer.msg('文章添加失败');
                }
            }
        })
        return false; // 阻止表单跳转
    });

})