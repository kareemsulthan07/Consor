var selectedText = '';

function stringIsNullOrEmpty(str) {
    return str === null || str === '';
}

function removePopup() {
    const existingPopup = document.getElementById('consorPopup');
    if (existingPopup) {
        existingPopup.remove();
    }
}

function save() {
    chrome.storage.local.get(['consorText'], function (item) {
        var existingText = item.consorText || '';

        var newText;

        if (!existingText) {
            newText = selectedText;
        }
        else {
            newText = existingText + '\n\n' + selectedText;
        }

        chrome.storage.local.set({ consorText: newText });
    });
}

function showPopup(selection) {
    var popup = document.createElement('div');
    popup.id = 'consorPopup';
    popup.style.position = 'absolute';
    popup.style.background = 'white';
    popup.style.color = 'black';
    popup.style.border = '1px solid black';
    popup.style.fontSize = '15px';
    popup.style.fontWeight = 'bold';
    popup.style.width = '30px';
    popup.style.height = '30px';
    popup.style.display = 'flex';
    popup.style.justifyContent = 'center';
    popup.style.alignItems = 'center';
    popup.style.zIndex = 10000;
    popup.style.boxShadow = '0px 0px 10px rgba(0,0,0,0.5)';
    popup.style.cursor = 'pointer';
    popup.innerText = '+';

    var scrollLeft = window.scrollX || document.documentElement.scrollLeft;
    var scrollTop = window.scrollY || document.documentElement.scrollTop;

    var range = selection.getRangeAt(0);
    var rect = range.getBoundingClientRect();

    var left = scrollLeft + rect.left;
    var top = scrollTop + rect.top;

    popup.style.left = `${rect.left}px`;
    popup.style.top = `${top - 30}px`;

    document.body.appendChild(popup);


    popup.addEventListener('click', function (event) {
        console.log('popup clicked');
        event.stopPropagation();

        save();

        // at the end remove this poupup
        removePopup();
    });
}

document.addEventListener('mouseup', function (event) {

    // if the 'mouseup' event is happening on the popup
    // then return from this handler so that the 'click' event can occur
    if (event.target && event.target.id === 'consorPopup')
        return;

    removePopup();

    var selection = window.getSelection();
    selectedText = selection.toString().trim();
    console.log(`inside mouseup ${selectedText}`);

    if (!stringIsNullOrEmpty(selectedText)) {
        showPopup(selection);
    }
});

document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
        removePopup();
    }
});