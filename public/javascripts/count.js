(function() {
    'use strict';
    var lastCount, countElem = null;

    function setCount(count) {
        if (!countElem) {
            countElem = document.getElementById('odometer');
        }
        if (count !== lastCount) {
            countElem.innerHTML = count;
            lastCount = count;
        }
    }
    setTimeout(function() {
        setCount(window.COUNT_ON_LOAD);
    }, 1000);

    function refreshCount() {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', '/api/stats/count', true);
        xhr.onload = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                try {
                    var data = JSON.parse(xhr.responseText);
                    setCount(data.count);
                } catch (e) {
                    console.error(e);
                }
            }
        };
        xhr.onerror = function() {
            console.error(xhr.statusText);
        };
        xhr.send(null);
    }

    setInterval(refreshCount, 7000);
})();
