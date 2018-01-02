$(function(){
    var searchURL = window.location.search;
    searchURL = searchURL.substring(1, searchURL.length);
    var channel = searchURL.split("&")[0].split("=")[1];

    $('#receive-account').attr('src', 'img/receive-' + channel + '.png');
});
