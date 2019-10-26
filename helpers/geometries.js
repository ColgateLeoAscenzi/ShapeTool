var defCenter = [0,0];
var defSideLen = 1;

function drawTriDemo(){
    pushTransform();
        transform.translate(-0.5,-0.4);
        filledTriangle(concatColor([colors[0],colors[1],colors[2]]), genTriangle(defCenter, defSideLen, [angles[0], angles[1], angles[2]]));
    popTransform();
}

function drawGeomDemo(){
    pushTransform();
        transform.scale(0.5);
        angleColors = [];
        for(var i = 0; i < sideNumber; i++){
            angleColors.push(concatColor([colors[0],colors[1],colors[2]]));
        }
        pushTransform();
            shape(defCenter, defCenter, angleColors, sideNumber, defSideLen);
        popTransform();
    popTransform();

}

function drawBallDemo(){
    pushTransform();
        transform.scale(0.5);
        angleColors = [];
        for(var i = 0; i < sideNumber; i++){
            angleColors.push(concatColor([colors[0],colors[1],colors[2]]));
        }

        if(lamp == true){
            drawLamp();

        }
        var newCenter = shinePos(lightposition, defCenter);

        drawShadow(newCenter);


        pushTransform();
            shape(defCenter, newCenter, angleColors, sideNumber, defSideLen);
        popTransform();

        // pushTransform();
        //     shape(defCenter1, newCenter, angleColors, sideNumber, defSideLen);
        // popTransform();

        if(laser == true){
            drawLaser(newCenter);
        }
    popTransform();

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

function drawShadow(newC){
    pushTransform();
    transform.translate(-(newC[0]), -(newC[1]+0.3));
    //transform.scale(10,1);
    transform.xshear(-newC[0]*3);
    transform.scale(1,0.2);
        shape(defCenter, defCenter,  [[0.6,0.6,0.6,1]], sideNumber, defSideLen);
    popTransform();

}
