var mainCanvas = document.getElementById('nodeCanvas');
var divNodes = document.getElementsByClassName('divNode');
// var currentNode = divNodes[0];
var currentNode;

var divX;
var divY;
var mainCanvasX = mainCanvas.getBoundingClientRect().left;
var mainCanvasY = mainCanvas.getBoundingClientRect().top;


for (i=0; i < divNodes.length; i++) {
    divNodes[i].addEventListener('mousedown', function () {
        currentNode = this;
        divX = currentNode.getBoundingClientRect().left;
        divY = currentNode.getBoundingClientRect().top
    })
    divNodes[i].addEventListener('mouseup', function () {
        currentNode = null;
    })
}

//Call the functions
mainCanvas.addEventListener('dragover',dragMoveFunction);
mainCanvas.addEventListener('mousedown',mouseDownFunction);
mainCanvas.addEventListener('dragend', dragEndFunction);


function dragMoveFunction (e) {
    e.preventDefault();
}

var dragStartMouseX;
var dragStartMouseY;

function mouseDownFunction(e) {
    dragStartMouseX = e.clientX;
    dragStartMouseY = e.clientY;
}

function dragEndFunction(e) {
    var dragEndMouseX = e.clientX;
    var dragEndMouseY = e.clientY;
    
    var divX = currentNode.getBoundingClientRect().left;
    var divY = currentNode.getBoundingClientRect().top;
    var mainCanvasX = mainCanvas.getBoundingClientRect().left;
    var mainCanvasY = mainCanvas.getBoundingClientRect().top;
    
    var newX = (Number(dragEndMouseX) - Number(dragStartMouseX)) + divX - mainCanvasX;
    var newY = (Number(dragEndMouseY) - Number(dragStartMouseY)) + divY - mainCanvasY;

    currentNode.style.left = newX + 'px';
    currentNode.style.top = newY + 'px';

    e.preventDefault();
}