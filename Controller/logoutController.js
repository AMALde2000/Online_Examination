$(function () {
    $('#logout').click(function(){
        data = { "action": "logout" }
        $.post('Model/UserModel.py', data, function (dt) {
            dt = JSON.parse(dt)
            if (dt.success == 1) {
                location.href="?page=guest/login"
            }
            else  {
                
            }
        })
    })
    
})