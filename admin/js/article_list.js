$(function () {
    //文章搜索
    //请求地址：/admin/article/query
    // 请求方式：get
    let page=1
    let perpage=6
    function init() {
        $.ajax({
            url: BigNew.article_query,
            type:'get',
            dataType:'json',
            data:{page,perpage,type:$('#selCategory').val(),state:$('#selStatus').val()},
            success:(res)=>{
                console.log(res);
                $('tbody').html(template('articleListTemp',res.data))
                setPage(page,res.data.totalPage,init)
            }
        })
    }
    init()





     /**
     * 分页插件
     * @param pageCurrent 当前所在页
     * @param pageSum 总页数
     * @param callback 调用ajax
     */
    function setPage(pageCurrent, pageSum, callback) {
        $(".pagination").bootstrapPaginator({
            //设置版本号
            bootstrapMajorVersion: 3,
            // 显示第几页
            currentPage: pageCurrent,
            // 总页数
            totalPages: pageSum,
            //当单击操作按钮的时候, 执行该函数, 调用ajax渲染页面
            onPageClicked: function (event,originalEvent,type,page_click) {
                // 把当前点击的页码赋值给currentPage, 调用ajax,渲染页面
                page=page_click
                callback && callback()
            }
        })
    }


//查询所有文章类别
//     请求地址：/admin/category/list
// 请求方式：get
$.ajax({
    url:BigNew.category_list,
    dataType:'json',
    success:(res)=>{
        console.log(res);
        $('#selCategory').html(template('art-list-temp',res))
    }
})

//筛选
$('#btnSearch').on('click',(e)=>{
    e = window.event || e;
    e.preventDefault()
    page=1//重置当前页
    init()
})


})