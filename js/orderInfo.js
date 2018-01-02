$(function () {
    var phone = GetQueryString('cellphone');
    function GetQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return decodeURI(r[2]);
        return null;
    }

    $.ajax({
        type: 'get',
        url: `${backPath}/invite/order/${phone}`,
        dataType: 'json',
        success: function (res) {
            if (res.status == 200) {
                var _html = renderHtml(res);
                $('#renderCon').html(_html)
            }
        }
    })

    function renderHtml(res) {
        var _html = '';
        $.each(res.data, function (i, v) {
            var styl = '';
            var txt = '';
            var comment = '';
            if (v.status == 0) {
                styl = 'info-pending-icon';
                txt = '未付款';
            } else if(v.status == 1) {
                styl = 'info-pending-icon';
                txt = '待审核';
            } else if(v.status == 3) {
                styl = 'info-lose-icon';
                txt = '未通过';
            }else if(v.status == 6) {
                styl = 'info-pending-icon';
                txt = '已过期';
            }else {
                styl = 'info-pass-icon';
                txt = '审核通过';
            }
            if(v.comment){
                comment = v.comment;
            }
            _html+=`<div class="common-info-con">
            <div class="common-info-top">
                <div>订单号：<span>${v.id}</span></div>
                <div>
                    <b class="${styl}"></b>
                    <span class="info-pass">${txt}</span>
                </div>
            </div>
            <div class="common-info-bottom">
                <ul style="padding:0;">
                    <li class="info-first-li">
                        <span>姓名：${v.name}</span>
                        <span>购买数量：${v.quantity}</span></li>
                    <li>手机号码：${v.cellphone}<span></span></li>
                    <li>收货地址：${v.address}<span></span></li>
                    <li>备注：${comment}<span></span></li>
                </ul>
            </div>
        </div>`;
        });
        return _html;
    }
});