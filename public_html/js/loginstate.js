
$(function () {
    if(localStorage.getItem('accessToken')){
        $(".logged-in").show();
        $(".logged-out").hide();
        $('#logged-in-user').text(localStorage.getItem('username'));

    } else {
        $(".logged-in").hide();
        $(".logged-out").show();
    }
});

$(function () {
    $('#logout').click(function () {
        localStorage.removeItem('username');
        localStorage.removeItem('accessToken');
        window.location = "index.html";
    });
});