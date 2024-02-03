$(function () {
    getDept()
    $('#student').show()
    $('#examiner').hide()
    $('#student_btn').click(function(){
        $('#student').show()
        $('#examiner').hide()
    })
    $('#examiner_btn').click(function(){
        $('#student').hide()
        $('#examiner').show()
    })
    $('.myForm').submit(function (e) {
        $('#msg').removeClass('alert-danger')
        $('#msg').text("")
        $(this).validate()
        e.preventDefault()
        if ($(this).valid()) {
            data = getFormData($(this))
            data = { "data": data, "action": "register" }
            $.post('Model/UserModel.py', data, function (dt) {
                dt = JSON.parse(dt)
                console.log(dt.success)
                if (dt.success == -1) {
                    $('.msg').addClass('alert-danger')
                    $('.msg').html("Existing Email address !!!!")
                }
                else if (dt.success == -2) {
                    $('.msg').addClass('alert-danger')
                    $('.msg').html("Existing Phone number !!!!")
                } else {
                    location.href = "?page=guest/login"
                }
            })
        }
    })
    
})
var getDept=function(){
    data = { "action": "getDept" }
    $.post('Model/UserModel.py', data, function (dt) {
        dt = JSON.parse(dt)
        console.log(dt)
        $.each(dt,function(k,v){
            s='<option value="'+v.dept_id+'">'+v.dept_name+'</option>'
            $('.dept').append(s)
        })
    })
}