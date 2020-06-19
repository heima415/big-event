$(function () {
    // 进入页面先验证安全码，安全码正确，打开页面，不正确，返回登录页面
    var userInfo = localStorage.getItem('mytoken');
    if (!userInfo) {
        location.href = './login.html'
    }

    $.ajax({
        type: 'get',
        url: 'http://ajax.frontend.itheima.net/my/userinfo',
        headers: {
            // my开头的请求都需要携带请求头，作用：权限验证（只有登录后才能访问）
            Authorization: localStorage.getItem('mytoken')
        },
        success: function (res) {
            if (res.status === 0) {
                var info = res.data;
                $('.welcome .wel').html(info.username);
                $('.welcome #nav-username').html(info.username);
            }

            if (res.user_pi) {
                $('.welcome #nav-username').prev(div).remove();
                $('.welcome #nav-username').before('<img src="' + res.user_pi + '">');
                $('.welcome .wel').prev(div).remove();
                $('.welcome #nav-username').before('<img src="' + res.user_pi + '">');
            }
        }
    })

    //绑定退出按钮点击事件
    $('#logout-btn').click(function () {

        layer.confirm('确定要退出吗?', { icon: 3, title: '提示' }, function (index) {
            location.href = './login.html';

            localStorage.removeItem('mytoken');

            layer.close(index);
        })

    })



})