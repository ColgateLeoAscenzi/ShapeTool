

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
function shape(center, color, sideNum, sideLength){
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
                filledTriangle(newColor[i], genTriangle(center, sideLength, [(360/sideNum), (180-(360/sideNum))/2,(180-(360/sideNum))/2]));
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
function radians( degrees ) {
  return degrees * Math.PI / 180.0;
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
