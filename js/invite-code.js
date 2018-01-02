$(function() {
    var searchURL = window.location.search;
    searchURL = searchURL.substring(1, searchURL.length);
    var cellphone = searchURL.split("&")[0].split("=")[1];
    var inviteCode = '';
    var _inviteCode = GetQueryString('inviteCode');

    // purchase link
    $('#purchase-link').on('click',function(){
        window.location.href = 'goods.html' + (_inviteCode?'?inviteCode='+_inviteCode:'')
    })

    // Get user information.
    $.get(
        backPath + '/invite/inviteUser/' + cellphone,
        function(result) {
            var res = JSON.parse(result);
            if (res.status != 200) {
                alert("对不起，出错了，请稍后再试！");
            } else {
                inviteCode = res.data.inviteCode
                $('#_name').text(res.data.name);
                $('#invite-count').text(res.data.inviteCount);
                $('#_phone').html(res.data.cellphone);
                $('#_address').html(res.data.address)
                $('#_ytAdd').html(res.data.etherAddress)
                $('#inviteCode').html(inviteCode);
            }
        }
    );
    function GetQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return decodeURI(r[2]);
        return null;
    }
    // copy invite code
    var clipboard = new Clipboard('#copy', {
        text: function() {
            return '币圈黄埔定制版库神钱包购买邀请：' + merchandisePath + '?inviteCode=' + inviteCode;
        }
    });

    clipboard.on('success', function(e) {
        alert("复制成功！");
    });

    clipboard.on('error', function(e) {
        alert("复制失败！");
    });
});