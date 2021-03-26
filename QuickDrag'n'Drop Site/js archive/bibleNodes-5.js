//Click twice before dragging is possible1qw

var nodeCanvas = document.getElementById('nodeCanvas');
var divNodes = document.getElementsByClassName('divNode');
var pointNode = document.getElementById('pointNode');
var currentNode;
var previousNode;
var nodeCanvasX = nodeCanvas.getBoundingClientRect().left;
var nodeCanvasY = nodeCanvas.getBoundingClientRect().top;
var contextX;
var contextY;
var divX;
var divY;
var youCanDrag = 0;
var aNodeHasBeenClicked = 0;

//Add eventListner to all divNodes
for (i=0; i < divNodes.length; i++) {
    divNodes[i].addEventListener('mousedown', nodeCanvasMouseDownFunction);
    
    //Assign IDs to all nodes
    divNodes[i].setAttribute('nodeId', i)
}

//Add eventListner to nodeCanvas for deselecting selected node
nodeCanvas.addEventListener('mousedown', deselectOnCanvasClick);
function deselectOnCanvasClick(e) {
    if(aNodeHasBeenClicked == 0){
        youCanDrag = 0;
        currentNode.style.border = "";
        youCanDrag = 0;
        console.log()
    }
}

function nodeCanvasMouseDownFunction(e) {
    aNodeHasBeenClicked = 1;
    if(youCanDrag == 0){
        youCanDrag = 1;
        currentNode = this;
        currentNode.style.border = "1px solid red";
        //For drawing visual connector line
        nodeCanvas.addEventListener('mousedown', findSVGpathMouseDownFunction);
    }
    else if((currentNode == this) && (youCanDrag == 1)){
        //For moving the nodes (moves on second mousedown)
        nodeCanvas.addEventListener('mousedown', mouseDownFunction);
        nodeCanvas.addEventListener('mousedown', SVGmouseDownFunction);
        nodeCanvas.addEventListener('mousemove', mouseMoveFunction);
        nodeCanvas.addEventListener('mousemove', SVGmouseMoveFunction);
        nodeCanvas.addEventListener('mouseup', mouseUpFunction);
    }
    else if(currentNode != this){
        previousNode = currentNode;
        previousNode.style.border = "";
        // previousNode.style.boxShadow = "";//visually demonstrate that the previously selected node has been deselected
        youCanDrag = 1;
        currentNode = this;//reasign the currentNode varriable to the currently selected divNode
        currentNode.style.border = "2px solid red";
    }
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
    aNodeHasBeenClicked = 0;//used for deselecting node
    nodeCanvas.removeEventListener('mousedown',mouseDownFunction);
    nodeCanvas.removeEventListener('mousemove',mouseMoveFunction);
}

// function doSomething(e) {
// 	var code;
// 	if (!e) var e = window.event;
// 	if (e.keyCode) code = e.keyCode;
// 	else if (e.which) code = e.which;
// 	var character = String.fromCharCode(code);
// 	alert('Character was ' + character);
// }