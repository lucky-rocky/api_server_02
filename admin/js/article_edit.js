$(function () {
    //编辑结构的处理和新增一样,然后再进行默认数据展示

    //拿到文章id
    // console.log(location.href.split('=')[1]);
    // let id=location.href.split('=')[1] //只适用于单个参数传递
    let {id}=_$.getArguments(location.search)
    // console.log(id);
    
    //12、根据id获取文章信息
    // 请求地址：/admin/article/search
    // 请求方式：get
    // 请求参数：id
    $.ajax({
        url:BigNew.article_search,
        data:{id},
        dataType:'json',
        success:(res)=>{
            // console.log(res);
            // $('[name="title"]').val(res.data.title)
            // $('[name="author"]').val(res.data.author) //不会报错
            // $('[name="categoryId"]').val(res.data.categoryId) //给value匹配到对应下拉选项
            // $('[name="date"]').val(res.data.date)
            // $('[name="content"]').val(res.data.content) //赋值 直接给textarea即可,富文本框会同步
            $('.article_cover').prop('src',res.data.cover)
            $('#mytextarea').val(res.data.content) //赋值 直接给textarea即可,富文本框会同步
            Object.keys(res.data).forEach(item=>{
                if(!item==='cover') $(`[name="${item}"]`).val(res.data[item])  //input:file 有name=cover,会报错,要排除掉
            })
        }
    })

    //编辑
    function edit(state) {
        let formdata = new FormData($("#form")[0]);
        //单独上传content 从编辑器上获取当前编辑器参数
        formdata.append("content", tinymce.activeEditor.getContent());
        //单独上传state 不能从页面直接获取,由点击的按钮决定
        formdata.append("state", state);
        //添加参数id
        formdata.append('id',id)
        // console.log(...formdata);
        // console.log(formdata.get('cover').name);
        // if (!formdata.get("cover").name) { //编辑接口说明可以为空(不选择)
        //   alert("选择图片后再发布");
        //   return;
        // }
        $.ajax({
          url: BigNew.article_edit,
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
    
      $(".btn-edit").on("click", function (e) {
        e = window.event || e;
        e.preventDefault();
        edit("已发布");
      });
    
      $(".btn-draft").on("click", function (e) {
        e = window.event || e;
        e.preventDefault();
        edit("草稿");
      });


    
})