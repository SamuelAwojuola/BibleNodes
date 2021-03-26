//Mousedown eventListner to Hide contextMenu on click away
nodeCanvas.addEventListener('mousedown', hideContextMenu);
function hideContextMenu(e) {
    customContextMenu.style.display = 'none';
}

//Add ContextMenu EventListner To All Div-Nodes
//(to show customContextMenu on right-click and at the clicked coordinates)
for (i=0; i < divNodes.length; i++) {
    //Custom Context Menu
    divNodes[i].addEventListener('contextmenu', function(ev) {
        //prevent default context menu
        ev.preventDefault();
        
        //set position of customContextMenu when any divNode is right-clicked    
        customContextMenu.style.left = contextX + 'px';
        customContextMenu.style.top = contextY + 'px';
        customContextMenu.style.display = 'block';
        
        //prevent default context menu
        return false;
    }, false);
}

//Prevent ContextMenu from Showing on NodeCanvas
nodeCanvas.addEventListener('contextmenu', function(ev) {
    ev.preventDefault();
    return false;
}, false);