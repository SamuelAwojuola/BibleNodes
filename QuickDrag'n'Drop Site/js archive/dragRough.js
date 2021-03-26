// var storyLineTable = document.getElementById('storyLineTable');
var mainCanvas = document.getElementById('nodeCanvas');

var isDragging = false;
var elemBelow;
var parentElem;
var bodyElem = document.querySelector('body');
var tableElem = document.querySelector('table');
var divNode;

function makeTdDraggable() {
	divNode = '.divNode';
	document.addEventListener('mousedown', draggableNode)
}

function makeNOT() {
	divNode = '';
	document.removeEventListener('mousedown', draggableNode)
}

var draggableNode = function (event) {

	var dragElement = event.target.closest(divNode);

	if (!dragElement) return;

	event.preventDefault();

	dragElement.ondragstart = function () {
		return false;
	}

    var coords, shiftX, shiftY;

	startDrag(dragElement, event.clientX, event.clientY);

	function onMouseUp(event) {
		finishDrag();
	};

    function moveAt(clientX, clientY) {
		// new window-relative coordinates
		var newX = clientX - shiftX;
		var newY = clientY - shiftY;

		// check if the new coordinates are below the bottom window edge
		var newBottom = newY + dragElement.offsetHeight; // new bottom

		// below the window? let's scroll the page
		if (newBottom > mainCanvas.clientHeight) {
			// window-relative coordinate of document end
			var docBottom = mainCanvas.getBoundingClientRect().bottom;

			// scroll the document down by 10px has a problem
			// it can scroll beyond the end of the document
			// Math.min(how much left to the end, 10)
			var scrollY = Math.min(docBottom - newBottom, 10);

			// calculations are imprecise, there may be rounding errors that lead to scrolling up
			// that should be impossible, fix that here
			if (scrollY < 0) scrollY = 0;

			window.scrollBy(0, scrollY);

			// a swift mouse move make put the cursor beyond the document end
			// if that happens -
			// limit the new Y by the maximally possible (right at the bottom of the document)
			newY = Math.min(newY, mainCanvas.clientHeight - dragElement.offsetHeight);
		}

		// check if the new coordinates are above the top window edge (similar logic)
		if (newY < 0) {
			// scroll up
			var scrollY = Math.min(-newY, 10);
			if (scrollY < 0) scrollY = 0; // check precision errors

			window.scrollBy(0, -scrollY);
			// a swift mouse move can put the cursor beyond the document start
			newY = Math.max(newY, 0); // newY may not be below 0
		}

		/*
				// limit the new X within the window boundaries
				// there's no scroll here so it's simple
				if (newX < 0) newX = 0;
				if (newX > document.documentElement.clientWidth - dragElement.offsetWidth) {
					//      newX = document.documentElement.clientWidth - dragElement.offsetWidth;
				}
		*/
		elemBelow.style.backgroundColor = 'lightgreen';
		// reset the color after a short delay
		setTimeout(function() {
			elemBelow.target.style.color = "";
		}, 50);
		dragElement.style.left = newX + 'px';
		dragElement.style.top = newY + 'px';
	}
}