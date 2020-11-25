$(function(){
    // 点击去注册账号
    $('#link_reg').on('click',function(){
        $('.login-box').hide()
        $('.reg-box').show()
    })
    // 点击去登录
    $('#link_login').on('click',function(){
        $('.login-box').show()
        $('.reg-box').hide()
    })
    // 自定义验证规则
    var form = layui.form
    form.verify({
        // 密码规则
        pwd: [
          /^[\S]{6,16}$/
          ,'密码必须6到16位，且不能出现空格'
        ] ,
        // 确认密码规则
        repwd:function(value){
            var pwd = $('.reg-box [name=password]').val()
            if(value !== pwd){
                return "两次输入不一致"
            }
        }
      });  
      
    //   注册功能
    var layer = layui.layer
      $('#form_reg').on('submit',function(e){
          e.preventDefault()
          $.ajax({
              method:'POST',
              url:'/api/reguser',
              data:{
                  username:$('.reg-box [name=username]').val(),
                  password:$('.reg-box [name=password]').val()
              },
              success: function (res) {
                  if(res.status !== 0){
                      return layer.msg(res.message)
                  }
                  layer.msg('注册成功,请登录')
                //   切换到登陆表单
                  $('#link_login').click()
                //   重置注册表单
                  $('#form_reg')[0].reset()
              }
          })
      })
    //   登录功能
    $('#form_login').submit(function (e) {
        e.preventDefault()
        $.ajax({
            method:'POST',
            url:'/api/login',
            data:$(this).serialize(),
            success:function (res) {
                if(res.status !== 0){
                    return layer.msg(res.message)
                }
                layer.msg('登陆成功')
                // 保存token
                localStorage.setItem('token',res.token)
                location.href = '/index.html'
            }
        })
    })
})