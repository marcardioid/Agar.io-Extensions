$("document").ready(function () {
    $("#playBtn").attr("onclick", "(" + modifyControls + ")()");
})

function modifyControls() {
    var canvas = document.getElementById('canvas'),
        origin = {clientX: innerWidth / 2, clientY: innerHeight / 2},
        controller = canvas.onmousemove,
        old_onkeydown = window.onkeydown,
        old_onkeyup = window.onkeyup;
    
    //Disable mouse movement and stop the player from moving at start.
    canvas.onmousemove = null;
    canvas.onmousedown = null;
    controller(origin);
    
    //Add listeners for keyboard input.
    window.onkeydown = function (k) {
        //console.log("KEY: " + k.keyCode);
        old_onkeydown(k);
        newX = innerWidth / 2;
        newY = innerHeight / 2;
        switch(k.keyCode) {
                case 37:
                    //LEFT
                    newX = -100000;
                    break;
                case 38:
                    //UP
                    newY = -100000;
                    break;
                case 39:
                    //RIGHT
                    newX = 100000;
                    break;
                case 40:
                    //DOWN
                    newY = 100000;
                    break;
        }
        controller({clientX: newX, clientY: newY});
    }
    window.onkeyup = function (k) {
        old_onkeyup(k);
        controller(origin);
    }
    
    //Add listeners that stop movement when the window loses focus or is resized.
    window.addEventListener("blur", function() {
        controller(origin); 
    }, true);
    window.addEventListener("resize", function() {
        origin = {clientX: innerWidth / 2, clientY: innerHeight / 2};
        controller(origin); 
    }, true);
}