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

    var newCenter = shinePos(lightposition, defCenter);


    pushTransform();
        transform.scale(0.5);
        //background
        drawBackground();

        //draw undershadow floor and floor
        pushTransform();
            transform.translate(0.01,-0.05);
            drawFloor([0.05,0.05,0.05,1]);
        popTransform();
        drawFloor([0.1,0.1,0.1,1]);

        //make new colours
        angleColors = [];
        for(var i = 0; i < sideNumber; i++){
            angleColors.push(concatColor([colors[0],colors[1],colors[2]]));
        }

        if(lamp == true){
            drawLamp(newCenter);
        }


        drawShadow(newCenter);


        pushTransform();
            shape(defCenter, defCenter, angleColors, [[1,0,0,1]], defSideLen);
        popTransform();


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

function drawLamp(newC){
    //the light
    pushTransform();
        transform.translate(lightposition[0], lightposition[1]);
        shape(defCenter,defCenter, [[colors[0][0],colors[0][1],colors[0][2],1]], 30, 0.1);
    popTransform();
}

function drawLaser(newC){
    pushTransform();
    transform.translate(newC[0], newC[1]);
        shape(defCenter, defCenter,  [[colors[0][0],colors[0][1],colors[0][2],1]], 30, 0.08);
    popTransform();
}

function drawShadow(newC){
    var shadowColor = calculateShadowColor(false);
    pushTransform();
    transform.translate(-(newC[0]), -(newC[1]+0.285));
    //transform.scale(10,1);
    transform.xshear(-newC[0]*4);
    transform.scale(1,0.2);
        shape(defCenter, defCenter,  shadowColor, sideNumber, defSideLen);
    popTransform();

}

function drawBackground(){
    pushTransform();
    //transform.scale(10,1);
    //transform.xshear(5);
    transform.scale(10,10);
        shape(defCenter, defCenter,  [[0.95,0.95,0.95,1]], 4, defSideLen);
    popTransform();

}

function drawFloor(floorColor){
    pushTransform();
    transform.translate(0,-1);
    transform.xshear(1.5);
    transform.scale(3,1);
        shape(defCenter, defCenter,  [floorColor], 4, defSideLen);
    popTransform();

}
