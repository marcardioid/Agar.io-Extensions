var keys = ['left', 'up', 'right', 'down', 'split', 'shoot'];
var bindings = [];

// names of known key codes (0-255)
var keyboardMap = ["","","","CANCEL","","","HELP","","BACK_SPACE","TAB","","","CLEAR","ENTER","RETURN","","SHIFT","CONTROL","ALT","PAUSE","CAPS_LOCK","KANA","EISU","JUNJA","FINAL","HANJA","","ESCAPE","CONVERT","NONCONVERT","ACCEPT","MODECHANGE","SPACE","PAGE_UP","PAGE_DOWN","END","HOME","LEFT","UP","RIGHT","DOWN","SELECT","PRINT","EXECUTE","PRINTSCREEN","INSERT","DELETE","","0","1","2","3","4","5","6","7","8","9","COLON","SEMICOLON","LESS_THAN","EQUALS","GREATER_THAN","QUESTION_MARK","AT","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","WIN","","CONTEXT_MENU","","SLEEP","NUMPAD0","NUMPAD1","NUMPAD2","NUMPAD3","NUMPAD4","NUMPAD5","NUMPAD6","NUMPAD7","NUMPAD8","NUMPAD9","MULTIPLY","ADD","SEPARATOR","SUBTRACT","DECIMAL","DIVIDE","F1","F2","F3","F4","F5","F6","F7","F8","F9","F10","F11","F12","F13","F14","F15","F16","F17","F18","F19","F20","F21","F22","F23","F24","","","","","","","","","NUM_LOCK","SCROLL_LOCK","WIN_OEM_FJ_JISHO","WIN_OEM_FJ_MASSHOU","WIN_OEM_FJ_TOUROKU","WIN_OEM_FJ_LOYA","WIN_OEM_FJ_ROYA","","","","","","","","","","CIRCUMFLEX","EXCLAMATION","DOUBLE_QUOTE","HASH","DOLLAR","PERCENT","AMPERSAND","UNDERSCORE","OPEN_PAREN","CLOSE_PAREN","ASTERISK","PLUS","PIPE","HYPHEN_MINUS","OPEN_CURLY_BRACKET","CLOSE_CURLY_BRACKET","TILDE","","","","","VOLUME_MUTE","VOLUME_DOWN","VOLUME_UP","","","SEMICOLON","EQUALS","COMMA","MINUS","PERIOD","SLASH","BACK_QUOTE","","","","","","","","","","","","","","","","","","","","","","","","","","","OPEN_BRACKET","BACK_SLASH","CLOSE_BRACKET","QUOTE","","META","ALTGR","","WIN_ICO_HELP","WIN_ICO_00","","WIN_ICO_CLEAR","","","WIN_OEM_RESET","WIN_OEM_JUMP","WIN_OEM_PA1","WIN_OEM_PA2","WIN_OEM_PA3","WIN_OEM_WSCTRL","WIN_OEM_CUSEL","WIN_OEM_ATTN","WIN_OEM_FINISH","WIN_OEM_COPY","WIN_OEM_AUTO","WIN_OEM_ENLW","WIN_OEM_BACKTAB","ATTN","CRSEL","EXSEL","EREOF","PLAY","ZOOM","","PA1","WIN_OEM_CLEAR",""];

//Saves options to chrome.storage
function save_options() {
    var keyLeft = keyboardMap.indexOf(document.getElementById('btn-left').textContent),
        keyUp = keyboardMap.indexOf(document.getElementById('btn-up').textContent),
        keyRight = keyboardMap.indexOf(document.getElementById('btn-right').textContent),
        keyDown = keyboardMap.indexOf(document.getElementById('btn-down').textContent),
        keySplit = keyboardMap.indexOf(document.getElementById('btn-split').textContent),
        keyShoot = keyboardMap.indexOf(document.getElementById('btn-shoot').textContent);
    
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

//Restores states using the preferences stored in chrome.storage
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
        document.getElementById('btn-left').textContent = keyboardMap[parseInt(items.keyLeft)];
        document.getElementById('btn-up').textContent = keyboardMap[parseInt(items.keyUp)];
        document.getElementById('btn-right').textContent = keyboardMap[parseInt(items.keyRight)];
        document.getElementById('btn-down').textContent = keyboardMap[parseInt(items.keyDown)];
        document.getElementById('btn-split').textContent = keyboardMap[parseInt(items.keySplit)];
        document.getElementById('btn-shoot').textContent = keyboardMap[parseInt(items.keyShoot)];
        bindings.push(parseInt(items.keyLeft));bindings.push(parseInt(items.keyUp));bindings.push(parseInt(items.keyRight));
        bindings.push(parseInt(items.keyDown));bindings.push(parseInt(items.keySplit));bindings.push(parseInt(items.keyShoot));
    });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('btn-save').addEventListener('click', save_options);

keys.forEach(function(key) {
    document.getElementById('btn-'+key).addEventListener('click', function() { addButtonHandler(key); });
});

function addButtonHandler(button) {
    // Clear all current handlers!
    keys.forEach(function(key) {
        document.getElementById('btn-'+key+'-text').textContent = '';
    });
    document.addEventListener('keydown', keydownHandler, false);
    document.getElementById('btn-'+button+'-text').textContent = "Press any key!";

    function keydownHandler(e) {
        var key = e.keyCode;
        if (bindings.indexOf(key) > -1) {
            document.removeEventListener('keydown', keydownHandler, false);
            document.getElementById('btn-'+button+'-text').textContent = 'This key is already in use!';
        }
        else {
            bindings.splice(bindings.indexOf(keyboardMap.indexOf(document.getElementById('btn-'+button).textContent)), 1);
            bindings.push(key);
            //document.getElementById('btn-'+button).textContent = key;
            document.getElementById('btn-'+button).textContent = keyboardMap[key];
            //document.getElementById('btn-'+button).textContent = String.fromCharCode((96 <= key && key <= 105)? key-48 : key);
            document.removeEventListener('keydown', keydownHandler, false);
            document.getElementById('btn-'+button+'-text').textContent = '';
        }
        e.preventDefault();
    }
    setTimeout(function() {
        document.removeEventListener('keydown', keydownHandler, false);
        document.getElementById('btn-'+button+'-text').textContent = '';
    }, 2000);
}