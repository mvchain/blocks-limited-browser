
$(function(){
    var cellphone = GetQueryString('cellphone');
    var inviteCode = GetQueryString('inviteCode');


    $('#changePage1').on('click',function(e){
        window.location.href = frontPath + (inviteCode?'?inviteCode=' + inviteCode:'');
    })
    $('#changePage2').on('click',function(){
        if(cellphone){
            window.location.href =  'order.html?cellphone=' + cellphone;
        } else if(inviteCode){
            window.location.href =  'order.html?inviteCode=' + inviteCode;
        } else {
            window.location.href =  'order.html?empty=';
        }
    })

    function GetQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return decodeURI(r[2]);
        return null;
    }
});