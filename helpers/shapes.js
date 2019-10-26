// newCoords[0] = oldCoords[0];
// newCoords[1] = oldCoords[1];
// newCoords[2] = oldCoords[2];
// newCoords[3] = oldCoords[3];
// newCoords[4] = oldCoords[4];
// newCoords[5] = oldCoords[5];

// -------------- FILLED SHAPE FUNCTIONS -----------------------//
function filledTriangle(color, vertices){
    var newColor = [];
    if(color.length == 4){
        newColor = uniformColorGen(color, 3);
    }
    else{
        newColor = color;
    }

    triangleCoordsVBO = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, triangleCoordsVBO);
    var triangleCoords = new Float32Array(vertices);
    gl.bufferData(gl.ARRAY_BUFFER, triangleCoords, gl.STATIC_DRAW);
    triangleColorVBO = gl.createBuffer()

    gl.uniformMatrix3fv(transformUniformLocation, false, transform.getMat3());
    //position
    gl.bindBuffer(gl.ARRAY_BUFFER, triangleCoordsVBO);
    gl.vertexAttribPointer(vertexAttributeLocation, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vertexAttributeLocation);

    gl.bindBuffer(gl.ARRAY_BUFFER, triangleColorVBO);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(newColor), gl.STATIC_DRAW);
    gl.vertexAttribPointer(colorAttribLocation, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(colorAttribLocation);

    gl.drawArrays(gl.TRIANGLES, 0, 3);
}

// ------------------- geometry shape helper -----------------------//
// function shape(center, color, sideNum, sideLength){
//     var sumOfIntAng = (sideNum-2)*180;
//     var newColor = [];
//     //generates new uniform colors if not specified
//     if(color.length == 1){
//         for(var i = 0; i < sideNum; i++){
//             newColor.push(uniformColorGen(color[0], sideNum));
//         }
//     }
//     else{
//         newColor = color;
//     }
//     //aligns it so the bottom is flat
//     pushTransform();
//         transform.rotate(radians((-sumOfIntAng)/(2*sideNum)));
//         transform.scale(3/sideNum);
//         for(var i = 0; i < sideNum; i++){
//             //makes triangles and rotate
//             pushTransform();
//                 transform.rotate(radians(360/sideNum)*i);
//                 filledTriangle(newColor[i], genTriangle(center, sideLength, [(360/sideNum), (180-(360/sideNum))/2,(180-(360/sideNum))/2]));
//             popTransform();
//
//         }
//     popTransform();
//
// }
function shape(center, newC, color, sideNum, sideLength){
    var sumOfIntAng = (sideNum-2)*180;
    var newColor = [];
    //generates new uniform colors if not specified
    if(color.length == 1){
        for(var i = 0; i < sideNum; i++){
            newColor.push(uniformColorGen(color[0], sideNum));
        }
    }
    else{
        newColor = color;
    }
    //aligns it so the bottom is flat
    pushTransform();
        transform.rotate(radians((-sumOfIntAng)/(2*sideNum)));
        //transform.scale(3/sideNum);
        for(var i = 0; i < sideNum; i++){
            //makes triangles and rotate
            pushTransform();
                transform.rotate(radians(360/sideNum)*i);
                var tempTriCoords = genTriangle(center, sideLength, [(360/sideNum), (180-(360/sideNum))/2,(180-(360/sideNum))/2]);
                tempTriCoords = fixCenter(tempTriCoords, newC, radians(360/sideNum)*i, sideNum);
                filledTriangle(newColor[i], tempTriCoords);
            popTransform();

        }
    popTransform();

}

function genTriangle(center, side, angles){
    triCoord = [center[0], center[1]];

    //var a = (side* Math.sin(radians(angles[0])))/Math.sin(radians(angles[2]));
    triCoord.push(center[0]+side);
    triCoord.push(center[1]);

    var b = (side * Math.sin(radians(angles[1])))/Math.sin(radians(angles[2]));
    var dy = b*Math.sin(radians(angles[0]));
    var dx = b*Math.cos(radians(angles[0]));

    triCoord.push(center[0]+dx);
    triCoord.push(center[1]+dy);



    return triCoord;
}

function fixCenter(oldCoords, newC, angle, sideNum){
    newCoords = []
    var unRotated = unrotate([newC[0], newC[1]], angle, sideNum);
    newCoords[0] = unRotated[0];
    newCoords[1] = unRotated[1];
    newCoords[2] = oldCoords[2];
    newCoords[3] = oldCoords[3];
    newCoords[4] = oldCoords[4];
    newCoords[5] = oldCoords[5];


    return newCoords;
}

//-------Actual shapes to draw-----------//
function triangle(center, color, side){
        shape(center, color, 3, side);
}
function square(center, color, side){
    shape(center, color, 4, side);
}
function pentagon(center, color, side){
    shape(center, color, 5, side);
}
function hexagon(center, color, side){
    shape(center, color, 6, side);
}

//*------------------ Helpers ---------------------------//
function unrotate(oldPoint, rotationAngle, sideNum){
    var sumOfIntAng = (sideNum-2)*180;
    var nP = [oldPoint[0], oldPoint[1]];
    var nPP = cartToPolar(nP);
    var nC = polarToCart([nPP[0], nPP[1]-degrees(rotationAngle)-((-sumOfIntAng)/(2*sideNum))]);
    return nC;
}

function uniformColorGen(color, sides){
    var colorArr = [];
    for(var i = 0; i < sides; i++){
        colorArr.push(color[0]);
        colorArr.push(color[1]);
        colorArr.push(color[2]);
        colorArr.push(color[3]);
    }
    return colorArr;
}

function concatColor(colors){
    var outColor = [];
    for(var i = 0; i < colors.length; i++){
        var tempCol = colors[i];
        for(var j = 0; j < tempCol.length; j++){
            outColor.push(tempCol[j]);
        }
    }
    return outColor;
}

function radians( degrees ) {
  return degrees * Math.PI / 180.0;
}

function degrees( radians ) {
  return radians * 180 / Math.PI;
}


function polarToCart(pPoint) {
    //point = [r, degrees]
    var r = pPoint[0];
    var degreess = pPoint[1]
    return [r*Math.cos(radians(degreess)), r*Math.sin(radians(degreess))];
}

function cartToPolar(cPoint){
    //point= = [x, y]
    var nx = cPoint[0];
    var ny = cPoint[1];

    return [Math.sqrt(nx*nx + ny*ny), Math.atan2(ny, nx)*(180.0/Math.PI)];
}



function shinePos(lightPos, circleCenter){
    var lx = lightPos[0];
    var ly = lightPos[1];
    var cx = circleCenter[0];
    var cy = circleCenter[1];

    //subtract circle center from lightsource to get lightsource adjusted to 0
    //convert to polar and shorten radius by theoretical Z axis, here 1/7th of
    //original R. Convert back to cartesian centered around 0, then add circleCenter
    //back to get the official light center and return it
    var shineP = cartToPolar([lx-cx,ly-cy]);

    var shineC = polarToCart([shineP[0]/3, shineP[1]]);

    shineC[0]+=cx;
    shineC[1]+=cy;

    return shineC;

}

function calculateShadowColor(defaultVal){
    if(defaultVal == true){
        return [[0.6,0.6,0.6,1]];
    }
    else{
        //subtract each time the alpha value of the ball
        var sub = colors[1][3];
        var lightColor = colors[0];
        var ballColor = colors[1];
        var avg = []
        //merges the colors
        for(var i = 0; i < lightColor.length; i++){
            avg.push((lightColor[i]+ballColor[i])/2);
        }
        //makes sure they can't go above 255 or below 0
        var newCol = []
        for(var i = 0; i < 3; i++){
            newCol.push(Math.min(Math.max(0, avg[i]-sub), 255));
        }
        newCol.push(1);

        return [newCol];
    }
}
