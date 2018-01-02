$(function() {
    var searchURL = window.location.search
    searchURL = searchURL.substring(1, searchURL.length)
    var type = searchURL.split("&")[0].split("=")[0]
    var cellphone, inviteCode,empty;
    if (type == 'cellphone') {
        cellphone = searchURL.split("&")[0].split("=")[1]
        $('#order-link').on('click', function(){
            window.location.href = 'order.html?cellphone=' + cellphone;
        })
        // Get user information.
        $.get(
            backPath + '/invite/inviteUser/' + cellphone,
            function(result) {
                var res = JSON.parse(result)
                if (res.status != 200) {
                    alert("对不起，出错了，请稍后再试！")
                } else {
                    $('#input-name').val(res.data.name)
                    $('#input-cellphone').val(res.data.cellphone)
                    $('#input-address').val(res.data.address);
                }
            }
        );
    } else if (type == 'inviteCode') {
        inviteCode = GetQueryString('inviteCode');
        $('#ytCon').removeClass('r-hide');
        $('#yt-address').val(inviteCode).prop('disabled',true);
    } else {
        empty = 'empty';
    }

    /*
    * 头部返回
    * */


    /*
    * 加减按钮
    * */
    var _cctv = parseInt($('#input-quantity').val());
    if(_cctv){
        $('#total-price').html(parseInt(10000*_cctv));
    }
    $('.order-total-btn').on('click',function(e){
        var txt = $(this).html();
        var val = _cctv||parseInt($('#input-quantity').val());
        if (isNaN(val)) {
            $('#input-quantity').val(1);
            val = 1;
        }
        if(txt === '+') {
            $('#input-quantity').val(val+1);
        }else if(txt === '-') {
            if (val > 1) {
                $('#input-quantity').val(val-1);
            }
        }
        var _val = $('#input-quantity').val();
        $('#total-price').html(parseInt(10000*_val));
        _cctv = 0;
    });
    function GetQueryString(name){
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if(r!=null)return  decodeURI(r[2]); return null;
    }
    $("#submit-btn").click(function(){
        var data = {};
        data.name = $('#input-name').val();
        data.cellphone = $('#input-cellphone').val();
        data.address = $('#input-address').val();
        data.quantity = $('#input-quantity').val()||1;
        if (inviteCode) {
            data.inviteCode = inviteCode;
        }
        if(empty) {
            data.inviteCode = $('#yt-address').val();
        }
        if (data.name == '' || data.cellphone == '' || data.address == '') {
            alert('姓名、手机号码、收货地址不能为空！')
            return
        }
        if (!is_cellphone_number(data.cellphone)) {
            alert('请输入正确的手机号！')
            return
        }
        $.ajax({
            type:'post',
            url: backPath + "/invite/order",
            data: JSON.stringify(data),
            dataType: 'json',
            contentType: 'application/json',
            success:function(result){
                var total = $('#total-price').html();
                if (result.status != 200) {
                    alert("对不起，出错了，请稍后再试！");
                } else if (result.data == 0) {
                    alert('您已获得邀请码，请点击下方查看已有邀请码!');
                } else if(result.data){
                    window.location.href = "payType.html?cellphone=" + data.cellphone + "&total=" + total + '&id=' + result.data;
                }
            }
        });
    })
});