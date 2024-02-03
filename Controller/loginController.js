$(function () {
    $('#myForm').submit(function (e) {
        $('#msg').removeClass('alert-danger')
        $('#msg').text("")
        $(this).validate()
        e.preventDefault()
        if ($(this).valid()) {
            data = getFormData($("#myForm"))
            data = { "data": data, "action": "login" }
            $.post('Model/UserModel.py', data, function (dt) {
                dt = JSON.parse(dt)
                if (dt.length == 0) {
                    $('#msg').addClass('alert-danger')
                    $('#msg').html("Invalid User !!!!")
                }
                else  {
                    location.href = "?page="+dt[0].user_type+"/home"
                }
            })
        }
    })
})