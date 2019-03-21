Vue.http.interceptors.push(function (request, next) {
    request.headers.set('Authorization', 'Basic ' + localStorage.getItem('accessToken'));
    //$.getTopWindow().gmBlockUI.blockUI({
    //    target: window.$("body"),
    //    //animate: true,
    //    boxed: true,
    //    message: '数据加载中，请稍后...'
    //});

    next(function (response) {

        //$.getTopWindow().gmBlockUI.unblockUI(window.$("body"));

        if (response.status === 401) {
            $.getTopWindow().window.location.href = $.getTopWindow().baseUrl;
        }
        if (response.status === 400) {
            var message = "<span style='color:red;'>请检查以下错误:</span><br />";
            var errors = response.body.errors;
            $.each(errors, function (i, propString) {
                message += propString + "<br />";
            });
            $.getTopWindow().bootstrapGM.alert(message);
        }
        return response;
    });
}) 