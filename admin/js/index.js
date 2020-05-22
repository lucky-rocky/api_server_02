$(function () {
    $.ajax({
        url:'http://localhost:8080/api/v1/admin/user/info',
        dataType:'json',
        //forbidden 没token
        // headers:{Authorization:localStorage.getItem('bignewsToken')},
        success:(res)=>{
            // console.log(res);
            if(res.code===200){
                $('.user_info img').prop('src',res.data.userPic)
                $('.user_info span').html(`欢迎&nbsp;&nbsp${res.data.nickname}`)
            }else{
                alert('服务器出错')
            }
        },
        // //请求失败时的处理
        // error:(err)=>{
        //     console.log(err);
        //     if(err.statusText==='Forbidden'){
        //         // console.log(1);
        //         alert('请求失败,重新登录')
        //         location='./login.html'
        //     }
        // }
    })
})