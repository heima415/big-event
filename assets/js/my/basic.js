$(function () {
    //进入基本信息页，向服务器请求数据填充到列表
    var form = layui.form;
    function basicLocation() {
        $.ajax({
            type: 'get',
            url: 'http://www.liulongbin.top:3007/my/userinfo',
            headers: {
                Authorization: localStorage.getItem('mytoken')
            },
            success: function (res) {

                form.val('basicForm', res.data);


            }
        })
    }
    basicLocation();

    //输入信息，修改信息
    $('#mybasicform').submit(function (e) {
        e.preventDefault();
        var formData = $(this).serializeArray();
        //因为用户名不能修改，所以提交数据的时候删除用户名
        console.log(formData)
        formData = formData.filter(function (el) {
            return el.name !== 'username';
        })
        $.ajax({
            type: 'post',
            url: 'http://www.liulongbin.top:3007/my/userinfo',
            headers: {
                Authorization: localStorage.getItem('mytoken')
            },
            data: formData,
            success: function (res) {
                if (res.status === 0) {
                    // 修改成功，提示一下即可
                    layer.msg(res.message)
                }

            }
        })
    })
})