//connecting nodes
var firstNode = null;
var secondNode;
var makeClickedNodeSecondNode = 0;
var deletedNodeIdsArray = [];

//Function to make mouseDown nodeDiv the endNode
function endNodeAssigner(elm2makeEndNode) {
    elm2makeEndNode.addEventListener('mousedown', function (e) {
        if (makeClickedNodeSecondNode == 1) {
            secondNode = this;
            //stop it from linking to itself
            if (firstNode != secondNode) {
                setConnect2Attribute(firstNode, secondNode);
                drawSVGConnectingLine(firstNode, secondNode);
            }
            secondNode = null;
            firstNode = null;
    
            makeClickedNodeSecondNode = 0;
        }
    });
}

//The ConnectTo and the ConnectFrom attributes of a nodeDiv show what divs it is connected to and its relationship to it
function setConnect2Attribute(first, second) {
    if (first != second) {
        var connect2Array = [];
        if (first.hasAttribute('connectTo')) {
            var abc = (first.getAttribute('connectTo')).split(' ');
            connect2Array = connect2Array.concat(abc);
        }
        var secondNodeId = second.getAttribute('nodeId');
        if (connect2Array.indexOf(secondNodeId) == -1) {
            connect2Array.push(secondNodeId);
        }
        first.setAttribute('connectTo', connect2Array.join(" "))
    }
}

//This is the function the 'ConnectTo' button on the rightClick menu triggers
function nodeToConnectCurrentNodeTo() {
    // startNendNodesArrayOfDeletedSVGlines = [];
    firstNode = currentNode; //the right-click event is also a mousedown event, therefore, it makes the right-clicked nodeDiv the currentNode
    makeClickedNodeSecondNode = 1; //This condition determines if the node clicked after this would be made the endNode

    hideContextMenu()
}

//This is the function the 'Clone Node'  button on the rightClick menu triggers
function createNewNode(e) {
    var newDivNode = document.createElement('DIV');
    //Assign new nodeId class from cloned divNode
    var newNodeID;
    newDivNode.classList.add('divNode');
    if(deletedNodeIdsArray.length == 0){
        newNodeID = divNodes.length;
    } else {
        newNodeID = deletedNodeIdsArray[0] - 1;
        deletedNodeIdsArray.shift();
    }
    assignNodeID(newDivNode, newNodeID);
    //Remove border indicating node was selected
    newDivNode.style.border = '';
    //Create the nodeDiv at the mouse's coordinate
    newDivNode.style.top = rClick_Y + 'px';
    newDivNode.style.left = rClick_X + 'px';
    newDivNode.setAttribute('tabindex', 1);
    //Make the nodeId the textContent of the new nodeDiv
    newDivNode.textContent = 'node' + (newNodeID + 1);
    //Assing eventListners to nodeDiv
    newDivNode.addEventListener('mousedown', nodeCanvasMouseDownFunction);
    //Append new nodeDiv
    nodeCanvas.appendChild(newDivNode);
    endNodeAssigner(newDivNode);

    hideContextMenu()
}

//Make divNode editable
var editableDiv = null;
var editablePathLabel = null;
nodeCanvas.addEventListener('dblclick', function (ev) {
    ev.preventDefault();
    //Get the clicked element
    ev = ev || window.event;
    var target = ev.target || ev.srcElement;

    if(target.classList.contains('divNode')){
        makeNodeDivEditable();
    }
    if(target.classList.contains('pathLabel')){
        editablePathLabel = target;
        makePathLabelEditable();
    }
    if(target.tagName == 'svg'){
        createNewNode();
    }
    //prevent doubleClick
    return false;
}, false);

function makeNodeDivEditable() {
    editableDiv = currentNode;
    currentNode.contentEditable = 'true';

    hideContextMenu()
}
function makePathLabelEditable() {
    editablePathLabel.contentEditable = 'true';

    hideContextMenu()
}

function deleteNodeDiv() {
    //Delete all svg paths connected to the nodeDiv to be deleted 
    var pathClass = currentNode.getAttribute('nodeId');
    var deletedNodeId = pathClass;
    var pathsToRemove = nodeCanvas.querySelectorAll('path.' + pathClass);
    for (p = 0; p < pathsToRemove.length; p++) {
        //check for the node at the other end (either connectedTo or connectedFrom)
        var linkFrom = pathsToRemove[p].getAttribute('connectedFrom');
        var linkTo = pathsToRemove[p].getAttribute('connectedTo');
        if (linkTo == pathClass) {
            var nodeOnOtherEnd = nodeCanvas.querySelector('.divNode.' + linkFrom);
            var toArray = [];
            toArray = toArray.concat((nodeOnOtherEnd.getAttribute('connectTo')).split(' '));
            if(toArray.length > 1){
                var pathClassIndex = toArray.indexOf(pathClass);
            toArray.splice(pathClassIndex, 1);
            var newLinkToValue = toArray.join(' ');
            nodeOnOtherEnd.setAttribute('connectTo', newLinkToValue)} else {
                nodeOnOtherEnd.removeAttribute('connectTo')
            }
        }
        //remove path
        pathsToRemove[p].remove();
    }

    //Delete the nodeDiv
    currentNode.remove();

    //Save the nodeId of the deleted divNode to be used when creating a new divNode
    // deletedNodeIdsArray.push(deletedNodeId);
    deletedNodeIdsArray.push(Number(deletedNodeId.replace('node', '')));//remove 'node' from the string so that only the number par to the string is left and convert the number sting into an actual number to be sorted
    deletedNodeIdsArray = [...new Float64Array(deletedNodeIdsArray).sort()];
    console.log(deletedNodeIdsArray)

    hideContextMenu()
}

function deletePath(){
    //get nodeId of startNode
    var startNodeId = selectedPath.getAttribute('connectedFrom');
    var pathConnectedTo = selectedPath.getAttribute('connectedTo');
    //find divNode with the nodeId equal to the connectedFrom of the selected path
    var startNode = nodeCanvas.querySelector('[nodeId=' + startNodeId + ']');
    var startNodeConnectTo = startNode.getAttribute('connectTo');
    
    // if (startNodeConnectTo === pathConnectedTo) {
        //     startNode.removeAttribute('connectTo');
        // }
        // else {
            var connect2Array = [];
            var abc = startNodeConnectTo.split(' ');
            connect2Array = connect2Array.concat(abc);            
            connect2Array.splice(connect2Array.indexOf(pathConnectedTo), 1);
        startNode.setAttribute('connectTo', connect2Array.join(" "));
    // }
    //Remove paths label if it has one
    if(labelToRemove = nodeCanvas.querySelector('[labelFor=' + selectedPath.id + ']')){
        labelToRemove.remove();
    }
    //Remove the selectd path
    selectedPath.remove();
    
    hideContextMenu();
}

function addLabelToPath() {
    //if there is no node attached to the path already
    if(!nodeCanvas.querySelector('[labelFor=' + selectedPath.id + ']')){
        // get Center of svg Path
        var bbox = selectedPath.getBBox();
        var pathXmid = Math.floor(bbox.x + bbox.width/2.0);
        var pathYmid = Math.floor(bbox.y + bbox.height/2.0);
        
        //create pathLabel
        var svgLabel = document.createElement('DIV');svgLabel.classList.add('pathLabel');
        nodeCanvas.appendChild(svgLabel);
        //Position the pathLabel
        svgLabel.style.position = 'absolute';
        svgLabel.style.left = pathXmid + 'px';
        svgLabel.style.top = pathYmid + 'px';
        svgLabel.setAttribute('labelFor', selectedPath.id)
        svgLabel.textContent = 'edit label';
        svgLabel.contentEditable = 'true';
        editablePathLabel = svgLabel;
    }
    
    hideContextMenu();
}

function realignPathLabel() {
    for(l=0; l < labelsForAttr.length; l++){
        //find svg path with the id
        // get Center of svg Path
        var redrawnPath = nodeCanvas.querySelector("#" + labelsForAttr[l]);
        var bbox = redrawnPath.getBBox();
        var pathXmid = Math.floor(bbox.x + bbox.width/2.0);
        var pathYmid = Math.floor(bbox.y + bbox.height/2.0);
     
        //find label with the for attribute
        var tempSvglabel = nodeCanvas.querySelector('[labelfor=' + labelsForAttr[l] + ']');
        
        if(tempSvglabel){
            tempSvglabel.style.left = pathXmid + 'px';
            tempSvglabel.style.top = pathYmid + 'px';
        }
    }
}

// NOTES' FUNCTION
var notesCount = 0;
function addNote() {
    //first check if element already has a note attached to it
    if(elementToCommentOn.getAttribute('note') == null){elementToCommentOn.setAttribute('note', ++notesCount);
    
    var noteDiv = document.createElement('DIV');
    //The note Div will have the same 'note' attribute value as the element it is a comment to
    noteDiv.classList.add('notes');
    noteDiv.setAttribute('note', notesCount);
    
    noteDiv.setAttribute('tabindex', 1);
    noteDiv.innerHTML = '<hr>' + 'note ' + notesCount;
    noteDiv.contentEditable = 'true';
    //Assing eventListners to nodeDiv
    // noteDiv.addEventListener('mousedown', nodeCanvasMouseDownFunction);
    //Append new nodeDiv
    connectionDetails.appendChild(noteDiv);}
    
    hideContextMenu();
}
var toggleCheck = 0;
function toggleConnectionDetails(){
    if (toggleCheck == '0'){
        connectionDetails.style.right = '-' + connectionDetails.offsetWidth + 'px';
        toggleCheck = 1;
    }
    else {
        connectionDetails.style.right = '';
        toggleCheck = 0;
    }
}