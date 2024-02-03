$(function () {
    $("#msg").hide()
    $(".table").hide()
    data = { "action": "getStudentResult" }
    $.post("Model/ExamModel.py", data, function (res) {
        res = JSON.parse(res)
        if (res.length > 0) {
            $(".table").show()
            s = ''
            x = 1
            $.each(res, function (k, v) {
                s += '<tr>' +
                    '<td>' + x + '</td>' +
                    '<td>' + v.ex_name + '</td>' +
                    '<td>' + v.ex_date + '</td>' +
                    '<td>' + v.name + '</td>' +
                    '<td>' + v.total + '</td>' +
                    '<td>' + v.score + '</td>' +
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