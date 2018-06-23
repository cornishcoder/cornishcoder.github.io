Blazor.registerFunction('jsonP', function (url) {

    var data = {};
    var callback = function (data) {
        const apiCallback = Blazor.platform.findMethod(
            'CornishCoderBlazor',
            'CornishCoderBlazor.Pages',
            'FetchData',
            'ApiCallback'
        );
        
        console.log(data);
        Blazor.platform.callMethod(apiCallback, null, [Blazor.platform.toDotNetString(JSON.stringify(data))]);
    };

    J50Npi.getJSON(url, data, callback);
});