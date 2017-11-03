if(localStorage.getItem('accessToken')){
    alert("You cannot register while logged in!");
    window.location = "index.html";
}
$(function () {
    $('#register').click(function (e) {
        e.preventDefault();
        var username = $("input#username").val();
        var password = $("input#password").val();
        var forename = $("input#forename").val();
        var middlename = $("input#middlename").val();
        var surname = $("input#surname").val();
        var user = {username: username, password: password, firstName : forename, middleName : middlename, lastName: surname};
        $.ajax
        ({
            type: "POST",
            url: "/users/",
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            async: false,
            data: JSON.stringify(user),
            success: function (response) {
                alert("Account registered!");
                window.location = "login.html";
            },
            error: function () {
                alert("Missing fields");
            }
        }).done(function(){

        });
    });
});
