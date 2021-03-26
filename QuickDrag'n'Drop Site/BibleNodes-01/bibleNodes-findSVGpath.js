//Asign same class to a divNode and svgLines connected to it for updating their coordinates when the div is moved
//On mouseDown on a divNode, makde the clicked divNode the startElement and create a pointNode

//For drawing visual connector line
nodeCanvas.addEventListener('mousedown', findSVGpathMouseDownFunction);

function findSVGpathMouseDownFunction(e) {
    if(aNodeHasBeenClicked == 1){
        //create new pointNode
        // pointNode.style.display = 'block';
        // pointNode.style.left = e.clientX - pointNode.offsetWidth / 2 - nodeCanvasX + (window.pageXOffset || document.documentElement.scrollLeft) + 'px';
        // pointNode.style.top = e.clientY - pointNode.offsetHeight / 2 - nodeCanvasY + (window.pageYOffset || document.documentElement.scrollTop) + 'px';
    
        nodeCanvas.addEventListener('mousemove', findSVGpathMouseMoveFunction);
        for (i=0; i < divNodes.length; i++) {
            divNodes[i].addEventListener('mouseup', identifyCurrentDiv);
        }
    }
}
function identifyCurrentDiv(){
    previousNode = currentNode;
    currentNode = this;
    startElement = previousNode;
    endElement= currentNode;

    var svgClass1 = 'node' + previousNode.getAttribute('nodeid');
    var svgClass2 = 'node' + currentNode.getAttribute('nodeid');
    var svgPathClasses = [svgClass1, svgClass2, 'svg-connectors'];

    //Main SVGLine
    if((previousNode != currentNode) && (nodeCanvas.getElementsByClassName('svg-connectors').length == 0)){
        if(endElement.getBoundingClientRect().left > startElement.getBoundingClientRect().left) {
            drawConnector(startElement, endElement, svgPathClasses);
        } else {
            drawConnector(endElement, startElement, svgPathClasses);
        }
    };

    //Temporary svgLine
    if(nodeCanvas.getElementsByClassName('tempSVGline')){
        nodeCanvas.getElementsByClassName('tempSVGline')[0].remove()
    };
    // pointNode.style.display = 'none';
}

function findSVGpathMouseMoveFunction(e) {
    //create new pointNode
    // pointNode.style.display = 'block';
    // pointNode.style.left = e.clientX - pointNode.offsetWidth / 2 - nodeCanvasX + (window.pageXOffset || document.documentElement.scrollLeft) + 'px';
    // pointNode.style.top = e.clientY - pointNode.offsetHeight / 2 - nodeCanvasY + (window.pageYOffset || document.documentElement.scrollTop) + 'px';
        
    //Connect divs with svg line
    // if(nodeCanvas.getElementsByClassName('tempSVGline').length == 0){
    //     drawConnector(currentNode, pointNode, 'tempSVGline', 'pink');
    // } else {
    //     nodeCanvas.getElementsByClassName('tempSVGline')[0].remove();
    //     drawConnector(currentNode, pointNode, 'tempSVGline', 'pink');
    // }
    nodeCanvas.addEventListener('mouseup', findSVGpathMouseUPFunction);
}

function findSVGpathMouseUPFunction(e) {

    nodeCanvas.removeEventListener('mousemove', findSVGpathMouseMoveFunction);
}