$(function () {
    $("#msg").hide()
    st = 0
    getStudents(st)
    $("#appr").click(function () {
        st = 0
        getStudents(st)
        $("#appr").addClass("btn-primary")
        $("#req").addClass("btn-secondary")
        $("#appr").removeClass("btn-secondary")
        $("#req").removeClass("btn-primary")
    })
    $("#req").click(function () {
        st = 1
        getStudents(st)
        $("#req").addClass("btn-primary")
        $("#appr").addClass("btn-secondary")
        $("#req").removeClass("btn-secondary")
        $("#appr").removeClass("btn-primary")
    })
    $("#sem").change(function () {
        getStudents(st)
    })
})

var getStudents = function (st) {
    action = 'getStudents'
    if (st == 1) action = "getStudRequest"
    data = { "action": action, "sem": $("#sem").val() }
    $.post("Model/StudentModel.py", data, function (res) {
        res = JSON.parse(res)
        if (res.length > 0) {
            $("#msg").hide()
            $(".table").show()
            s = ''
            x = 1
            $.each(res, function (k, v) {
                s += '<tr>' +
                    '<td>' + x + '</td>' +
                    '<td>' + v.name + '</td>' +
                    '<td>' + v.phone + '</td>' +
                    '<td>' + v.semester + '</td>' +
                    '<td>' + v.address + '</td>' +
                    '<td>'
                if (v.status == 0) {
                    s += '<button class="btn btn-sm btn-outline-success mr-2" onclick="setStatus(' + v.sid + ',1)">Approve</button>' +
                        '<button class="btn btn-sm btn-outline-danger" onclick="setStatus(' + v.sid + ',1)">Reject</button>'
                } else if (v.status == 1) s += '<button class="btn btn-sm btn-outline-danger" onclick="setStatus('+v.sid+',2)">Block</button>'
                else if (v.status == 2) s += '<button class="btn btn-sm btn-outline-primary" onclick="setStatus('+v.sid+',1)">Unblock</button>'
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
}

var setStatus = function (sid, act) {
    data = {"sid":sid,"act":act}
    data = {"action":"setStudStatus","data":JSON.stringify(data)}
    $.post("Model/StudentModel.py",data,function(res){
        getStudents(st)
    })
}