$(document).ready(function () {
    //Restores states using the preferences stored in chrome.storage
    //Use default values if there isn't a save available
    chrome.storage.sync.get({
        keyLeft: 37,
        keyUp: 38,
        keyRight: 39,
        keyDown: 40,
        keySplit: 32,
        keyShoot: 87
    }, function(items) {
        var keybinds = {};
        keybinds["left"] = parseInt(items.keyLeft);
        keybinds["up"] = parseInt(items.keyUp);
        keybinds["right"] = parseInt(items.keyRight);
        keybinds["down"] = parseInt(items.keyDown);
        keybinds["split"] = parseInt(items.keySplit);
        keybinds["shoot"] = parseInt(items.keyShoot);
        $("form").attr("onclick", "("+modifyControls+")("+keybinds.left+", "+keybinds.up+", "+keybinds.right+", "+keybinds.down+", "+keybinds.split+", "+keybinds.shoot+");");
    });
})

function modifyControls(keyLeft, keyUp, keyRight, keyDown, keySplit, keyShoot) {
    var canvas = document.getElementById("canvas"),
        origin = {clientX: window.innerWidth / 2, clientY: window.innerHeight / 2},
        inputcontroller = canvas.onmousemove,
        old_onkeydown = window.onkeydown,
        old_onkeyup = window.onkeyup,
        keybinds = {},
        keybinds_array = [];
    keybinds["left"] = keyLeft;
    keybinds["up"] = keyUp;
    keybinds["right"] = keyRight;
    keybinds["down"] = keyDown;
    keybinds["split"] = keySplit;
    keybinds["shoot"] = keyShoot;
    for (var kb in keybinds) {
        keybinds_array.push(keybinds[kb]);
    }

    //Disable mouse movement and stop the player from moving at start.
    canvas.onmousemove = null;
    //canvas.onmousedown = null; //Keep onmousedown enabled, because stopping is easier using this event.
    inputcontroller(origin);

    var keys = [];
    //Add listeners for keyboard input.
    window.onkeydown = window.onkeyup = function (k) {
        if (k.repeat && (k.type == "keydown" || k.keyCode == keybinds["split"] || k.keyCode == keybinds["shoot"])) {return;}
        if (keybinds_array.indexOf(k.keyCode) > -1) {
            keys[k.keyCode] = k.type == "keydown";
            if (k.keyCode == keybinds["split"]) {
                old_onkeydown({keyCode: 32});
                old_onkeyup({keyCode: 32});
            }
            else if (k.keyCode == keybinds["shoot"]) {
                old_onkeydown({keyCode: 87});
                old_onkeyup({keyCode: 87});
            }
            else {
                handleInput();
            }
        }
        else {
            if (k.keyCode != 32 && k.keyCode != 87) {
                old_onkeydown(k);
                old_onkeyup(k);
            }
        }
    }

    function handleInput() {
        var maxX = window.innerWidth,
            maxY = window.innerHeight,
            dx = 0,
            dy = 0;

        if (keys[keybinds["left"]]) {
            //LEFT
            dx = -1;
        }
        if (keys[keybinds["up"]]) {
            //UP
            dy = -1;
        }
        if (keys[keybinds["right"]]) {
            //RIGHT
            dx = 1;
        }
        if (keys[keybinds["down"]]) {
            //DOWN
            dy = 1;
        }

        var x, y;
        if (dx == -1) {
            x = 0; 
        } else if (dx == 1) {
            x = maxX;
        } else {
            x = maxX / 2;
        }
        if (dy == -1) {
            y = 0; 
        } else if (dy == 1) {
            y = maxY;
        } else {
            y = maxY / 2;
        }

        //Send input to game inputcontroller
        inputcontroller({clientX: x, clientY: y});

        //Stop using the onmousedown event
        if (dx == 0 && dy == 0) {
            for (var i = 10; i > 0; i--) {
                canvas.onmousedown({clientX: (window.innerWidth / 2) + i, clientY: (window.innerHeight / 2) + i});
            }
        }
    }

    //Add listeners that stop movement when the window loses focus or is resized
    window.addEventListener("blur", function() {
        inputcontroller(origin); 
    }, true);
    window.addEventListener("resize", function() {
        origin = {clientX: window.innerWidth / 2, clientY: window.innerHeight / 2};
        inputcontroller(origin); 
    }, true);
}