var mainCanvas = document.getElementById('nodeCanvas');

var isDragging = false;
var elemBelow;
var parentElem;
var bodyElem = document.querySelector('body');
var tableElem = document.querySelector('table');
var divNodes = document.getElementsByClassName('divNode');
var currentNode = divNodes[0];

// var shiftX = clientX - element.getBoundingClientRect().left;
// var shiftY = clientY - element.getBoundingClientRect().top;

function alertMousePosition() {
    console.log(divNodes)
}

//To know if draggable div has been clicked
var draggableDivHasBeenClicked = 0;

currentNode.addEventListener('mousedown', function () {
    draggableDivHasBeenClicked = 1;
})

var mouseUpOnMainCanvas = function () {
    //check if div to drag is clicked
    if(draggableDivHasBeenClicked == 1){
        draggableDivHasBeenClicked = 0;
        currentNode.removeEventListener('mousemove', mouseMoveFunction);
        console.log('Draggable div UNclicked');
    }
}

var mouseDownOnMainCanvas = function () {
    //check if div to drag is clicked
    if(draggableDivHasBeenClicked == 0){
        currentNode.addEventListener('mousemove', mouseMoveFunction);
        console.log('Draggable div clicked');
    } else {console.log('No draggable div clicked')}
}

//Call the functions
mainCanvas.addEventListener('mousedown', mouseDownOnMainCanvas);
mainCanvas.addEventListener('mouseup', mouseUpOnMainCanvas);

//Mouse DOWN/MOVE/UP Functions//
// var mouseDownFunction = function (event) {
//     console.log("x = " + x);
//     mainCanvas.addEventListener('mousemove', mouseMoveFunction);
// }

var mouseMoveFunction = function (event) {
    var mouseUpX = event.clientX;
    var mouseUpY = event.clientY;
    currentNode.style.left = mouseUpX - 5 + 'px';
    currentNode.style.top = mouseUpY - 5 + 'px';
}

var mouseUpFunction = function (event) {
    console.log("x = " + x);
    mainCanvas.removeEventListener('mousemove', mouseMoveFunction);
}

// mainCanvas.addEventListener('mousedown', mouseDownFunction);
// mainCanvas.addEventListener('mousemove', mouseMoveFunction);
// mainCanvas.addEventListener('mouseup', mouseUpFunction);

//Add EventListner to DivNodes//
// currentNode.addEventListener('mousedown', function () {
//     mainCanvas.addEventListener('mousedown', mouseDownFunction);
//     currentNode.addEventListener('mousemove', mouseMoveFunction);
//     console.log("currentNode.mDown");
// });
// currentNode.addEventListener('mouseup', function () {
//     mainCanvas.removeEventListener('mousemove', mouseMoveFunction);
//     console.log("currentNode.mUp");
// });

var x = 0;

// mainCanvas.addEventListener('mousedown', mouseDownFunction);
// currentNode.addEventListener('mousedown', function () {
//     x = 1;
//     currentNode.addEventListener('mousemove', mouseMoveFunction);
//     console.log("currentNode.mDown");
// });
// currentNode.addEventListener('mouseup', function () {
//     x = 0;
//     mainCanvas.removeEventListener('mousemove', mouseMoveFunction);
//     console.log("x = " + x);
//     console.log("currentNode.mUp");
// });


//Just for reminder of certain codes. Nothing more.//
    // console.log("Top = " + currentNode.clientTop);
    // console.log("Left = " + currentNode.clientLeft);
    // console.log("Width = " + currentNode.clientWidth);
    // console.log("Height = " + currentNode.clientHeight);
    // console.log("mDownXPosition = " + event.clientX);
    // console.log("mUpYPosition = " + event.clientY);

    // console.log("mUpXPosition = " + mouseUpX);
    // console.log("mUpYPosition = " + mouseUpY);
    
    // var mouseUpX = event.clientX;
    // var mouseUpY = event.clientY;
    // currentNode.style.left = mouseUpX + 'px';
    // currentNode.style.top = mouseUpY + 'px';