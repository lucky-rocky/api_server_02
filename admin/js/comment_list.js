$(function () {
  // 请求地址：/admin/comment/list
  // 请求方式：get
  let page = 1,
    perpage = 6;
  function init() {
    $.ajax({
      url: BigNew.comment_list,//不给或者给错url,ajax会用location.pathname拿到页面
      data: { page, perpage },
      dataType: "json",
      success: (res) => {
        console.log(res);
        $("tbody").html(template("com_temp", res.data));
        setPage(page, res.data.totalPage, init);
      },
    });
  }
  init();
  //分页
  /**
   * 分页插件
   * @param pageCurrent 当前所在页
   * @param pageSum 总页数
   * @param callback 调用ajax
   */
  function setPage(pageCurrent, pageSum, callback) {
    $("#pagination").bootstrapPaginator({
      //设置版本号
      bootstrapMajorVersion: 3,
      // 显示第几页
      currentPage: pageCurrent,
      // 总页数
      totalPages: pageSum,
      //当单击操作按钮的时候, 执行该函数, 调用ajax渲染页面
      onPageClicked: function (event, originalEvent, type, page_click) {
        // 把当前点击的页码赋值给currentPage, 调用ajax,渲染页面
        page = page_click;
        callback && callback();
      },
    });
  }
  //实现评论操作 (通过id)
  //不同的审核状态显示不同的按钮
  function com_opt(url,id) {
      $.ajax({
          url,
          data:{id},
          type:'post',
          dataType:'json',
          success:(res)=>{
              if(res.code===200){
                  alert(res.msg)
                  init()
              }
          }
      })
  }
  $('tbody').on('click','.btn-allow',function (e) {
      e = window.event || e;
      e.preventDefault()
      com_opt(BigNew.comment_pass,$(this).data('id'))
  })
  $('tbody').on('click','.btn-reject',function (e) {
      e = window.event || e;
      e.preventDefault()
      com_opt(BigNew.comment_reject,$(this).data('id'))
  })
  $('tbody').on('click','.btn-delete',function (e) {
      e = window.event || e;
      e.preventDefault()
      com_opt(BigNew.comment_delete,$(this).data('id'))
  })

  

});
