$(function () {
    var password;
    var searchText = GetQueryString('searchText');
    $('#subPwd').on('click',function(){
        setCookie('password',md5($('#password-text').val()));
        history.go(0);
    });
    var failMsg = '';
    password= getCookie('password');
    if(!password) {
        $('#exampleModal1').modal('show');
        return;
    } else {
        $('#exampleModal1').modal('hide');
        tableAjax();
    }
    if (!searchText) {
        searchText = ''
    } else{
        $('#input-search-text').val(searchText)
    }


    function tableAjax() {
        $.ajax({
            type: 'get',
            url: backPath + "/invite/order?searchText=" + searchText + '&password=' + password,
            success: function (result) {
                var res = JSON.parse(result);
                if(res.status == 400){
                    clearCookie('password');
                    $('#exampleModal1').modal('show');
                    alert(res.message);
                }else if (res.status == 200) {
                    var orders = res.data
                    for (i = 0; i < orders.length; i++) {
                        var order = orders[i];
                        $('#data-table').append(convertOrderToTr(order));
                    }
                } else {
                    alert("对不起，出错了，请稍后再试！");
                }
            }
        })
    }

    $('#loginOut').on('click',function(){
        clearCookie('password');
        history.go(0);
    })

    $('body').on('click', '#search-btn', function () {
        window.location.href = frontPath + "/order-list.html?searchText=" + $('#input-search-text').val();
    })

    $('body').on('click', '.btn-confirmation', function () {
        var id = $(this).parent().siblings('.order-id').html();
        $.ajax({
            type: 'put',
            url: backPath + "/invite/order/confirmation?id=" + id + '&password=' + password,
            success: function (result) {
                var res = JSON.parse(result);
                if (res.status != 200) {
                    alert("对不起，出错了，请稍后再试！");
                } else if (res.data) {
                    window.location.href = frontPath + "/order-list.html?searchText=" + $('#input-search-text').val();
                }
            }
        })
    })
    $('#subMsg').on('click',function(){
        failMsg = $('#message-text').val();
        $('#exampleModal').modal('hide');
        var id = $('#exampleModal').data('id');
        $.ajax({
            type: 'put',
            dataType: 'json',
            url: backPath + "/invite/order/confirm/failure?id=" + id + '&comment=' + failMsg + '&password=' + password,
            success: function (result) {
                if (result.status != 200) {
                    alert("对不起，出错了，请稍后再试！");
                } else if (result.data) {
                    window.location.href = frontPath + "/order-list.html?searchText=" + $('#input-search-text').val();
                }
            }
        })
    });
    $('body').on('click', '.btn-failure', function () {
        var id = $(this).parent().siblings('.order-id').html();
        $('#exampleModal').data('id',id);
    })

    $('body').on('click', '.btn-delivery', function () {
        var id = $(this).parent().siblings('.order-id').html();
        $.ajax({
            type: 'put',
            url: backPath + "/invite/order/delivery?id=" + id,
            success: function (result) {
                var res = JSON.parse(result);
                if (res.status != 200) {
                    alert("对不起，出错了，请稍后再试！");
                } else if (res.data) {
                    window.location.href = frontPath + "/invite/order-list.html?searchText=" + $('#input-search-text').val();
                }
            }
        })
    })

    function GetQueryString(name){
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if(r!=null)return  decodeURI(r[2]); return '';
    }
    function getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for(var i=0; i<ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1);
            if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
        }
        return "";
    }
    function setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        var expires = "expires="+d.toUTCString();
        document.cookie = cname + "=" + cvalue + "; " + expires;
    }
    function clearCookie(name) {
        setCookie(name, "", -1);
    }
})

function convertOrderToTr(order) {
    var trStr = "";

    trStr += "<tr>"
    trStr += "<td class='order-id'>" + order.id + "</td>"
    trStr += "<td>" + order.name + "</td>"
    trStr += "<td>" + order.cellphone + "</td>"
    trStr += "<td>" + order.address + "</td>"
    trStr += "<td>" + order.inviteCode + "</td>"
    trStr += "<td>" + order.createdAtStr + "</td>"
    trStr += "<td>" + order.comment + "</td>"
    payChannelText = ''
    if (order.payChannel == 1) payChannelText = '支付宝'
    if (order.payChannel == 2) payChannelText = '银行转账'
    trStr += "<td>" + payChannelText + "</td>"
    trStr += "<td>" + order.payAccount + "</td>"
    trStr += "<td>" + order.payerName + "</td>"
    trStr += "<td>" + order.quantity + "</td>"
    trStr += "<td>" + (order.sum / 100) + "</td>"
    statusText = ''
    if (order.status == 0) statusText = '未付款'
    if (order.status == 1) statusText = '待审核'
    if (order.status == 2) statusText = '审核通过'
    if (order.status == 3) statusText = '审核未通过'
    if (order.status == 4) statusText = '送货中'
    if (order.status == 5) statusText = '订单完成'
    trStr += "<td>" + statusText + "</td>"
    trStr += "<td>" + htmlOfButtons() + "</td>"
    trStr += "</tr>"

    return trStr;
}

function htmlOfButtons() {
    return '<button class="btn btn-primary btn-confirmation">确认收款</button>&nbsp;'
        + '<button class="btn btn-danger btn-failure" data-toggle="modal" data-target="#exampleModal">确认失败</button>&nbsp;'
//        + '<button class="btn btn-warning btn-delivery">发货</button>&nbsp;'
//        + '<button class="btn btn-default btn-finish">完成</button>&nbsp;'
        ;
}