layui.config({
   base: '/libs/js-cookie/'
});
layui.use(['form','jquery','layer','cookie'], function(){
    var form = layui.form;
    var $ = layui.jquery;
    var cookie = layui.cookie;

    //监听提交
    form.on('submit(formDemo)', function(data){
        var user = data.field
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
                    /*sessionStorage.setItem("username",data.data.username);
                    sessionStorage.setItem("headImg",data.data.headImg);
                    sessionStorage.setItem("token",data.data.token);*/
                    location.href="index";
                }else {
                    layer.msg("用户名不存在，或者密码错误");
                }
            },
            error:function (data) {

            }
        })
        return false;
    });



});