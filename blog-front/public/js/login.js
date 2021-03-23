layui.config({
    base: '/libs/js-cookie/'
});
layui.use(['form','jquery','layer','cookie','element','layer'], function(){
    var form = layui.form;
    var $ = layui.jquery;
    var cookie = layui.cookie;
    var element = layui.element;
    var layer = layui.layer;


    //监听提交:密码登录
    form.on('submit(formDemo1)', function(data){
        var user = data.field
        login(user);
        return false;
    });


    //监听提交:手机验证码登录
    form.on('submit(formDemo2)', function(data){
        var user = data.field
        login(user);
        return false;
    });


    function login(user){
        $.ajax({
            url:'http://127.0.0.1:3000/manage/sso/loginIn',
            method:'post',
            contentType: "application/json",
            data: JSON.stringify(user),
            async:false,
            success:function (data) {
                if (data.code == 200){
                    var date = new Date();
                    var minutes = 30;
                    date.setTime(date.getTime() + (minutes * 60 * 1000));
                    //要引入插件jquery-cookie插件
                    $.cookie('token',data.data.token,{
                        expires:7,
                        path:'/',
                    });
                    $.cookie('username',data.data.username,{
                        expires:7,
                        path:'/',
                    });
                    /*$.cookie('headImg',data.data.headImg,{
                        expires:date,
                        path:'/',
                    })*/
                    location.href="index";
                }else {
                    layer.msg("用户名不存在，或者密码错误");
                }
            },
            error:function (data) {

            }
        })
    }

    $("#messageButton").on('click',function () {
        var data = form.val("form2");
        $.ajax({
            url: 'http://127.0.0.1:3000/manage/sso/getCode?phone='+data.phone,
            method: 'GET',
            async: false,
            success:function (data) {
                $("#messageButton").addClass("layui-btn-radius layui-btn-disabled");
            },
            error:function (data) {
                layer.msg("发送验证失败")
            }
        })
    })

    element.on('tab(tab)', function(elem){
        location.hash = 'test='+ $(this).attr('lay-id');
    });



});