$(function () {
//     请求地址：/index/hotpic
// 请求方式：get
$.ajax({
    url:'http://localhost:8080/api/v1/index/hotpic',
    dataType:'json',
    success:(res)=>{
        console.log(res);
        $('.focus_list').html(template('hotTemp',res))
    }
})

// 请求地址：/index/rank
// 请求方式：get
$.ajax({
    url:'http://localhost:8080/api/v1/index/rank',
    dataType:'json',
    success:(res)=>{
        console.log(res);
        $('.hotrank_list').html(template('rank-Temp',res))
    }
})



// 5、最新资讯
// 请求地址：/index/latest
// 请求方式：get
$.ajax({
    url:'http://localhost:8080/api/v1/index/latest',
    dataType:'json',
    success:(res)=>{
        console.log(res);
        $('.common_news').html(template('lastnews-temp',res))
    }
})


})