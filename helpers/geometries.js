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
        shape(defCenter, defCenter, angleColors, sideNumber, defSideLen);
    popTransform();

}

function drawBallDemo(){

    angleColors = [];
    for(var i = 0; i < sideNumber; i++){
        angleColors.push(concatColor([colors[0],colors[1],colors[2]]));
    }

    if(lamp == true){
        drawLamp();

    }
    var newCenter = shinePos(lightposition, defCenter);

    pushTransform();
        shape(defCenter, newCenter, angleColors, sideNumber, defSideLen);
    popTransform();

    if(laser == true){
        drawLaser(newCenter);
    }

}

function drawLamp(){
    //the light
    pushTransform();
        transform.translate(lightposition[0], lightposition[1]);
        shape(defCenter,defCenter, [colors[0]], 30, 0.1);
    popTransform();
}

function drawLaser(newC){
    pushTransform();
    transform.translate(newC[0], newC[1]);
        shape(defCenter, defCenter,  [colors[0]], 30, 0.1);
    popTransform();
}
