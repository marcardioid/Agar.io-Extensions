$("document").ready(function () {
    $("#playBtn").attr("onclick", "(" + modifyControls + ")()");
})

function modifyControls() {
    var canvas = document.getElementById('canvas'),
        controller = canvas.onmousemove,
        origin = {clientX: innerWidth / 2, clientY: innerHeight / 2};
    
    //Disable mouse movement and stop the player from moving at start.
    canvas.onmousemove = null;
    canvas.onmousedown = null;
    controller(origin);
    
    window.onkeydown = function (f) {
        console.log("KEY: " + f.keyCode);
    }
    
    window.onkeyup = function (f) {
        controller(origin);
    }
}