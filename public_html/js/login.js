$(function () {
    $('#login').click(function (e) {
        e.preventDefault();
        var username = $("input#username").val();
        var password = $("input#password").val();
        var user = {username: username, password: password};
        $.ajax
        ({
            type: "POST",
            url: "/users/authenticate/",
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            async: false,
            data: JSON.stringify(user),
            success: function (response) {
                localStorage.setItem('accessToken', response.token);
                window.location = "index.html";
            },
            error: function () {
                alert("Wrong username or password");
            }
        }).done(function(){

        });
    });

});
