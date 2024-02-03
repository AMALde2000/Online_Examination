$(function () {
    $("#msg").hide()
    $(".table").hide()
    data = { "action": "getEamList" }
    $.post("Model/ExaminerModel.py", data, function (res) {
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
                    '<td>' + v.semester + '</td>' +
                    '<td>'
                if (date.getTime() < new Date(v.ex_date).getTime()) {
                    s += '<button class="btn btn-sm btn-outline-danger cn" id="' + v.eid + '">Cancel</button>'
                } else {
                    s += '<button class="btn btn-sm btn-outline-primary" onclick=location.href="?page=examiner/results&eid=' + v.eid + '">Result</button>'
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

    $("#tb").on('click', '.cn', function () {
        data = { "action": "cancelExam", "eid": $(this).attr("id") }
        $.post('Model/ExamModel.py', data, function (res) {
            location.reload()
        })
    })
})