$(function () {
    // 文章类别列表展示
    initArtCateList()
    // 封装函数
    var layer = layui.layer

    function initArtCateList() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                var str = template('tpl-art-cate', res)
                $('tbody').html(str)
            }
        })
    }

    // 显示添加文章分类的列表
    $('#btnAdd').on('click', function () {
        indexAdd = layer.open({
            type: 1,
            title: '添加文章分类',
            area: ['500px', '260px'],
            content: $('#dialog-add').html(),
        });
    })

    // 提交文章分类添加
    var indexAdd = null
    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                // 添加成功，重新渲染
                initArtCateList()
                layer.msg('恭喜您，文章类别添加成功')
                layer.close(indexAdd)
            }
        })
    })

    // 修改展示列表
    var indexEdit = null
    var form = layui.form
    $('tbody').on('click', '.btn-edit', function () {
        indexEdit = layer.open({
            type: 1,
            title: '修改文章分类',
            area: ['500px', '260px'],
            content: $('#dialog-edit').html(),
        })
        // 获取Id发送ajax
        var Id = $(this).attr('data-id')
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + Id,
            success: function (res) {
                form.val('form-edit', res.data)
            }
        })
    })

    // 修改提交列表
    $('body').on('submit', '#form-edit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                initArtCateList()
                layer.msg('恭喜您，编辑修改成功')
                layer.close(indexEdit)
            }
        })
    })

    // 删除
    $('tbody').on('click', '.btn-delete', function () {
        var Id = $(this).attr('data-id')
        // 显示询问框
        layer.confirm('确认要删除？', {
            icon: 3,
            title: '提示'
        }, function (index) {
            //do something

            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + Id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg(res.message)
                    }
                    initArtCateList()
                    layer.msg('删除成功')
                    layer.close(index);
                }
            })
        })
    })
})