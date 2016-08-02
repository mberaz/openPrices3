var common = {};

common = function () {
    var pub = {};
    var self = {};
    pub.baseURl = "http://localhost:5000/";
    pub.initLoadingAnimation = function (run) {
        $(document).ajaxStart(function (setting) {
            self.showLoadingAnimation($('body'))
        }).ajaxStop(function (setting) {
            self.hideLoadingAnimation($('body'));
        }).ajaxSend(function (evt, request, settings) {

        });
    };

    self.showLoadingAnimation = function (bodyElement) {
        $.blockUI({
            message: '<img src="/web/css/images/loading.gif" />',
            css: { width: '4%', border: '0px solid transparent', cursor: 'wait', backgroundColor: 'transparent', top: '15%', right: '45%' },
            overlayCSS: { backgroundColor: '#FFFFFF', opacity: 0.0, cursor: 'wait' }
        });
    };

    self.hideLoadingAnimation = function (bodyElement) {
        $.unblockUI();
    };


    return pub;

} ();