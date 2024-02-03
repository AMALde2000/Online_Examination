$(function () {
    $("#msg").hide()
    $(".table").hide()
    data = { "action": "examList" }
    $.post("Model/ExamModel.py", data, function (res) {
        res = JSON.parse(res)
        if (res.length > 0) {
            $(".table").show()
            s = ''
            x = 1
            date = new Date()
            $.each(res, function (k, v) {
                s += '<tr>' +
                    '<td>' + x + '</td>' +
                    '<td>' + v.ex_name + '</td>' +
                    '<td>' + v.ex_date + '</td>' +
                    '<td>' + v.dept_name + ' / ' + v.semester + '</td>' +
                    '<td>' + v.name + '</td>' +
                    '</tr>'
                    x++
            })
            $("#tb").html(s)
        } else {
            $("#msg").show()
            $(".table").hide()
        }
    })
})