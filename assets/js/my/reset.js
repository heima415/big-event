$(function () {
    var form = layui.form;
    form.verify({
        same: function (value) {
            if (value !== $('.nPwd').val()) {
                return '两次输入的密码不相同'
            }
        },
        diff: function (value) {
            if (value == $('.usernameInput').val()) {

                return '新密码不能和原密码相同'
            }
        }
    });

    $('#resetform').submit(function (e) {
        e.preventDefault()
        var fd = $(this).serialize();
        console.log(fd)
        $.ajax({
            type: 'post',
            url: 'http://www.liulongbin.top:3007/my/updatepwd',
            headers: {
                Authorization: localStorage.getItem('mytoken')
            },
            data: fd,
            success: function (res) {
                if (res.status === 0) {
                    layer.msg(res.message)
                } else {
                    layer.msg(res.message)
                }
            }
        })
    })




})