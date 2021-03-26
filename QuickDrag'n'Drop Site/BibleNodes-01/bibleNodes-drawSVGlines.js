//This code requires the "connectTwoElementsWithCurvedLine.js" file--it is what creates the SVG lines/curves
//The code here really just determines the start and end points of the svg curve to be created

//FUNCTION TO DRAW THE LINES AFTER THE nodeId ATTRIBUTES HAVE BEEN ASSIGNED
//Run the funciton to draw the initial SVG lines after all the divNodes have been assigned nodeIds
// if(nodeIdsAllAssigned == 1){
//     initialSVGlines()
// }

// function initialSVGlines(){
    for (i=0; i < divNodes.length; i++) {
        var startElement = divNodes[i];
        var endElement;
        //Get the endElement from the connect2 attribute of the start node
        var connect2 = divNodes[i].getAttribute('connectTo');
        console.log(connect2);
        endElement = nodeCanvas.querySelector(`[nodeid~="` + connect2 + `"]`);
        
        console.log("startElement: " + startElement);
        console.log("endElement: " + endElement);

        //Draw the svg line
        drawConnector(startElement, endElement)
    }
// }


//EVENTLISNERS FOR UPDATING THE SVG LINES ON WHENEVER A DIVNODE IS DRAGGED
nodeCanvas.addEventListener('mousedown', SVGmouseDownFunction);
nodeCanvas.addEventListener('mousemove', SVGmouseMoveFunction);

function SVGmouseDownFunction(e) {
    if(mouseDownForDraggingEnabled == 1){
            
        //Connect divs with svg line
        var startElement = previousNode;
        var endElement = currentNode;
        console.log(endElement)

        if(nodeCanvas.getElementsByClassName('svg-connectors').length == 0){
            if(endElement.getBoundingClientRect().left > startElement.getBoundingClientRect().left) {
                drawConnector(startElement, endElement);
            } else {
                drawConnector(endElement, startElement);
            }
        };
    }
}

//Remove Previous SVG Line
function SVGmouseMoveFunction(e) {
    if(mouseMoveForDraggingEnabled == 1){
        if(nodeCanvas.getElementsByClassName('svg-connectors').length != 0){
            nodeCanvas.getElementsByClassName('svg-connectors')[0].remove()
        };
    
        //Connect divs with svg line
        // if(previousNode != currentNode){
            var startElement = previousNode;
            var endElement = currentNode;
            if(endElement.getBoundingClientRect().left > startElement.getBoundingClientRect().left) {
            drawConnector(startElement, endElement);
            } else {
                drawConnector(endElement, startElement);
            }
        // }
    }
}