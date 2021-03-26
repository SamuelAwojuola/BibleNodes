//This code requires the "connectTwoElementsWithCurvedLine.js" file--it is what creates the SVG lines/curves
//The code here really just determines the start and end points of the svg curve to be created

//FUNCTION TO DRAW THE LINES AFTER THE nodeId ATTRIBUTES HAVE BEEN ASSIGNED
//Run the funciton to draw the initial SVG lines after all the divNodes have been assigned nodeIds
// if(nodeIdsAllAssigned == 1){
//     initialSVGlines()
// }

function drawSVGConnectingLine(originNode, endNode){
    var startElement = originNode;
    var endElement;
    //Get the endElement from the connect2 attribute of the start node
    var connectFrom = originNode.getAttribute('nodeid');
    var connect2 = originNode.getAttribute('connectTo');
    if(endNode){endElement = endNode}
    else{endElement = nodeCanvas.querySelector(`[nodeid~="` + connect2 + `"]`);}
        
    var svgClasses = [];
    var startElementClass = originNode.getAttribute('nodeid');
    var endElementClass = connect2;
    svgClasses = [startElementClass, endElementClass];

    //Draw the svg line
    drawConnector(startElement, endElement, svgClasses, null, connect2, connectFrom);
}
for (i=0; i < divNodes.length; i++) {
    drawSVGConnectingLine(divNodes[i])
}

//EVENTLISNERS FOR UPDATING THE SVG LINES WHENEVER A DIVNODE IS DRAGGED
// nodeCanvas.addEventListener('mousedown', SVGmouseDownFunction);
// nodeCanvas.addEventListener('mousemove', SVGmouseMoveFunction);s
var connectedSVGlines;
var SVGlineIsConnectedTo;
var SVGlineIsConnectedFrom;
var nodeIDdivNotOriginatingFromCurrentNode = [];
function getConnectedSVGlines(){
    connectedSVGlines = nodeCanvas.querySelectorAll('.svg-connectors.' + currentNode.getAttribute('nodeId'));
}
function removeConnectedSVGlines(){
    for(a=0; a<connectedSVGlines.length; a++){
        SVGlineIsConnectedTo = connectedSVGlines[a].getAttribute('connected2');
        SVGlineIsConnectedTo = connectedSVGlines[a].getAttribute('connectedFrom');
        connectedSVGlines[a].remove();
    }
}
function SVGmouseDownFunction() {
    
    //find all svgLines with class equal to the nodeId attribute of current node
    //All svglines connected to or from the current divnode will have a class equal to its nodeId. So target them
    //Connect divs with svg line
    getConnectedSVGlines();
    nodeIDdivNotOriginatingFromCurrentNode = [];
    
    //check for lines that do not originate from the currentNode but are connected to it and will be revomed
    for(a=0; a<connectedSVGlines.length; a++){
        var divNodesConnnectedFrom = connectedSVGlines[a].getAttribute('connectedFrom');
        var divNodesConnnectedTo = connectedSVGlines[a].getAttribute('connectedTo');
        if(divNodesConnnectedFrom != currentNode.getAttribute('nodeid')){
            if(nodeIDdivNotOriginatingFromCurrentNode.indexOf(divNodesConnnectedFrom) == -1){
                nodeIDdivNotOriginatingFromCurrentNode.push(divNodesConnnectedFrom);
            }
        }

    }

        /*
        if(nodeCanvas.getElementsByClassName('svg-connectors').length == 0){
            if(endElement.getBoundingClientRect().left > startElement.getBoundingClientRect().left) {
                drawConnector(startElement, endElement);
            } else {
                drawConnector(endElement, startElement);
            }
        }
        */
}

//Remove Previous SVG Line
function SVGmouseMoveFunction() {
        removeConnectedSVGlines();        

        drawSVGConnectingLine(currentNode);
        //Draw lines connected to currentDivNode but not originating from it
        for(b=0; b < nodeIDdivNotOriginatingFromCurrentNode.length; b++){
            //get divNode whose nodeId is equal to the nodeIDdivNotOriginatingFromCurrentNode
            var disconnectedNode = nodeCanvas.querySelector('[nodeId=' + nodeIDdivNotOriginatingFromCurrentNode[b] + ']');
            drawSVGConnectingLine(disconnectedNode, currentNode);
        }

        getConnectedSVGlines();

}