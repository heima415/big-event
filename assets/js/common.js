// $(function () {

//     var baseURL = 'http://www.liulongbin.top:3007/';
//     $.ajaxPrefilter(function (option) {
//         option.url = baseURL + option.url;
//         option.beforeSend = function () {
//             window.Nprogress && window.Nprogress.start()
//         }
//         if (option.url.lastIndexOf('/my/') !== -1) {
//             option.headers = {
//                 Authorization: localStorage.getItem('mytoken')

//             }

//         }
//         option.complete = function (res) {
//             window.Nprogress && window.Nprogress.done()
//             if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
//                 localStorage.removeItem('mytoken')
//                 location.href = './login.html'
//             }
//         }

//     })

// })


$(function () {
    /*
      通用的接口调用设置
    */
    // var baseURL = 'http://ajax.frontend.itheima.net/'
    var baseURL = 'http://www.liulongbin.top:3007/'



    // 所有的请求发送之前经过该函数，可以对相关请求和响应做一些调整
    $.ajaxPrefilter(function (option) {
        console.log(123)
        // 形参option是jQuery请求方法的配置信息
        // 发送请求之前会触发beforeSend
        option.beforeSend = function () {
            // 发送请求之前开始进度条(添加window防止报错)
            window.NProgress && window.NProgress.start()
            // if (NProgress) {
            //   NProgress.start()
            // }
        }

        // 1、配置通用的URL地址
        option.url = baseURL + option.url
        console.log(option.url)
        // 2、设置接口的通用请求头信息
        if (option.url.lastIndexOf('/my/') !== -1) {
            // 所有包含my的请求路径需要进行权限验证（需要先登录）
            // header默认不存在，所以需要设置一个对象
            option.headers = {
                Authorization: localStorage.getItem('mytoken')
            }
        }
        // 3、处理通用的异常情况
        // 服务器响应结束时触发
        option.complete = function (res) {
            // 完成请求后，结束进度条
            window.NProgress && window.NProgress.done()
            // 处理失败的情况
            if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
                // 把无效的token清除
                localStorage.removeItem('mytoken')
                // 如果身份验证失败了，就跳转到登录页面
                location.href = './login.html'
            }
        }
    })
})
