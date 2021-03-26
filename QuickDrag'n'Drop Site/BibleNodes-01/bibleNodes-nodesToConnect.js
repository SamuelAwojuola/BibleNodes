//connecting nodes
var firstNode = null;
var secondNode;
var makeClickedNodeSecondNode = 0;

//The ConnectTo and the ConnectFrom attributes of a nodeDiv show what divs it is connected to and its relationship to it
function setConnect2Attribute(first, second){
    var connect2Array = [];
    if(first.hasAttribute('connectTo')){
        var abc = (first.getAttribute('connectTo')).split(' ');
        connect2Array = connect2Array.concat(abc);
    }
    var secondNodeId = second.getAttribute('nodeId');
    if(connect2Array.indexOf(secondNodeId) == -1){
        connect2Array.push(secondNodeId);
    }
    first.setAttribute('connectTo', connect2Array.join(" "))
}

function secondNode(e){
    if(makeClickedNodeSecondNode == 1){
        secondNode = this;
        setConnect2Attribute(firstNode, secondNode);
        drawSVGConnectingLine(firstNode, secondNode);
        secondNode = null;
        firstdNode = null;
        
        makeClickedNodeSecondNode = 0;
    }
}

//This is the function the 'ConnectTo' button on the rightClick menu triggers
function nodeToConnectCurrentNodeTo(){
    // startNendNodesArrayOfDeletedSVGlines = [];
    firstNode = currentNode;//the right-click event is also a mousedown event, therefore, it makes the right-clicked nodeDiv the currentNode
    makeClickedNodeSecondNode = 1;//This condition determines if the node clicked after this would be made the endNode
}

//Function to make mouseDown nodeDiv the endNode
function endNodeAssigner(elm2makeEndNode){
    elm2makeEndNode.addEventListener('mousedown', secondNode);
}

for (i=0; i < divNodes.length; i++) {
    endNodeAssigner(divNodes[i]);
}

//This is the function the 'Clone Node'  button on the rightClick menu triggers
function cloneNodeDiv(e){
    var nodeDivClone = currentNode.cloneNode(true);
    nodeDivClone.style.border = '';
    nodeCanvas.appendChild(nodeDivClone);
}