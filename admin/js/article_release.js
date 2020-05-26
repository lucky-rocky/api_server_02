$(function () {
 
  //发布或者草稿的请求
  //   请求地址：/admin/article/publish
  // 请求方式：post

  function storage(state) {
    let formdata = new FormData($("#form")[0]);
    //单独上传content 从编辑器上获取当前编辑器参数
    formdata.append("content", tinymce.activeEditor.getContent());
    //单独上传state 不能从页面直接获取,由点击的按钮决定
    formdata.append("state", state);
    // console.log(...formdata);
    // console.log(formdata.get('cover').name);
    if (!formdata.get("cover").name) {
      alert("选择图片后再发布");
      return;
    }
    $.ajax({
      url: BigNew.article_publish,
      type: "post",
      data: formdata,
      dataType: "json",
      processData: false,
      contentType: false,
      success: (res) => {
        // console.log(res);
        if (res.code === 200) {
          alert(res.msg);
          location = "./article_list.html";
          $(".level02 li", window.parent.document).eq(0).trigger("click");
        }
      },
    });
  }

  $(".btn-release").on("click", function (e) {
    e = window.event || e;
    e.preventDefault();
    storage("已发布");
  });

  $(".btn-draft").on("click", function (e) {
    e = window.event || e;
    e.preventDefault();
    storage("草稿");
  });
});
