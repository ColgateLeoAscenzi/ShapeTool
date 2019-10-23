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
        transform.translate(-0.5,0.8);
        shape(defCenter,defCenter, [colors[0]], 30, 0.1);
    popTransform();
    pushTransform();
        shape(defCenter,[-0.3, 0.4], angleColors, sideNumber, defSideLen);
    popTransform();

}
