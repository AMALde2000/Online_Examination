$(function () {
    $("#msg").hide()
    $(".table").hide()
    eid = location.href.split("=")[2]
    data = { "action": "getAllStudentResult", "eid": eid }
    $.post("Model/ExamModel.py", data, function (res) {
        res = JSON.parse(res)
        if (res.length > 0) {
            $(".table").show()
            s = ''
            x = 1
            $.each(res, function (k, v) {
                s += '<tr>' +
                    '<td>' + x + '</td>' +
                    '<td>' + v.name + '</td>' +
                    '<td>' + v.total + '</td>' +
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