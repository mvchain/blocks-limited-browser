$(function () {
    $("#total-price").html(GetQueryString('total'));

    function GetQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return decodeURI(r[2]);
        return null;
    }

    $('#submit-btn').on('click', function () {
        window.location.href = "orderInfo.html?cellphone=" + GetQueryString('cellphone');
    });
    var clipboard = new Clipboard('#copy', {
        text: function() {
            return '6212882402000106555';
        }
    });

    clipboard.on('success', function(e) {
        alert("复制成功！");
    });

    clipboard.on('error', function(e) {
        alert("复制失败！");
    });
});