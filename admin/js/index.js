$(function () {
    $.ajax({
        url:BigNew.user_info,
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

    $('.level01').on('click',function () {//箭头函数this指向固定,这里会出问题
        $(this).addClass('active').siblings('div').removeClass('active')
        if($(this).next().hasClass('level02')){
            $(this).next().slideToggle()
            $(this).find('b').toggleClass('rotate0')
        }else{
            $('.level02').slideUp()
            $('.level01').find('b').removeClass('rotate0')
            $('.level02 li').removeClass('active')
        }

    })

    $('.level02 li').on('click',function () {
        $(this).addClass('active').siblings('li').removeClass('active')
    })




})