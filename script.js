document.querySelector('#open-btn').onclick = function () {
    const links = document.querySelector('#links').value;
    const doLoad = !document.querySelector("#switch__checkbox").checked;

    const isChrome = navigator.userAgent.indexOf('Chrome') !== -1;

    links.split('\n').forEach(link => {
        if (link.length == 0 || link.startsWith('//') || link.startsWith('#')) return;

        if (isChrome) {
            chrome.tabs.create({
                url: link,
                active: false,
            });
        } else {
            browser.tabs.create({
                url: link,
                active: false,
                discarded: doLoad,
            });
        }

    });

    document.querySelector('textarea').value = '';
    return false;
}


// FIXME: move it
if (navigator.userAgent.indexOf('Chrome') != -1) {
    document.querySelector('#switch__checkbox').disabled = true;
    
    let toggleStyle = document.querySelector('.switch').style;

    toggleStyle.setProperty('--toogle-cursor', 'not-allowed');
    toggleStyle.setProperty('--toogle-btn-color', '#e8e8e8');
}