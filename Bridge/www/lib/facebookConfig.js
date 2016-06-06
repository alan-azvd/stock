
var FacebookInit = function (facebookAppId, callback) {

    $(document).ready(function () {
        $.ajaxSetup({ cache: true });
        $.getScript('http://connect.facebook.net/en_US/sdk.js', function () {
            FB.init({
                appId: facebookAppId,
                cookie: true,  // enable cookies to allow the server to access
                // the session
                xfbml: true,  // parse social plugins on this page
                version: 'v2.6'
            });
            //$('#loginbutton,#feedbutton').removeAttr('disabled');
            //FB.getLoginStatus(updateStatusCallback);
            callback.execute();
        });
    });
};

var FacebookLogout = function (callback) {
    FB.logout(function (response) {
        callback.execute();
    });
};