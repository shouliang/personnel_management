/**
 * Created by shouliang on 2016/6/21.
 */

$(function () {
    eventListener();
});

function eventListener() {

    $(window).keydown(function (event) {
        if (event.which == 13) {
            $(".login-form-login").click();
        }
    });

    $(".login-form-login").on("click", function () {
        if (!checkAccount($("#userName"))) {
            return;
        }

        if (!checkPwd($("#password"))) {
            return;
        }

        var userName = $("#userName").val();
        var password = $("#password").val();

        $.post("/user/login", {userName: userName, password: password}, function (data) {
            if (data.tag == "success") {
                window.location.href = "/index";
            } else {
                setAlertModal(data.message);
            }
        });
    });
}

function checkAccount(obj) {
    var account = $(obj).val();
    if (account == "") {
        setAlertModal("用户名不能为空!");
        $(obj).focus();
        return false;
    }
    if (account.indexOf(" ") != -1) {
        setAlertModal("用户名不能包含空格!");
        $(obj).focus();
        return false;
    }
    return true;
}

function checkPwd(obj) {
    var password = $(obj).val();

    if (password == "") {
        setAlertModal("密码不能为空!");
        $(obj).focus();
        return false;
    }

    if (password.indexOf(" ") != -1) {
        setAlertModal("密码不能包含空格!");
        $(obj).focus();
        return false;
    }
    return true;
}