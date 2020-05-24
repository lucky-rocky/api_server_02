$(function () {
    //获取用户详细信息
    // 请求地址：/admin/user/detail
    // 请求方式：get
    $.ajax({
        url:BigNew.user_detail,
        dataType:'json',
        success:(res)=>{
            // console.log(res);
            if(res.code===200){
                //考虑页面结构和返回的数据结构
                const userdetail=res.data
                //循环
                Object.keys(userdetail).forEach(item=>{
                   if(item!=='userPic') $(`[name=${item}]`).val(userdetail[item])
                })
                $('.user_pic').prop('src',userdetail.userPic)
            }
        }  
    })

    //实现图片预览
    $('#exampleInputFile').on('change',function () {
        //图片文件
        let myfile=this.files[0]
        console.log(myfile);
        //本地浏览器路径
        let url=URL.createObjectURL(myfile)
        console.log(url);//有问题null
        //设置到头像框
        $('.user_pic').attr('src',url)
    })

    //编辑
    //请求地址：/admin/user/edit
    // 请求方式：post
    // 请求数据：使用formData提交
   
    
    $('.btn-edit').on('click',function () {
        $.ajax({
            url:BigNew.user_edit,
            type:'post',
            dataType:'json',
            data:new FormData($('#form')[0]),//dom对象
            processData:false,
            contentType:false,
            success:(res)=>{
                //console.log(res);
                if(res.code===200){
                    alert(res.msg)
                    window.parent.location.reload();
                    
                    
                }
            }

        })
    })

})