//YOU MUST HAVE AN SVG ELEMENT IN THE HTML BODY TO WHICH THE SVG PATHS WILL BE APPENDED.
/* #svg {
			position: absolute;
			width: 100%;
			height: 100%;
}
<svg id="svg" xmlns="http://www.w3.org/2000/svg"></svg>*/

//SVG PATH
function nodesconnector(pathXYcord, svgClass, svgColor, connectedTo, connect4rom) {

	var path1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
	document.getElementById("svg").appendChild(path1);

//	path1.setAttributeNS(null, pathXYcord);
	path1.setAttributeNS(null, "d", pathXYcord);
	if(svgColor == null){
		path1.setAttributeNS(null, "stroke", "grey");
	} else {
		path1.setAttributeNS(null, "stroke", svgColor);
	}
	path1.setAttributeNS(null, "stroke-width", 7);
	path1.setAttributeNS(null, "opacity", 1);
	path1.setAttributeNS(null, "fill", "none");
	path1.classList.add("svg-connectors")
	if(svgClass != null){
		if (Array.isArray(svgClass)){
			for(I=0; I<svgClass.length;I++) {
				path1.classList.add(svgClass[I]);
			}
		} else if (typeof svgClass === 'string'){
			path1.classList.add(svgClass)
		}
	}
	path1.setAttributeNS(null, "connectedTo", connectedTo);
	path1.setAttributeNS(null, "connectedFrom", connect4rom);
}

// CREATE SVG CONNECTOR PATHS
//  var startElement = document.querySelector("#a");
//  var endElement = document.querySelector("#b");
// var connector = document.querySelector("#connector");

function drawConnector(A, B, svgClass, svgColor, connectedTo, connect4rom) {
	var posnA = {
		x: A.offsetLeft + A.offsetWidth,
		y: A.offsetTop + A.offsetHeight / 2
	};
	var posnB = {
		x: B.offsetLeft,
		y: B.offsetTop + B.offsetHeight / 2
	};
//	connector.setAttribute("d", dStr);
	nodesconnector(("M" +
		(posnA.x) + "," + (posnA.y) + " " +
		"C" +
		(posnA.x + 100) + "," + (posnA.y) + " " +
		(posnB.x - 100) + "," + (posnB.y) + " " +
		(posnB.x) + "," + (posnB.y)), svgClass, svgColor, connectedTo, connect4rom);
}

// drawConnector(startElement, endElement);