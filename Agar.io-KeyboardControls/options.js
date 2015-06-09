// Saves options to chrome.storage
function save_options() {
    var keyLeft = document.getElementById('btn-left').textContent,
        keyUp = document.getElementById('btn-up').textContent,
        keyRight = document.getElementById('btn-right').textContent,
        keyDown = document.getElementById('btn-down').textContent,
        keySplit = document.getElementById('btn-split').textContent,
        keyShoot = document.getElementById('btn-shoot').textContent;
    
    chrome.storage.sync.set({
        keyLeft: keyLeft,
        keyUp: keyUp,
        keyRight: keyRight,
        keyDown: keyDown,
        keySplit: keySplit,
        keyShoot: keyShoot
    }, function() {
        // Update status to let user know options were saved.
        var status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function() {
            status.textContent = '';
        }, 750);
    });
}

// Restores states using the preferences stored in chrome.storage
function restore_options() {
    // Use default values if there isn't a save available
    chrome.storage.sync.get({
        keyLeft: 37,
        keyUp: 38,
        keyRight: 39,
        keyDown: 40,
        keySplit: 32,
        keyShoot: 87
    }, function(items) {
        document.getElementById('btn-left').textContent = items.keyLeft;
        document.getElementById('btn-up').textContent = items.keyUp;
        document.getElementById('btn-right').textContent = items.keyRight;
        document.getElementById('btn-down').textContent = items.keyDown;
        document.getElementById('btn-split').textContent = items.keySplit;
        document.getElementById('btn-shoot').textContent = items.keyShoot;
    });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('btn-save').addEventListener('click', save_options);
document.getElementById('btn-left').addEventListener('click', function() { addButtonHandler('left'); });
document.getElementById('btn-up').addEventListener('click', function() { addButtonHandler('up'); });
document.getElementById('btn-right').addEventListener('click', function() { addButtonHandler('right'); });
document.getElementById('btn-down').addEventListener('click', function() { addButtonHandler('down'); });
document.getElementById('btn-split').addEventListener('click', function() { addButtonHandler('split'); });
document.getElementById('btn-shoot').addEventListener('click', function() { addButtonHandler('shoot'); });

function addButtonHandler(button) {
    document.addEventListener('keydown', keydownHandler, false);
    document.getElementById('btn-'+button+'-text').textContent = "Press any key!";
    function keydownHandler(e) {
        var key = e.keyCode;
        document.getElementById('btn-'+button).textContent = key;
        //document.getElementById('btn-'+button).textContent = String.fromCharCode((96 <= key && key <= 105)? key-48 : key);
        document.removeEventListener('keydown', keydownHandler, false);
        document.getElementById('btn-'+button+'-text').textContent = '';
    }
    setTimeout(function() {
        document.removeEventListener('keydown', keydownHandler, false);
        document.getElementById('btn-'+button+'-text').textContent = '';
    }, 2000);
}