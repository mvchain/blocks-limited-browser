$(function () {
    var payType = 'z';
    $("#total-price").html(GetQueryString('total'));
    $('#select-pay').on('click', function (e) {
        var target = e.target;
        if (target.nodeName === 'SPAN') {
            target = $(target).parent()[0];
        }
        if (!$(target).hasClass('active')) {
            $(target).addClass('active').siblings().removeClass('active');
        }
        payType = $("#select-pay .active").data('type');
        if (payType === 'z') {
            $('#zfb-con').removeClass('hide').addClass('show').siblings().removeClass('show').addClass('hide');
            $('#bank-card').val('');
            $('#bank-user').val('');
        } else {
            $('#bank-con').removeClass('hide').addClass('show').siblings().removeClass('show').addClass('hide');
            $('#zfb-account').val('');
            $('#zfb-user').val('');
        }
    });
    function GetQueryString(name){
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if(r!=null)return  decodeURI(r[2]); return null;
    }
    $('#submit-btn').on('click',function(){
        var data = {
            id: GetQueryString('id'),
        };

        if(payType === 'z') {
            data.payChannel = 1;
            var _zfbAccount = $('#zfb-account').val();
            var _zfbUser = encodeURI($('#zfb-user').val());

            if (!_zfbAccount) {
                alert('请输入支付宝账号');
                return;
            } else if(!_zfbUser) {
                alert('请输入账号持有人');
                return;
            }
            data.payAccount = _zfbAccount;
            data.payerName = _zfbUser;
            payTypeAjax(data);
        } else {
            data.payChannel = 2;
            var _bankAccount = $('#bank-card').val();
            var _bankUser = encodeURI($('#bank-user').val());
            if (!_bankAccount) {
                alert('请输入银行卡');
                return;
            } else if(!_bankUser) {
                alert('请输入开户人');
                return;
            }
            data.payAccount = _bankAccount;
            data.payerName = _bankUser;
            payTypeAjax(data);
        }
    })
    function payTypeAjax(data) {
        $.ajax({
            type:'put',
            dataType: 'json',
            url: backPath + '/invite/order/paid' + `?id=${data.id}&payChannel=${data.payChannel}&payAccount=${data.payAccount}&payerName=${data.payerName}`,
            success:function(res){
                if (data.payChannel == 1) {
                    window.location.href = "zfb.html?cellphone=" + GetQueryString('cellphone') + "&total=" + GetQueryString('total')+ '&account=' + data.payAccount + '&name=' + data.payerName + '&id=' + GetQueryString('id');
                }else{
                    window.location.href = "bank.html?cellphone=" + GetQueryString('cellphone') + "&total=" + GetQueryString('total') + '&account=' + data.payAccount + '&name=' + data.payerName+ '&id=' + GetQueryString('id');
                }
            }
        })
    }
});