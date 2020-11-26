$(function () {
    var form = layui.form
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return "昵称长度在1~6之间"
            }
        }
    });

    // 用户渲染
    initUserInfo()
    // 导出layer
    var layer = layui.layer
    // 封装函数
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                // 成功后渲染
                form.val('formUserInfo', res.data)
            }
        })
    }

    // 表单重置
    $('#btnReset').on('click', function (e) {
        e.preventDefault()
        // 从新用户渲染
        initUserInfo()
    })

    // 修改用户信息
    $('.lay-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if(res.status !== 0){
                    return layer.msg("用户信息修改失败")
                }
                layer.msg('信息修改成功')
                // 调用父页面中的更新用户信息和头像的方法
                window.parent.getUserInfo()
            }
        })
    })
})