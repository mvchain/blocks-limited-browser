$(function(){

    $('#submit-btn').click(function(){
        var password = $('#input-password').val()
        var csvData = $('#csvData').val()
        var data = {};
        data.password = password;
        data.csvData = csvData;
        $.post(
            backPath + '/invite/inviteCount',
            data,
            function(result) {
                var res = JSON.parse(result)
                if (res.status == 400) {
                    alert(res.message)
                } else if (res.status != 200) {
                    alert("对不起，出错了，请稍后再试！")
                } else {
                    alert("导入成功！更新" + res.data + "条数据。");
                }
            }
        )
    })
})