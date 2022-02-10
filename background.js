// https://stackoverflow.com/questions/67009241/google-chrome-extension-how-to-open-a-new-tab-in-a-discarded-hibernating-state
chrome.tabs.onActivated.addListener(({tabId, windowId}) => {
    const splitText = 'data:text/html,<title>';
    
    chrome.tabs.get(tabId, tab => {
        if (tab.url.startsWith(splitText)) {
            const realTabUrl = tab.url.replace(splitText, '')
            
            if ( !realTabUrl.startsWith('http')) {
                realTabUrl = 'http://' + realTabUrl;
            }

            chrome.tabs.update(tabId, {
                url: realTabUrl, 
            });
    
        }
    });
})