const isChrome = navigator.userAgent.indexOf('Chrome') !== -1;
// Shamefully stolen from https://github.com/htrinter/Open-Multiple-URLs
const regExpURL = /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()[\]{};:'".,<>?«»“”‘’]))/gi

window.onload = () => {
    const doLoadAllPages = JSON.parse(localStorage.getItem('doLoadAllPages'));

    if ( !isChrome && doLoadAllPages) {
       document.querySelector("#switch__checkbox").checked = true;
    }

    document.querySelector('#links').focus();
}

document.querySelector('#switch__checkbox').onclick = function () {
    localStorage.setItem('doLoadAllPages', document.querySelector("#switch__checkbox").checked)
}

document.querySelector('#open-btn').onclick = loadPages;
document.onkeydown = (event) => {
    if (event.ctrlKey && event.code === 'Enter') {
        loadPages();
        window.close();
    }
}


function loadPages() {
    const text = document.querySelector('#links').value;
    const doLoad = !document.querySelector("#switch__checkbox").checked;

    text.match(regExpURL)?.forEach(async link => {
        if ( !link.startsWith('http')) {
            link = 'http://' + link;
        }
        
        if (isChrome) {
            if (doLoad) {
                link = 'data:text/html,<title>' + link
            }

            chrome.tabs.create({
                url: link,
                active: false
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
}

// Nerver used but keept as a reminder
function discardToogle() {
    document.querySelector('#switch__checkbox').disabled = true;
    
    document.documentElement.style.setProperty('--toogle-cursor', 'not-allowed');
    document.documentElement.style.setProperty('--toogle-btn-color', '#e8e8e8');
}