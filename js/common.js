
$.ajaxSetup ({cache:false});
function is_cellphone_number(str) {
    var pattern = /^\d{11}$/;
    return pattern.test(str);
}
$('.header-back').on('click',function(){
    window.history.go(-1);
});
$('#modalBtn').on('click',function(){
    $('#myModal').addClass('show').removeClass('hide');
});
$('#myModal').on('click',function(){
    $('#myModal').addClass('hide').removeClass('show');
})