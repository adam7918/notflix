
$(function () {
    if(localStorage.getItem('accessToken')){
        $(".logged-in").show();
        $(".logged-out").hide(0);
        $('#logged-in-user').text(localStorage.getItem('username'));

    } else {
        $(".logged-in").hide(0);
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