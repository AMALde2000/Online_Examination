var getFormData = function ($form) {
    var unindexed_array = $form.serializeArray();
    var indexed_array = {};
    $.map(unindexed_array, function (n, i) {
        indexed_array[n['name']] = n['value'];
    });
    return JSON.stringify(indexed_array);
}

$(function () {
    act = location.href.split("/")
    act = act[act.length - 1]
    $.each($("a"), function (k, v) {
        if ($(v).attr('sel') == act) {
            $(v).addClass('active')
        }
    })

    $('#logout').click(function () {
        data = { 'action': 'logout' }
        $.post('Model/UserModel.py', data, function (dt) {
            location.href = "?page=guest/login"
            history.go(history.length - 1)
        })
    })

    $("#sidebarCollapse").click(function(){
        $("#sidebar").toggleClass("active")
    })
    
})