function leaderLinesCoordUpdate(e) {
    console.log('hello there')
    nodeCanvas.addEventListener('mousemove', AnimEvent.add(function() {
        for(i=0; i<leaderLines.length; i++){
            //updates svg lines coordinte on change of position of element to which it is attached
            leaderLines[i].position();
        }
    }), false);
}

function getStartElement(){
    console.log(this.start);
}


//Leader-Line
var line1 = new LeaderLine(divNodes[0],divNodes[2], {dropShadow: true});
var line2 = new LeaderLine(divNodes[0],divNodes[1] ,{dropShadow: true
    /*
    size: 4,
    startPlugSize: 1.5,
    startPlugOutlineSize: 2.5,
    endPlugSize: 3,
    endPlugOutlineSize: 1
    */
} );
// var leaderLines = document.getElementsByClassName('leader-line');
var leaderLines = [line1, line2];

function hideSVGline(x) {x.hide(); }

function addEvListnerForAnimatingLineConnected2divNode(){
    for(i=0; i<leaderLines.length; i++){
        leaderLines[i].start.addEventListener('click', function() {
            //Hide all leader lines that the clicked divNode as their start
            for(j=0; j<leaderLines.length; j++){
                if(leaderLines[j].start == this){
                if(leaderLines[j].show){
                    hideSVGline(leaderLines[j])
                } else if(leaderLines[j].hide){
                    showSVGline(leaderLines[j])
                }
            }
            }
        })
    }
}
addEvListnerForAnimatingLineConnected2divNode();