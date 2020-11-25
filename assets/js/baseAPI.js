// 开发环境服务器地址
var baseURL = 'http://ajax.frontend.itheima.net'
// 拦截所有ajax请求
$.ajaxPrefilter(function (params) {
    // console.log(params);
    params.url = baseURL + params.url
})