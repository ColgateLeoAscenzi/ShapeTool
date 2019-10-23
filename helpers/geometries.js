var defCenter = [0,0];
var defSideLen = 1;

function drawTriDemo(){
    pushTransform();
        transform.translate(-0.5,-0.4);
        filledTriangle(concatColor([colors[0],colors[1],colors[2]]), genTriangle(defCenter, defSideLen, [angles[0], angles[1], angles[2]]));
    popTransform();
}

function drawGeomDemo(){

    colors = [];
    for(var i = 0; i < sideNumber; i++){
        colors.push(concatColor([colors[0],colors[1],colors[2]]));
    }
    pushTransform();
        shape(defCenter, testColors, sideNumber, defSideLen);
    popTransform();

}
