$(function () {
    $("#msg").hide()
    getExaminer(0)
    $("#appr").click(function () {
        getExaminer(0)
        $("#appr").addClass("btn-primary")
        $("#req").addClass("btn-secondary")
        $("#appr").removeClass("btn-secondary")
        $("#req").removeClass("btn-primary")
    })
    $("#req").click(function () {
        getExaminer(1)
        $("#req").addClass("btn-primary")
        $("#appr").addClass("btn-secondary")
        $("#req").removeClass("btn-secondary")
        $("#appr").removeClass("btn-primary")
    })
})

var examinerAction = function (act, eid) {
    data = { "act": act, "eid": eid }
    data = { "action": "examinerAction", "data": JSON.stringify(data) }
    $.post("Model/ExaminerModel.py", data, function (res) {
        location.reload()
    })
}

var getExaminer = function (st) {
    action = "getExaminer"
    if (st == 1) action = "getExRequests"
    data = { "action": action }
    $.post("Model/ExaminerModel.py", data, function (res) {
        res = JSON.parse(res)
        s = ""
        if (res.length > 0) {
            $("#msg").hide()
            $(".table").show()
            x = 1
            $.each(res, function (k, v) {
                s += '<tr>' +
                    '<td>' + x + '</td>' +
                    '<td>' + v.name + '</td>' +
                    '<td>' + v.dept_name + '</td>' +
                    '<td>' + v.phone + '</td>' +
                    '<td>'
                if (v.status == 1) s += '<button class="btn btn-sm btn-outline-danger bl" onclick="examinerAction(2,' + v.eid + ')">Block</button>'
                else if (v.status == 2) s += '<button class="btn btn-sm btn-outline-primary ubl" onclick="examinerAction(1,' + v.eid + ')">Unblock</button>'
                else if (v.status == 0) {
                    s += '<button class="btn btn-sm btn-outline-primary mr-2 appr" onclick="examinerAction(1,' + v.eid + ')">Approve</button>'
                    s += '<button class="btn btn-sm btn-outline-danger rej" onclick="examinerAction(3,' + v.eid + ')">Reject</button>'

                }
                s += '</td>' +
                    '</tr>'
                    x++
            })

        } else {
            $("#msg").show()
            $(".table").hide()
        }
        $("#tb").html(s)
    })
}