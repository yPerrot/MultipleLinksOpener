const isChrome = navigator.userAgent.indexOf('Chrome') !== -1;

window.onload = (event) => {
    const doLoadAllPages = JSON.parse(localStorage.getItem('doLoadAllPages'));

    if ( !isChrome && doLoadAllPages) {
       document.querySelector("#switch__checkbox").checked = true;
    }

    if (isChrome) {
        document.querySelector('#switch__checkbox').disabled = true;
        
        document.documentElement.style.setProperty('--toogle-cursor', 'not-allowed');
        document.documentElement.style.setProperty('--toogle-btn-color', '#e8e8e8');
    }
}

document.querySelector('#switch__checkbox').onclick = function () {
    localStorage.setItem('doLoadAllPages', document.querySelector("#switch__checkbox").checked)
}

document.querySelector('#open-btn').onclick = function () {
    const links = document.querySelector('#links').value;
    const doLoad = !document.querySelector("#switch__checkbox").checked;

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
