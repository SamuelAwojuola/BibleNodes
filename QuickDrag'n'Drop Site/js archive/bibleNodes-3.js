var mainCanvas = document.getElementById('nodeCanvas');
var divNodes = document.getElementsByClassName('divNode');
var currentNode;
var mainCanvasX = mainCanvas.getBoundingClientRect().left;
var mainCanvasY = mainCanvas.getBoundingClientRect().top;

var divX;
var divY;

//Add eventListner to all divNodes
for (i=0; i < divNodes.length; i++) {
    divNodes[i].addEventListener('mousedown', mainCanvasMouseDownFunction)
}

function mainCanvasMouseDownFunction(e){
    mainCanvas.addEventListener('mousedown', mouseDownFunction);
    mainCanvas.addEventListener('mousemove', mouseMoveFunction);
    mainCanvas.addEventListener('mouseup', mouseUpFunction);
    currentNode = this;
}

function mouseDownFunction(e) {
    //distance from div left/top to mouse x/y on mouseDown on divNode
    //this is to ensure the mouse curse maintains the respective distance from the div edges
    divX = e.clientX - currentNode.getBoundingClientRect().left + mainCanvasX;
    divY = e.clientY - currentNode.getBoundingClientRect().top + mainCanvasY;
}

function mouseMoveFunction(e) {
    // take vertical and horizontal page scroll into consideration 
    var horizontalScroll = (window.pageXOffset || document.documentElement.scrollLeft);
    var verticalScroll = (window.pageYOffset || document.documentElement.scrollTop);

    var newX = e.clientX - divX + horizontalScroll + 'px';
    var newY = e.clientY - divY + verticalScroll + 'px';

    currentNode.style.left = newX;
    currentNode.style.top = newY;
}

function mouseUpFunction(e) {
    mainCanvas.removeEventListener('mousedown',mouseDownFunction);
    mainCanvas.removeEventListener('mousemove',mouseMoveFunction);
}