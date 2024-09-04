document.addEventListener('DOMContentLoaded', function () {
    const consorTextBox = document.getElementById('consorTextBox');

    chrome.storage.local.get(['consorText'], function (item) {
        consorTextBox.value = item.consorText || '';

    })
});

document.getElementById('copyToClipboardButton').addEventListener('click', function (event) {
    chrome.storage.local.get(['consorText'], function (item) {
        navigator.clipboard.writeText(item.consorText).then(function(){
            console.log('text successfully copied to the clipboard.');
        }).catch(function(err){
            console.log('consor error');
        });
    })
});

document.getElementById('clearButton').addEventListener('click', function (event) {
    chrome.storage.local.set({consorText:''});
    document.getElementById('consorTextBox').value='';
});


