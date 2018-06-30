Blazor.registerFunction('jsonP', function (url) {
    return new Promise(function (resolve, reject) {
        var id = '_' + Math.round(10000 * Math.random());
        var callbackName = 'jsonp_callback_' + id;

        window[callbackName] = function (data) {
            delete window[callbackName];
            var ele = document.getElementById(id);
            ele.parentNode.removeChild(ele);
            var jsonAsString = JSON.stringify(data);
            resolve(jsonAsString);
        };

        // remove 2 double quotes from url string passed from .Net
        url = url.replace('"', '');
        url = url.replace('"', '');
        var src = url + '&callback=' + callbackName;
        var script = document.createElement('script');
        script.src = src;
        script.id = id;
        script.addEventListener('error', reject);
        (document.getElementsByTagName('head')[0] || document.body || document.documentElement).appendChild(script)
    });
});
