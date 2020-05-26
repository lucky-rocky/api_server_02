$(function () {
//编辑和新增文章的共同js
  //实现图片预览
  $("#inputCover").on("change", function () {
    let myfile = $(this)[0].files[0];
    let url = URL.createObjectURL(myfile);
    $(".article_cover").prop("src", url);
  });
   
    //文章类别渲染(注意应该 先渲染类别,再实现预览)
  //     请求地址：/admin/category/list
  // 请求方式：get
  $.ajax({
    url: BigNew.category_list,
    dataType: "json",
    success: (res) => {
      console.log(res);
      $(".category").html(template("listTEMP", res));
    },
  });
  //jedate的调用
  jeDate("#indate", {
    isinitVal: true,
    format: "YYYY-MM-DD",
    isTime: true,
    minDate: "2014-09-19",
    maxDate: "2099-12-31",
    trigger: "click",
    isClear: true,
    isToday: true,
    theme: { bgcolor: "#00A1CB", color: "#ffffff", pnColor: "#00CCFF" },
  });
  //初始化 富文本框
  //覆盖在textarea容器上方,获取textarea的value值只有默认值,content参数要获取编辑器上的内容
  tinymce.init({
    selector: "#mytextarea",
    height: "350px",
    language: "zh_CN",
    directionality: "ltl",
    browser_spellcheck: true,
    contextmenu: false,
    plugins: [
      "advlist autolink lists link image charmap print preview anchor",
      "searchreplace visualblocks code fullscreen",
      "insertdatetime media table contextmenu paste imagetools wordcount",
      "code",
    ],
    toolbar:
      "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | code",
    branding: false,
  });
})
// 将参数 转为对象 (单个或者多个参数地址栏传递可用)
// location_search获得?及之后的字符串
let _$={
    getArguments(location_search){
        let obj={}
        let arguments=location_search.slice(1)//去问号 key=value&key1=value1
        let arr=arguments.split('&')
        //循环
        for(let i = 0;i < arr.length;i++) {
            let tempArr=arr[i].split('=')
            obj[tempArr[0]]=tempArr[1]     //数据重组
        }
        //返回obj
        return obj
    }
}