$(function () {
    eid = 0
    qst_list = []
    total = 0;
    $('#pre').prop('disabled', true)
    $("#qst_div").hide()
    $("#msg").hide()
    $("#msg1").hide()
    $("#myform1").submit(function (e) {
        e.preventDefault()
        if ($("#myform1").valid()) {
            data = getFormData($("#myform1"))
            data = { "action": "addExam", "data": data }
            $.post("Model/ExamModel.py", data, function (res) {
                // res = JSON.parse(res)
                // console.log(res.eid)
                // if (res.success == 1) {
                $("#qst_div").show()
                $("#exam_div").hide()
                eid = res
                // } else {
                //     $("#msg").show()
                // }
            })
        }
    })
})

var cancelExam = function () {
    data = { 'action': 'cancelExam', 'eid': eid }
    $.post("Model/ExamModel.py", data, function (res) {
        location.reload()
    })
}

var getQuestion = function () {
    if ($("#question").val() != "" && $("#option1").val() != "" && $("#option2").val() != "" && $("#option3").val() != "" && $("#option4").val() != "" && $("#mark").val() != "") {
        
        no = Number($("#q_no").text())
        $("#q_no").text(no + 1)
        $("#pre").prop("disabled", false)
        if (no > qst_list.length) {
            var q = {}
            q.qst = $("#question").val()
            q.op1 = $("#option1").val()
            q.op2 = $("#option2").val()
            q.op3 = $("#option3").val()
            q.op4 = $("#option4").val()
            q.mark = $("#mark").val()
            q.ans = $("input[name=option]:checked").val()
            qst_list.push(q)
            total += Number(q.mark)
            $("#total").val(total)
            $("#question").val("")
            $("#option1").val("")
            $("#option2").val("")
            $("#option3").val("")
            $("#option4").val("")
            $("#mark").val("")
            $("input[name=option][value=1]").prop('checked', true);
        } else if (no == qst_list.length) {
            $("#question").val("")
            $("#option1").val("")
            $("#option2").val("")
            $("#option3").val("")
            $("#option4").val("")
            $("#mark").val("")
            $("input[name=option][value=1]").prop('checked', true);
        } else {
            $("#question").val(qst_list[no].qst)
            $("#option1").val(qst_list[no].op1)
            $("#option2").val(qst_list[no].op2)
            $("#option3").val(qst_list[no].op3)
            $("#option4").val(qst_list[no].op4)
            $("#mark").val(qst_list[no].mark)
            $("input[name=option][value=" + qst_list[no].ans + "]").prop('checked', true);
        }
    }
}

var previous = function () {
    no = Number($("#q_no").text()) - 1
    if (no == 1) {
        $("#pre").prop("disabled", true)
    }
    $("#q_no").text(no)
    $("#question").val(qst_list[no - 1].qst)
    $("#option1").val(qst_list[no - 1].op1)
    $("#option2").val(qst_list[no - 1].op2)
    $("#option3").val(qst_list[no - 1].op3)
    $("#option4").val(qst_list[no - 1].op4)
    $("#mark").val(qst_list[no - 1].mark)
    $("input[name=option][value=" + qst_list[no - 1].ans + "]").prop('checked', true);
}

var updateMark = function (e) {
    $("#total").val(total + Number(e.target.value))
}

var saveQuestion = function () {
    no = Number($("#q_no").text())
    if ($("#question").val() == "" || $("#option1").val() == "" || $("#option2").val() == "" || $("#option3").val() == "" || $("#option4").val() == "" || $("#mark").val() == "") {
        $("#msg1").show()
    } else {
        if (no > qst_list.length) {
            var q = {}
            q.qst = $("#question").val()
            q.op1 = $("#option1").val()
            q.op2 = $("#option2").val()
            q.op3 = $("#option3").val()
            q.op4 = $("#option4").val()
            q.mark = $("#mark").val()
            q.ans = $("input[name=option]:checked").val()
            qst_list.push(q)
        }
        data = { "eid": eid, "question": qst_list, "total": total }
        data = { 'action': "addQuestion", "data": JSON.stringify(data) }
        $.post("Model/ExamModel.py", data, function (res) {
            if (res == 1) {
                location.href = "?page=examiner/home"
            } else {
                $("#msg").show()
            }
        })
    }
}