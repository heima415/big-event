$(function () {
    //layui是全局对象，通过他可以得到form对象
    var form = layui.form
    //基于layui自定义表单验证规则
    form.verify({
        uname: [/^[\S]{6,8}$/, '用户名必须是6-8位字符'],
        pwd: function (value, item) {
            var reg = /^\d{6}$/
            if (!reg.test(value)) {
                return '密码必须是六位数字'
            }

        },
        same: function (value) {
            if (value !== $('#form-register input[name=password]').val()) {
                return '两次输入的密码不一致';
            }
        }
    })
    // 提交表单
    $('#form-login').submit(function (e) {
        e.preventDefault();
        var formDate = $(this).serialize();
        console.log(formDate)
        $.ajax({
            type: 'post',
            url: 'http://ajax.frontend.itheima.net/api/login ',
            data: formDate,
            success: function (res) {
                if (res.status === 0) {
                    //返回的taken必须保存到本地，这是登录成功的标志
                    localStorage.setItem('mytoken', res.token)
                    location.href = './index.html'
                } else {
                    layer.msg(res.message);
                }
            }
        })
    })

    $('#form-register a').click(function () {
        $('#form-login').show();
        $('#form-register').hide();
    })

    $('#form-login a').click(function () {

        $('#form-register').show();
        $('#form-login').hide();
    })

    //控制注册表单提交
    $('#form-register').submit(function (e) {
        e.preventDefault();
        var registerData = $(this).serialize();

        $.ajax({
            type: 'post',
            url: 'http://ajax.frontend.itheima.net/api/reguser',
            data: registerData,
            success: function (res) {
                if (res.status === 0) {
                    $('#form-register a').click();
                    layer.msg(res.message)
                } else {
                    layer.msg(res.message);
                }
            }
        })
    })
})