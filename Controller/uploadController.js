$(function () {
    $('#myForm').submit(function (e) {
        $('#msg').removeClass('alert-danger')
        $('#msg').text("")
        $(this).validate()
        e.preventDefault()
        if ($(this).valid()) {
            dt = new FormData()
            dt.append('file', $('#file')[0].files[0]);
            dt.append('type', $('#type').val())
            dt.append('des', $('#complaint').val())
            dt.append('dept', $('#dept').val())
            dt.append('action', "upload")
            dt.append('priority', $("#priority").text())
            $.ajax({
                url: 'Model/FileModel.py',
                type: 'POST',
                data: dt,
                contentType: false,
                cache: false,
                processData: false,
                success: function (dt) {
                    dt = JSON.parse(dt)
                    console.log(dt)
                    if (dt.success == 1) {
                        $('#msg').removeClass('alert-danger')
                        $('#msg').addClass('alert-success')
                        $('#msg').html("Uploaded")
                        $("#myform").trigger("reset")
                    }
                    else {
                        $('#msg').addClass('alert-danger')
                        $('#msg').removeClass('alert-success')
                        $('#msg').html("Error in Uploading")
                    }
                }
            })
        }
    })
})