$(function(){
    var searchURL = window.location.search
    searchURL = searchURL.substring(1, searchURL.length)
    var type = searchURL.split("&")[0].split("=")[0]
    var cellphone, inviteCode
    $('#order-link').on('click',function(){
        if (type == 'cellphone') {
            cellphone = searchURL.split("&")[0].split("=")[1]
            window.location.href =  'order.html?cellphone=' + cellphone;
        } else if (type == 'inviteCode') {
            inviteCode = searchURL.split("&")[0].split("=")[1]
            window.location.href =  'order.html?inviteCode=' + inviteCode;
        } else {
            window.location.href =  'order.html?empty=';
        }
    })

});