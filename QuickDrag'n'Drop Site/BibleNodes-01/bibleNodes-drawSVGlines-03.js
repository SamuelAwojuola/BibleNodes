//This code requires the "connectTwoElementsWithCurvedLine.js" file--it is what creates the SVG lines/curves
//The code here really just determines the start and end points of the svg curve to be created
var connectedSVGlines;
var SVGlineIsConnectedTo;
var SVGlineIsConnectedFrom;
var nodeIDdivNotOriginatingFromCurrentNode = [];
var startNendNodesArrayOfDeletedSVGlines = [];
//FUNCTION TO DRAW THE LINES AFTER THE nodeId ATTRIBUTES HAVE BEEN ASSIGNED
//Run the funciton to draw the initial SVG lines after all the divNodes have been assigned nodeIds
// if(nodeIdsAllAssigned == 1){
//     initialSVGlines()
// }

function drawSVGConnectingLine(originNode, endNode){
    var startElement;
    var endElement;
    if(startNendNodesArrayOfDeletedSVGlines.length < 1){
        startElement = originNode;
        endElement; //Get the endElement from the connect2 attribute of the start node
        var connectFrom = originNode.getAttribute('nodeid');
        var connect2 = originNode.getAttribute('connectTo');
        if(connect2){
            if(endNode){endElement = endNode}//if endNode is declared
            else{endElement = nodeCanvas.querySelector(`[nodeid~="` + connect2 + `"]`);}
                
            var svgClasses = [];
            var startElementClass = originNode.getAttribute('nodeid');
            var endElementClass = endElement.getAttribute('nodeid');
            // svgClasses = endElementClass.split(' ');
            svgClasses.push(startElementClass);
            svgClasses.push(endElementClass);

            //Draw the svg line
            console.log(startElement, endElement, svgClasses, null, endElementClass, connectFrom);
            drawConnector(startElement, endElement, svgClasses, null, endElementClass, connectFrom);
        }
    } else{
        for(c = 0; c < startNendNodesArrayOfDeletedSVGlines.length; c++){
            var cc = c + 1;
            if(cc%2 == 1){
                startElement = nodeCanvas.querySelector(`[nodeid~="` + startNendNodesArrayOfDeletedSVGlines[c] + `"]`);
                console.log(startElement)
            } else {
                endElement = nodeCanvas.querySelector(`[nodeid~="` + startNendNodesArrayOfDeletedSVGlines[c] + `"]`);
                console.log(endElement)
                //Draw the svg line
                drawConnector(startElement, endElement, svgClasses, null, endElementClass, connectFrom);
            }
        }
    }
}
for (i=0; i < divNodes.length; i++) {
    if(divNodes[i].getAttribute('connectTo')){
        drawSVGConnectingLine(divNodes[i])
    }
}

//EVENTLISNERS FOR UPDATING THE SVG LINES WHENEVER A DIVNODE IS DRAGGED
// nodeCanvas.addEventListener('mousedown', SVGmouseDownFunction);
// nodeCanvas.addEventListener('mousemove', SVGmouseMoveFunction);s

function getConnectedSVGlines(){
    svgConnectors = nodeCanvas.getElementsByClassName('svg-connectors');
    connectedSVGlines = nodeCanvas.querySelectorAll('.svg-connectors.' + currentNode.getAttribute('nodeId'));
    //svg paths connected to a node will have its nodeId as one of their classes
}
function removeConnectedSVGlines(){
    for(a=0; a<connectedSVGlines.length; a++){
        SVGlineIsConnectedFrom = connectedSVGlines[a].getAttribute('connectedFrom');
        console.log(SVGlineIsConnectedFrom)
        startNendNodesArrayOfDeletedSVGlines.push(SVGlineIsConnectedFrom);
        SVGlineIsConnectedTo = connectedSVGlines[a].getAttribute('connectedTo');
        startNendNodesArrayOfDeletedSVGlines.push(SVGlineIsConnectedTo);
        //deleted svglines will be rebuilt from startNendNodesArrayOfDeletedSVGlines
        if(a == svgConnectors.length - 1){
            console.log('a is MAX')
            for(aa=0; aa<svgConnectors.length; aa++){
                console.log(connectedSVGlines[aa]);
                console.log(connectedSVGlines);
                svgConnectors[aa].remove();
                console.log(connectedSVGlines);
                    }
        }
    }
}
function SVGmouseDownFunction() {
    
    //find all svgLines with class equal to the nodeId attribute of current node
    //All svglines connected to or from the current divnode will have a class equal to its nodeId. So target them
    //Connect divs with svg line
    getConnectedSVGlines();
    nodeIDdivNotOriginatingFromCurrentNode = [];
    
    //check for lines that do not originate from the currentNode but are connected to it and will be revomed
/*     for(a=0; a<connectedSVGlines.length; a++){
        var divNodesConnnectedFrom = connectedSVGlines[a].getAttribute('connectedFrom');
        var divNodesConnnectedTo = connectedSVGlines[a].getAttribute('connectedTo');
        if(divNodesConnnectedFrom != currentNode.getAttribute('nodeid')){
            console.log('yessssssss')
            if(nodeIDdivNotOriginatingFromCurrentNode.indexOf(divNodesConnnectedFrom) == -1){
                nodeIDdivNotOriginatingFromCurrentNode.push(divNodesConnnectedFrom);
            }
        }

    } */

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
    startNendNodesArrayOfDeletedSVGlines = [];
        removeConnectedSVGlines();        

        drawSVGConnectingLine(currentNode);

        getConnectedSVGlines();
}