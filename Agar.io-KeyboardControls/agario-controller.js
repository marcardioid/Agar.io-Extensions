$("document").ready(function () {
    $("#playBtn").attr("onclick", "(" + modifyControls + ")()");
})

function modifyControls() {
    var canvas = document.getElementById("canvas"),
        origin = {clientX: window.innerWidth / 2, clientY: window.innerHeight / 2},
        inputcontroller = canvas.onmousemove,
        old_onkeydown = window.onkeydown,
        old_onkeyup = window.onkeyup;
    
    //Disable mouse movement and stop the player from moving at start.
    canvas.onmousemove = null;
    //canvas.onmousedown = null;
    inputcontroller(origin);
    
    var keys = [];
    //Add listeners for keyboard input.
    window.onkeydown = function (k) {
        if (k.repeat) {return;}
        old_onkeydown(k);
        if (k.keyCode >= 37 && k.keyCode <= 40) {
            keys[k.keyCode] = k.type == "keydown";
            handleInput();
        }
    }
    window.onkeyup = function (k) {
        old_onkeyup(k);
        if (k.keyCode >= 37 && k.keyCode <= 40) {
            keys[k.keyCode] = k.type == "keydown";
            handleInput();
        }
    }

    function handleInput() {
        var maxX = window.innerWidth,
            maxY = window.innerHeight,
            dx = 0,
            dy = 0;

        if (keys[37]) {
            //LEFT
            dx = -1;
        }
        if (keys[38]) {
            //UP
            dy = -1;
        }
        if (keys[39]) {
            //RIGHT
            dx = 1;
        }
        if (keys[40]) {
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

        //Send input to game inputcontroller.
        inputcontroller({clientX: x, clientY: y});
        
        //TODO: Proper stopping!
        //Hacky way to stop movement quickly.
        if (dx == 0 && dy == 0) {
            for (var i = 10; i > 0; i--) {
                canvas.onmousedown({clientX: (window.innerWidth / 2) + i, clientY: (window.innerHeight / 2) + i});
            }
        }
    }
    
    //Add listeners that stop movement when the window loses focus or is resized.
    window.addEventListener("blur", function() {
        inputcontroller(origin); 
    }, true);
    window.addEventListener("resize", function() {
        origin = {clientX: window.innerWidth / 2, clientY: window.innerHeight / 2};
        inputcontroller(origin); 
    }, true);
}