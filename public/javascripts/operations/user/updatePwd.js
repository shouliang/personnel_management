$(function () {
    function check() {
        var pwdErrorHide = true;
        var pwdRepeatErrorHide = true;
        if ($("[func=pwd]").val().length < 8) {
            pwdErrorHide = false;
            $("[func=pwd-error]").html("密码长度必须大于8位").css("display", "inline");
        }
        if ($("[func=pwd]").val() == $("[func=old-pwd]").val()) {
            pwdErrorHide = false;
            $("[func=pwd-error]").html("新密码不能与老密码相同").css("display", "inline");
        }
        if ($("[func=pwd-repeat]").val() != $("[func=pwd]").val()) {
            pwdRepeatErrorHide = false;
            $("[func=repeat-error]").html("两次输入密码不同").css("display", "inline");
        }
        if (pwdErrorHide) {
            $("[func=pwd-error]").hide();
        }
        if (pwdRepeatErrorHide) {
            $("[func=repeat-error]").hide();
        }
        return pwdErrorHide && pwdRepeatErrorHide;
    }

    $("[func=pwd]").on("keyup", function () {
        if ($(this).val().length < 8) {
            return $("[func=pwd-error]").html("密码长度必须大于8位").css("display", "inline");
        }
        if ($(this).val() == $("[func=old-pwd]").val()) {
            return $("[func=pwd-error]").html("新密码不能与老密码相同").css("display", "inline");
        }
        $("[func=pwd-error]").hide();
    })
    $("[func=pwd-repeat] ,[func=pwd]").on("keyup", function () {
        if ($("[func=pwd-repeat]").val() != $("[func=pwd]").val()) {
            return $("[func=repeat-error]").html("两次输入密码不同").css("display", "inline");
        }
        $("[func=repeat-error]").hide();
    })
    $("form#update-pwd").on("submit", function () {
        return check();
    })

})