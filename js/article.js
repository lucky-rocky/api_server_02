$(function () {
//     请求地址：/index/artitle
// 请求方式：get
// 请求参数：id
let id=location.search.split('=')[1]
$.ajax({
    url:'http://localhost:8080/api/v1/index/article',
    data:{id},
    dataType:'json',
    success:(res)=>{
        console.log(res);
        $('#article-detail').html(template('art-detail-Temp',res.data))
    }
})

})