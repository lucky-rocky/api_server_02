$(function () {
    //实现图片预览
    $('#inputCover').on('change',function () {
        let myfile=$(this)[0].files[0]
        let url=URL.createObjectURL(myfile)
        $('.article_cover').prop('src',url)
    })

    //文章类别渲染
//     请求地址：/admin/category/list
// 请求方式：get
$.ajax({
    url:BigNew.category_list,
    dataType:'json',
    success:(res)=>{
        console.log(res);
        $('.category').html(template('listTEMP',res))
        
    }
    
})
//jedate的调用
jeDate("#indate",{
    isinitVal:true,
    format:"YYYY-MM-DD",
    isTime:true,
    minDate:"2014-09-19",
    maxDate: "2099-12-31",
    trigger:"click",
    isClear:true, 
    isToday:true,
    theme:{ bgcolor:"#00A1CB",color:"#ffffff", pnColor:"#00CCFF"},
})
//初始化 富文本框
//覆盖在textarea容器上方,获取textarea的value值只有默认值,content参数要获取编辑器上的内容
tinymce.init({
    selector: '#mytextarea',
    height:'350px',
            language: 'zh_CN',
            directionality: 'ltl',
            browser_spellcheck: true,
            contextmenu: false,
            plugins: [
                "advlist autolink lists link image charmap print preview anchor",
                "searchreplace visualblocks code fullscreen",
                "insertdatetime media table contextmenu paste imagetools wordcount",
                "code"
            ],
            toolbar: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | code",
            branding:false  
  });


  //发布或者草稿的请求
//   请求地址：/admin/article/publish
// 请求方式：post

function storage(state) {
    let formdata=new FormData($('#form')[0])
    //单独上传content 从编辑器上获取当前编辑器参数
    formdata.append('content',tinymce.activeEditor.getContent())
    //单独上传state 不能从页面直接获取,由点击的按钮决定
    formdata.append('state',state)
    // console.log(...formdata);
    // console.log(formdata.get('cover').name);
    if(!formdata.get('cover').name){
        alert('选择图片后再发布')
        return
    }
    $.ajax({
        url:BigNew.article_publish,
        type:'post',
        data:formdata,
        dataType:'json',
        processData:false,
        contentType:false,
        success:(res)=>{
            // console.log(res);
            if(res.code===200){
                alert(res.msg)
                location='./article_list.html'
                $('.level02 li',window.parent.document).eq(0).trigger('click')
            }
        }
    })
}

$('.btn-release').on('click',function (e) {
    e = window.event || e;
    e.preventDefault()
    storage('已发布')
})

$('.btn-draft').on('click',function (e) {
    e = window.event || e;
    e.preventDefault()
    storage('草稿')
})

})