nodeDivCustomContextMenu = document.getElementById('nodeDivCustomContextMenu');
canvasCustomContextMenu = document.getElementById('canvasCustomContextMenu');

//Mousedown eventListner to Hide contextMenu on click away
nodeCanvas.addEventListener('mousedown', hideContextMenu);

function hideContextMenu() {
    nodeDivCustomContextMenu.style.display = 'none';
    canvasCustomContextMenu.style.display = 'none';
    svgPathCustomContextMenu.style.display = 'none';
}

//Add ContextMenu EventListner To All Div-Nodes
//(to show nodeDivCustomContextMenu on right-click and at the clicked coordinates)
var rClick_Y;
var rClick_X;
//svgPath toolTip
var selectedPath;
var svgPathToolTip = document.createElement('DIV');
svgPathToolTip.id = 'svgPathToolTip';
svgPathToolTip.style.borderRadius = '2px';
// svgPathToolTip.style.boxShadow = '1px 1px 50px 0px grey';
svgPathToolTip.style.position = 'absolute';
svgPathToolTip.style.zIndex = '19';
nodeCanvas.appendChild(svgPathToolTip);

//divNode toolTip
var divNodeToolTip = document.createElement('DIV');
divNodeToolTip.classList.add('divNodeToolTip');
divNodeToolTip.style.borderRadius = '2px';
// divNodeToolTip.style.boxShadow = '1px 1px 50px 0px grey';
divNodeToolTip.style.position = 'absolute';
divNodeToolTip.style.zIndex = '19';
nodeCanvas.appendChild(divNodeToolTip);

var elementToCommentOn;

nodeCanvas.addEventListener('mouseover', function (ev) {
    rClick_X = ev.clientX + nodeCanvasX + (window.pageXOffset || document.documentElement.scrollLeft);
    rClick_Y = ev.clientY + nodeCanvasY + (window.pageYOffset || document.documentElement.scrollTop);
    
    ev = ev || window.event;
    var target = ev.target || ev.srcElement;
    elementToCommentOn = target;
    
    //attach toolTip to target if it is an SVG Path element
    if (target.tagName == 'path') {
        selectedPath = target;
        
        svgPathToolTip.style.left = rClick_X + 10 + 'px';
        svgPathToolTip.style.top = rClick_Y + 10 + 'px';
        svgPathToolTip.style.display = 'grid';
        var pathOrigin = nodeCanvas.querySelector('[nodeId=' + selectedPath.getAttribute('connectedFrom') + ']').innerText;
        var pathEnd = nodeCanvas.querySelector('[nodeId=' + selectedPath.getAttribute('connectedTo') + ']').innerText;
        
        var pathLabelzForAttr = selectedPath.getAttribute('connectedFrom').replace('node', 'n') + selectedPath.getAttribute('connectedTo').replace('node', 'n');
        var pLabel = nodeCanvas.querySelector('[labelFor=' + pathLabelzForAttr + ']');
        if(pLabel == null){
            svgPathToolTip.innerHTML = '<em>From: <strong>' + pathOrigin + '</strong></em>' + '<em>To: <strong>' + pathEnd + '</strong></em>';
        } else {
            var pathLabelzText = pLabel.innerText;
            svgPathToolTip.innerHTML = '<em>' + pathLabelzText + '<hr>From: <strong>' + pathOrigin + '</strong></em>' + '<em>To: <strong>' + pathEnd + '</strong></em>';
        }
        svgPathToolTip.style.opacity = '1';
    }
    //hide toolTip if target is not an SVG Path element
    if ((target.tagName != 'path')&& (svgPathToolTip.style.display == 'grid')) {
        svgPathToolTip.style.opacity = '0';
        svgPathToolTip.style.display = 'none';
    }
})
nodeCanvas.addEventListener('mousemove', function (ev) {
    rClick_X = ev.clientX + nodeCanvasX + (window.pageXOffset || document.documentElement.scrollLeft);
    rClick_Y = ev.clientY + nodeCanvasY + (window.pageYOffset || document.documentElement.scrollTop);
    
    ev = ev || window.event;
    var target = ev.target || ev.srcElement;
    elementToCommentOn = target;
    
    if (target.tagName == 'path') {
        selectedPath = target;
        
        svgPathToolTip.style.left =rClick_X + 10 + 'px';
        svgPathToolTip.style.top = rClick_Y + 10 + 'px';
        svgPathToolTip.style.opacity = '1';
        svgPathToolTip.style.display = 'grid';
    }
})

nodeCanvas.addEventListener('contextmenu', function (ev) {
    rClick_X = ev.clientX + nodeCanvasX + (window.pageXOffset || document.documentElement.scrollLeft);
    rClick_Y = ev.clientY + nodeCanvasY + (window.pageYOffset || document.documentElement.scrollTop);

    ev.preventDefault();//prevent default context menu

    ev = ev || window.event;
    var target = ev.target || ev.srcElement;
    elementToCommentOn = target;

    //Show contextMenu on rightClick of any divNode
    if (target.classList.contains('divNode')) {
        //set position of nodeDivCustomContextMenu when any divNode is right-clicked
        nodeDivCustomContextMenu.style.left = rClick_X + 'px';
        nodeDivCustomContextMenu.style.top = rClick_Y + 'px';
        nodeDivCustomContextMenu.style.display = 'grid';
    }
    //Show contextMenu on rightClick of any connecting svg line/path
    else if (target.tagName == 'path') {
        selectedPath = target;
        //set position of nodeDivCustomContextMenu when any divNode is right-clicked
        svgPathCustomContextMenu.style.left =rClick_X + 'px';
        svgPathCustomContextMenu.style.top = rClick_Y + 'px';
        svgPathCustomContextMenu.style.display = 'grid';
    }
    //Showo contexMenu on rightClick of any part of the nodeCanvas as long as it is not a divNode nor a svgPath that has been rightClicked
    else if ((target.tagName != 'div')&&(target.tagName != 'path')) {
        //set position of nodeDivCustomContextMenu when any divNode is right-clicked
        canvasCustomContextMenu.style.left = rClick_X + 'px';
        canvasCustomContextMenu.style.top = rClick_Y + 'px';
        canvasCustomContextMenu.style.display = 'grid';
    }
    return false;//prevent default context menu
}, false);

//This eventListner targets the children of nodeCanvas without attaching eventListners to the children directly
nodeCanvas.addEventListener('mousedown', function (ev) {
    //Get the clicked element
    ev = ev || window.event;
    var target = ev.target || ev.srcElement;
    elementToCommentOn = target;

    //If there is an editable divNode and it is not what is clicked, make it uneditable
    if (editableDiv && (target != editableDiv)) {
        editableDiv.contentEditable = 'false';
        
    }
    //If there is an editable pathLabel and it is not what is clicked, make it uneditable
    if (editablePathLabel && (target != editablePathLabel)) {
        editablePathLabel.contentEditable = 'false';
    }
    if (target.parentNode.classList.contains('customContextMenu')) {
        target.parentNode.style.display = 'none';
    }
})