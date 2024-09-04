document.addEventListener('DOMContentLoaded', function () {
    const copyToClipboardButton = document.getElementById('copyToClipboardButton');
    const viewButton = document.getElementById('viewButton');
    const clearButton = document.getElementById('clearButton');

    copyToClipboardButton.addEventListener('click', function () {
        chrome.storage.local.get(['consorText'], function (item) {
            navigator.clipboard.writeText(item.consorText).then(function () {
                console.log('text successfully copied to the clipboard.');
            }).catch(function (err) {
                console.log('consor error');
            });
        })
    });

    viewButton.addEventListener('click', function () {
        chrome.tabs.create({ url: chrome.runtime.getURL('consor.html') });
    });

    clearButton.addEventListener('click', function () {
        chrome.storage.local.set({ consorText: '' });
    });

});