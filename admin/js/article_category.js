$(function () {
    let temp={}
  //请求地址：/admin/category/list
  // 请求方式：get
  // 请求参数：无
  function init(){
    $.ajax({
        url: BigNew.category_list,
        dataType: "json",
        success: (res) => {
          console.log(res);
          if (res.code === 200) {
            //调用模板字符串
            let str = template("articleTemp", res);
            $("tbody").html(str);
          }
        },
      });
  }
  init()

  $('#xinzengfenlei').on('click',()=>{
      $('.modal-title').text('新增分类')
      $('.name').text('新增名称')
      $('.category').text('新增类别')
      $('.affirm').text('新增')
      $('form')[0].reset()
  })


    //新增
    // 请求地址：/admin/category/add
    // 请求方式：post
    // 请求参数：
    //编辑
    // 请求地址：/admin/category/edit
    // 请求方式：post


  $('.affirm').on('click',function () {
        let name=$('.name-content').val().trim()
        let slug=$('.category-content').val().trim()
        if(!(name&&slug)){
            alert('名称或者名称不为空')
            return
        }
        //新增或编辑需要判断-->ajax请求相似,选择封装
        if($('.affirm').text()==='新增') option(BigNew.category_add,{name,slug})
        else {
            if(!(name===temp.name&&slug===temp.slug)){
                option(BigNew.category_edit,{name,slug,id:$('#id').val()})
            }else{
                alert('无修改')
            }
        }
  })

  //封装:新增和编辑的ajax请求
  function option(url,data) {
    $.ajax({
        url,
        dataType:'json',
        type:'post',
        data,
        success:(res)=>{
            console.log(res);
            if(res.code===201||res.code===200){
                alert(res.msg)
                $('#myModal').modal('hide')
                init()
            }  
        },
        //处理:已存在
        error:(err)=>{
            // console.log(typeof err.responseText);
            console.log(JSON.parse(err.responseText));
            alert(JSON.parse(err.responseText).msg)
        }
    })
  }
    

    $('tbody').on('click','.btn-edit',function () {
        //console.log(1);
        $('.modal-title').text('编辑分类')
        $('.name').text('编辑名称')
        $('.category').text('编辑类别')
        $('.affirm').text('编辑')
        //默认数据展示 数据=>获取时存好
        const {name,slug,id}=$(this).data()
        temp={name,slug}
        //console.log(name,slug,id);
        $('.name-content').val(name)
        $('.category-content').val(slug)
        $('#id').val(id)
    })

    //删除
    // 请求地址：/admin/category/delete
    // 请求方式：post
    // 参数:id

    $('tbody').on('click','.btn-del',function () {
        let id=$(this).data('id')
        // console.log(id);
        // console.log(BigNew.category_delete)
        if(confirm('确认删除?')){
            $.ajax({
                url: BigNew.category_delete,
                type:'post',
                data: {
                    id
                },//参数括号里传递
                dataType:'json',
                success:(res)=>{
                    alert('删除成功')
                    init()
                }
            })
        }
        
    })
  
});
