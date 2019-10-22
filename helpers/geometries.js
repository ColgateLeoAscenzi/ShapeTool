var defcenter = [0,0];
var defSideLen = 1;

function drawGeom(){

    var testNum = sideNumber;
    var testColors = [];
    for(var i = 0; i < sideNumber; i++){
        testColors.push(concatColor([colors[0],colors[1],colors[2]]));
    }
    pushTransform();
        shape(defcenter, testColors, testNum, defSideLen);
    popTransform();

}
