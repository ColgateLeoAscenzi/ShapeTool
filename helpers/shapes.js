

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
function shape(center,nextCenter, color, sideNum, sideLength){
    console.log("DO I STILL HAVE THE SAME: "+nextCenter);
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
        transform.scale(3/sideNum);
        for(var i = 0; i < sideNum; i++){
            //makes triangles and rotate
            pushTransform();
                transform.rotate(radians(360/sideNum)*i);
                var tempTriCoords = genTriangle(center, sideLength, [(360/sideNum), (180-(360/sideNum))/2,(180-(360/sideNum))/2]);
                tempTriCoords = fixCenter(tempTriCoords, nextCenter, (360/sideNum)*i);
                filledTriangle(newColor[i], tempTriCoords);
            popTransform();

        }
    popTransform();

}

function genTriangle(center, side, angles){
    triCoord = [center[0], center[1]];

    var c = (side* Math.sin(radians(angles[2])))/Math.sin(radians(angles[0]));
    triCoord.push(center[0]+c);
    triCoord.push(center[1]);

    var b = (side * Math.sin(radians(angles[1])))/Math.sin(radians(angles[0]));
    var y = b*Math.sin(radians(angles[0]));
    var x = b*Math.cos(radians(angles[0]));

    triCoord.push(center[0]+x);
    triCoord.push(center[0]+y);
    return triCoord;
}

function fixCenter(oldCoords, nextCenter, angle){
    newCoords = []
    // newCoords[0] = oldCoords[0];
    // newCoords[1] = oldCoords[1];
    // newCoords[2] = oldCoords[2];
    // newCoords[3] = oldCoords[3];
    // newCoords[4] = oldCoords[4];
    // newCoords[5] = oldCoords[5];

    nextCenter = unRotate([oldCoords[0], oldCoords[1]], nextCenter, angle);
    console.log("Returned unrotated value: "+nextCenter)
    newCoords[0] = nextCenter[0];
    newCoords[1] = nextCenter[1];
    newCoords[2] = oldCoords[2];
    newCoords[3] = oldCoords[3];
    newCoords[4] = oldCoords[4];
    newCoords[5] = oldCoords[5];

    return newCoords;
}

function unRotate(oldC, newC, angle){
    console.log("Old new Center"+oldC);
    console.log("New new center"+newC);

    //new coordinate and remove offset from old center, normally 0
    var x1 = newC[0]-oldC[0];
    var y1 = newC[1]-oldC[1];
    console.log("X AND Y: "+x1+" "+y1);
    //convert to polar
    var p = cartToPolar(x1, y1);
    console.log("POLAR COORD: "+p);
    //rotate backwards by angle convert to cart
    var nC = polarToCart(p[0], p[1]-angle);

    //add the offset back
    return [nC[0]+ oldC[0], nC[1]+oldC[1]];

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

function polarToCart(pPoint) {
    //point = [r, degrees]
    var r = pPoint[0];
    var degrees = pPoint[1]
    return [r*Math.cos(radians(degrees)), r*Math.sin(radians(degrees))];
}

function cartToPolar(cPoint){
    //point= = [x, y]
    var x = parseInt(cPoint[0]);
    var y = parseInt(cPoint[1]);
    console.log("X AND Y THAT CART TO POLAR ARE GETTING: "+x+" "+y);
    if(x == "0"){
        return [Math.sqrt(x**2 + y**2), 0];
    }
    else{
        return [Math.sqrt(x**2 + y**2), Math.atan(y/x)*180/Math.PI];
    }
}

function shinePos(lightPos, circleCenter){
    var lx = parseInt(lightPos[0]);
    var ly = parseInt(lightPos[1]);
    var cx = parseInt(circleCenter[0]);
    var cy = parseInt(circleCenter[1]);

    //subtract circle center from lightsource to get lightsource adjusted to 0
    //convert to polar and shorten radius by theoretical Z axis, here 1/7th of
    //original R. Convert back to cartesian centered around 0, then add circleCenter
    //back to get the official light center and return it
    var shineP = cartToPolar([lx-cx,ly-cy]);
    if(lx >= 0){
        var shineC = polarToCart([shineP[0]/5, shineP[1]]);

    }
    else{
        var shineC = polarToCart([-shineP[0]/5, shineP[1]]);

    }

    shineC[0]+=cx;
    shineC[1]+=cy;

    return shineC;

}
