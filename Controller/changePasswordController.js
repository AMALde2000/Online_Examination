$(function () {
    $("#myform").submit(function (e) {
        e.preventDefault();
        if ($("#myform").valid()) {
            if ($("#npword").val() == $('#cpword').val()) {
                data = getFormData($("#myform"))
                data = { "action": "changePassword", "data": data }
                $.post("Model/UserModel.py", data,
                    function (res) {
                        if (res == 1) {
                            $("#msg").addClass("alert-success")
                            $("#msg").removeClass("alert-danger")
                            $("#msg").text("Password Changed")
                            $('#myform')[0].reset()
                        } else if (res == 2) {
                            $("#msg").addClass("alert-danger")
                            $("#msg").removeClass("alert-success")
                            $("#msg").text("Wrong Password")
                        } else {
                            $("#msg").addClass("alert-danger")
                            $("#msg").removeClass("alert-success")
                            $("#msg").text("Something went wrong!")
                        }
                    }
                )
            } else {
                $("#msg").addClass("alert-danger")
                $("#msg").removeClass("alert-success")
                $("#msg").text("Password does not match")
            }
        }
    })
})