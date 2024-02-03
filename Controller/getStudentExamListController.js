$(function () {
    $("#msg").hide()
    $(".table").hide()
    data = { "action": "getStudentEamList" }
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
                    '<td>' + v.total + '</td>' +
                    '<td>' + v.name + '</td>' +
                    '<td>'
                if (date.getDate() === new Date(v.ex_date).getDate()) {
                    s += '<button class="btn btn-sm btn-outline-success" onclick=location.href="?page=student/attend_exam&eid=' + v.eid + '">Attend</button>'
                } else if(date.getDate() > new Date(v.ex_date).getDate()) {
                    s += '<button class="btn btn-sm btn-outline-primary" onclick=location.href="?page=student/results&eid=' + v.eid + '">Result</button>'
                }
                s += '</td>' +
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