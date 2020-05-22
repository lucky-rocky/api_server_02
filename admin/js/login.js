$(function () {
    $('.input_sub').on('click',()=>{
        let username=$('.input_txt').val().trim()
        let password=$('.input_pass').val().trim()
        if(!(username&&password)){
            //console.log('用户名或密码不能为空')
            $('.msg').text('用户名或密码不能为空')
            $('#myModal').modal('show')
            return
        }
        $.ajax({
            url:'http://localhost:8080/api/v1/admin/user/login',
            type:'post',
            data:{username,password},
            datatype:'json',
            success:(res)=>{
                if(res.code===200){
                    $('.msg').text(res.msg)
                    $('#myModal').modal('show')
                    $('#myModal').on('hidden.bs.modal', function (e) {
                        //console.log(res);
                        location='./index.html'
                    })
                }else{
                    $('.msg').text(res.msg)
                    $('#myModal').modal('show')
                }
            }
        })
    })
    $('.affirm').on('click',()=>{
        $('#myModal').modal('hide')
    })
   
})