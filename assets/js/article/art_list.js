$(function () {
    // 时间过滤器
    template.defaults.imports.dateFormat = function (dtStr) {
        var dt = new Date(dtStr)
        var y = padZero(dt.getFullYear())
        var m = padZero(dt.getMonth() + 1)
        var d = padZero(dt.getDate())
        var hh = padZero(dt.getHours())
        var mm = padZero(dt.getMinutes())
        var ss = padZero(dt.getSeconds())
        return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
    }
    // 补零
    function padZero(n) {
        return n > 9 ? n : '0' + n
    }

    // 文章类别列表展示
    var q = {
        pagenum: 1,
        pagesize: 2,
        cate_id: '',
        state: '',
    }

    // 初始化文章表格
    initTable()
    // initCate()

    function initTable() {
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data: q,
            success: function (res) {
                // console.log(res);
                var str = template('tpl-table', res)
                $('tbody').html(str)
                // 分页
                renderPage(res.total)
            }
        })
    }

    // 初始化分类
    var form = layui.form
    var layer = layui.layer
    initCate()

    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                // 赋值，渲染form
                var htmlStr = template('tpl-cate', res)
                $('[name=cate_id]').html(htmlStr)
                form.render()
            }
        })
    }

    // 筛选功能
    $('#form-search').on('submit', function (e) {
        e.preventDefault()
        // 获取
        var state = $('[name=state]').val()
        var cate_id = $('[name=cate_id]').val()
        // 赋值
        q.state = state
        q.cate_id = cate_id
        initTable()
    })

    // 分页
    var laypage = layui.laypage

    function renderPage(total) {
        laypage.render({
            elem: 'pageBox',
            count: total,
            limits: q.pagesize,
            curr: q.pagenum,
            layout:['count','prev','page','next','limit','skip'],

            jump: function(obj, first){
                //obj包含了当前分页的所有参数，比如：
                console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
                console.log(obj.limit); //得到每页显示的条数
                q.pagenum = obj.curr
                q.pagesize = obj.limit
                //首次不执行
                if(!first){
                  //do something
                  initTable()
                }
              }
        })
    }

    // 删除
    $('tbody').on('click','btn-delete',function(){
        var Id = $(this).attr('data-id')
        // 显示询问框
        layer.confirm('是否确认删除', {icon: 3, title:'提示'}, function(index){
            //do something
            $.ajax({
                method:'GET',
                url:'/my/article/delete/'+Id,
                success:function(res){
                    if(res.status !== 0){
                        return layer.msg(res.message)
                    }
                    initTable()
                    layer.msg('删除成功')
                    // 页面总删除按钮数个数为1，页码大于1
                    if($('.btn-delete').length == 1 && q.pagenum >1) q.pagenum--
                }
            })
            layer.close(index);
          });
    })
})