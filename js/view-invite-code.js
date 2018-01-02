$(function() {
    var inviteCode = GetQueryString('inviteCode')
    $('#view-btn').click(function(){
        var cellphone = $('#input-cellphone').val();
        // Get user information.
        if (!is_cellphone_number(cellphone)) {
            alert('请输入正确的手机号！')
            return
        }
        $.get(
            backPath + '/invite/inviteUser/' + cellphone,
            function(result) {
                var res = JSON.parse(result);
                if (res.status != 200) {
                    alert("对不起，出错了，请稍后再试！");
                } else if (res.data == null) {
                    alert('没有此手机号码的邀请码！');
                } else {
                    window.location.href = "invite-code.html?cellphone=" + cellphone + (inviteCode?'&inviteCode=' + inviteCode:'');
                }
            }
        );
    });
    function GetQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return decodeURI(r[2]);
        return null;
    }
});


