$(function () {
    eid = location.href.split('=')[2]
    qst = 0
    scr = []
    $("#msg").hide()
    data = { "action": "getQuestions", "eid": eid }
    $.post("Model/ExamModel.py", data, function (res) {
        if (res == 0) {
            $("#msg").show()
            $("#main_div").hide();
        } else {
            res = JSON.parse(res)
            $("#exam").text(res[0].ex_name)
            $("#date").text(res[0].ex_date)
            $("#total").text(res[0].total)
            s = ''
            x = 1
            cnt = 0
            inp = ''
            $.each(res, function (k, v) {
                cnt++
                if (cnt == 1) {
                    qst++
                    s += '<div class="row form-group">' +
                        '<div class="col-md-11 font-weight-bold">' + qst + '. ' + v.question + '</div>' +
                        '<div class="col font-weight-bold">' + v.mark + '</div>' +
                        '</div>'
                    inp = 'ans' + qst
                    scr.push(v.mark)
                }

                s += '<div class="row '
                if (cnt == 4) {
                    cnt = 0
                    s += 'form-group'
                }
                s += '">' +
                    '<div class="col-md-10 ml-5">' + v.q_option + '</div>' +
                    '<div class="col">' +
                    '<input type="radio" name="' + inp + '" required value=' + v.status + '>' +
                    '</div>' +
                    '</div>'

                x++
            })
            $("#qst_div").html(s)
        }
    })

    $("#myform").submit(function (e) {
        e.preventDefault();
        if ($('#myform').valid()) {
            score = 0
            for (i = 1; i <= qst; i++) {
                if ($('input[name=ans' + i + ']:checked').val() == 1) score += scr[i-1]
            }
            data = { 'score': score, "eid": eid }
            data = { 'action': "setResult", "data": JSON.stringify(data) }
            $.post("Model/ExamModel.py", data,
                function (res) {
                    location.href = "?page=student/home"
                }
            )
        }
    })
})