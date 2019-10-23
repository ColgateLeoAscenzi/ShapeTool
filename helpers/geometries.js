var defCenter = [0,0];
var defSideLen = 1;

function drawTriDemo(){
    pushTransform();
        transform.translate(-0.5,-0.4);
        filledTriangle(concatColor([colors[0],colors[1],colors[2]]), genTriangle(defCenter, defSideLen, [angles[0], angles[1], angles[2]]));
    popTransform();
}

function drawGeomDemo(){

    angleColors = [];
    for(var i = 0; i < sideNumber; i++){
        angleColors.push(concatColor([colors[0],colors[1],colors[2]]));
    }
    pushTransform();
        shape(defCenter,[-0.3,0.4], angleColors, sideNumber, defSideLen);
    popTransform();

}

function drawBallDemo(){

    angleColors = [];
    for(var i = 0; i < sideNumber; i++){
        angleColors.push(concatColor([colors[0],colors[1],colors[2]]));
    }
    pushTransform();
        transform.translate(lightposition[0], lightposition[1]);
        shape(defCenter,defCenter, [colors[0]], 30, 0.1);
    popTransform();
    //calculate newcenter with
    //lightposition and defCenter
    var newCenter = shinePos(lightposition, defCenter);
    console.log("NewCenter: "+newCenter);

    pushTransform();
        shape(defCenter,defCenter, angleColors, sideNumber, defSideLen);
    popTransform();

    pushTransform();
    transform.translate(newCenter[0], newCenter[1]);
        shape(defCenter,defCenter, [[0,0,1,1]], 30, 0.1);
    popTransform();

}
