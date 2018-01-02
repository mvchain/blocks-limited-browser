$(function(){
    $.get(
        backPath + '/invite/inviteUser',
        function(result) {
            var res = JSON.parse(result);
            if (res.status == 400) {
                alert(res.message);
            } else if (res.status != 200) {
                alert("对不起，出错了，请稍后再试！");
            } else {
                var users = res.data;
                $('#passwordDiv').remove();
                $('#data-table').append(createTh());
                for (i = 0; i < users.length; i++) {
                    var user = users[i];
                    $('#data-table').append(convertUserToTr(user, i + 1));
                }
            }
        }
    )
})

function createTh() {

    var trStr = "";
    trStr += "<tr>"
    trStr += "<th>" + '序号' + "</th>"
    trStr += "<th>" + '登记时间' + "</th>"
    trStr += "<th>" + '姓名' + "</th>"
    trStr += "<th>" + '手机' + "</th>"
    trStr += "<th>" + '收货地址' + "</th>"
    trStr += "<th>" + '以太坊地址' + "</th>"
    trStr += "<th>" + '邀请码' + "</th>"
    trStr += "<th>" + '累计邀请购买数量' + "</th>"
    trStr += "</tr>"
    return trStr;
}

function convertUserToTr(user, i) {
    var trStr = "";

    trStr += "<tr>"
    trStr += "<td>" + i + "</td>"
    trStr += "<td>" + user.createdAt + "</td>"
    trStr += "<td>" + user.name + "</td>"
    trStr += "<td>" + user.cellphone + "</td>"
    trStr += "<td>" + user.address + "</td>"
    trStr += "<td>" + user.etherAddress + "</td>"
    trStr += "<td>" + user.inviteCode + "</td>"
    trStr += "<td>" + user.inviteCount + "</td>"
    trStr += "</tr>"

    return trStr;
}