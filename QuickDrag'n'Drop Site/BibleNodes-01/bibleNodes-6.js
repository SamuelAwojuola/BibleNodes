//SVG related eventListeners are not directly included here. Instead, variables are addled to allow or disallow the SVG related eventListners
//Click twice before dragging is possible

var nodeCanvas = document.getElementById('nodeCanvas');
var divNode = document.getElementsByClassName('divNode');
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
var mouseDownForDraggingEnabled = 0;
var mouseMoveForDraggingEnabled = 0;
var nodeIdsAllAssigned = 0;

//Add eventListner to all divNodes
for (i=0; i < divNodes.length; i++) {
    divNodes[i].addEventListener('mousedown', nodeCanvasMouseDownFunction);
    
    //Assign IDs to all nodes
    if(!divNodes[i].getAttribute('nodeId')){
        divNodes[i].setAttribute('nodeId', ('node' + (i + 1)));
        divNodes[i].classList.add('node' + (i + 1))
    }
    //Run the funciton to draw the initial SVG lines after all the divNodes have been assigned nodeIds
    if(i == (divNodes.length - 1)){
        nodeIdsAllAssigned = 1;
    }
}

//Add eventListner to nodeCanvas for deselecting selected node
nodeCanvas.addEventListener('mousedown', deselectOnCanvasClick);
function deselectOnCanvasClick(e) {
    if((currentNode) && (aNodeHasBeenClicked == 0)){
        youCanDrag = 0;
        currentNode.style.border = "";
        youCanDrag = 0;
    }
}

function nodeCanvasMouseDownFunction(e) {
    aNodeHasBeenClicked = 1;
    if(youCanDrag == 0){
        youCanDrag = 1;
        currentNode = this;
        currentNode.style.border = "1px solid red";
        //findSVGpathMouseDownFunction eventListner is connected to this
    }
    else if((currentNode == this) && (youCanDrag == 1)){
        //For moving the nodes (moves on second mousedown)
        nodeCanvas.addEventListener('mousedown', mouseDownFunction);
        nodeCanvas.addEventListener('mousemove', mouseMoveFunction);
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
    //Connection to SVGmouseDownFunction
    mouseDownForDraggingEnabled = 1;

    //distance from div left/top to mouse x/y on mouseDown on divNode
    //this is to ensure the mouse curse maintains the respective distance from the div edges
    contextX = e.clientX;
    contextY = e.clientY;
    
    divX = e.clientX - currentNode.getBoundingClientRect().left + nodeCanvasX;
    divY = e.clientY - currentNode.getBoundingClientRect().top + nodeCanvasY;
}

function mouseMoveFunction(e) {  
    //Connection to SVGmouseMoveFunction
    mouseMoveForDraggingEnabled = 0;

    // take vertical and horizontal page scroll into consideration 
    var horizontalScroll = (window.pageXOffset || document.documentElement.scrollLeft);
    var verticalScroll = (window.pageYOffset || document.documentElement.scrollTop);

    var newX = e.clientX - divX + horizontalScroll + 'px';
    var newY = e.clientY - divY + verticalScroll + 'px';

    currentNode.style.left = newX;
    currentNode.style.top = newY;
}

function mouseUpFunction(e) {
    //Connection to SVGmouseDownFunction & SVGmouseMoveFunction
    mouseDownForDraggingEnabled = 0;
    mouseMoveForDraggingEnabled = 0;

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