window.doorbellOptions = {
    id: '10221',
    appKey: 'NonpDJQupu3MvVNwX4znycsD02qHzWNDuRqpCeHdeWpV0Ydp4KOV9rUZpLI3tLvn'
};
(function (w, d, t) {
    var hasLoaded = false;

    function l() {
        if (hasLoaded) {
            return;
        }
        hasLoaded = true;
        window.doorbellOptions.windowLoaded = true;
        var g = d.createElement(t);
        g.id = 'doorbellScript';
        g.type = 'text/javascript';
        g.async = true;
        g.src = 'https://embed.doorbell.io/button/' + window.doorbellOptions['id'] + '?t=' + (new Date().getTime());
        (d.getElementsByTagName('head')[0] || d.getElementsByTagName('body')[0]).appendChild(g);
    }
    if (w.attachEvent) {
        w.attachEvent('onload', l);
    } else if (w.addEventListener) {
        w.addEventListener('load', l, false);
    } else {
        l();
    }
    if (d.readyState == 'complete') {
        l();
    }
}(window, document, 'script'));
