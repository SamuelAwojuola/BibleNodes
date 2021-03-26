var nodeCanvas = document.getElementById('nodeCanvas');
var divNodes = document.getElementsByClassName('divNode');
var currentNode;
var nodeCanvasX = nodeCanvas.getBoundingClientRect().left;
var nodeCanvasY = nodeCanvas.getBoundingClientRect().top;
var contextX;
var contextY;
var divX;
var divY;

//Add eventListner to all divNodes
for (i=0; i < divNodes.length; i++) {
    divNodes[i].addEventListener('mousedown', nodeCanvasMouseDownFunction);

    //Assign IDs to all nodes
    divNodes[i].setAttribute('nodeId', i)
}

function nodeCanvasMouseDownFunction(e){
    nodeCanvas.addEventListener('mousedown', mouseDownFunction);
    nodeCanvas.addEventListener('mousedown', SVGmouseDownFunction);
    nodeCanvas.addEventListener('mousemove', mouseMoveFunction);
    nodeCanvas.addEventListener('mousemove', SVGmouseMoveFunction);
    nodeCanvas.addEventListener('mouseup', mouseUpFunction);
    currentNode = this;
}

function mouseDownFunction(e) {
    //distance from div left/top to mouse x/y on mouseDown on divNode
    //this is to ensure the mouse curse maintains the respective distance from the div edges
    contextX = e.clientX;
    contextY = e.clientY;
    
    divX = e.clientX - currentNode.getBoundingClientRect().left + nodeCanvasX;
    divY = e.clientY - currentNode.getBoundingClientRect().top + nodeCanvasY;
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
    nodeCanvas.removeEventListener('mousedown',mouseDownFunction);
    nodeCanvas.removeEventListener('mousemove',mouseMoveFunction);
}