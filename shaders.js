//---- Shader source strings, for a shader program that assumes all primitive are textured
 // Source code for a simple vertex shader, to be passed to createProgram().
var vertexShaderSource =
     "precision highp float;\n" +
     "attribute vec2 vertexCoords;\n" +
     "attribute vec2 textureCoords;\n" +
     "varying vec2 texcoords;\n" +
     "attribute vec4 vertexColor;\n"+
     "varying vec4 color;\n"+
     "uniform mat3 coordinateTransform;\n" +
     "void main() {\n" +
     "   color = vertexColor;\n"+
     "   vec3 transformedCoords = coordinateTransform * vec3(vertexCoords, 1.0);\n" +
     "   gl_Position = vec4(transformedCoords.xy, 0.0, 1.0);\n" +
     "   texcoords = textureCoords;\n" +
     "}\n";
 // Source code for a simple fragment shader, to be passed to createProgram().
var fragmentShaderSource =
     "precision mediump float;\n" +
     "varying vec2 texcoords;\n" +
     "varying vec4 color;\n" +
     "uniform sampler2D texture;\n" +
     "void main() {\n" +
     "    gl_FragColor = color;\n" +
     "}\n";


var gl;

//sides
var sideNumber = 3;

//Shaders
var vertexAttributeLocation;
var transformUniformLocation;
var colorAttribLocation;

var vertexAttributeBuffer;
var colorAttribBuffer;

//Buffers
var triangleCoordsVBO;
var triangleColorVBO;

var darkBlue = [28/255,61/255,95/255, 1];
var lightBlue = [35/255,61/105,148/255, 1];
var tan = [250/255, 236/255, 195/255, 1];
var white = [249/255, 244/255, 222/255, 1];
var whiteShadow = [189/255, 212/255, 202/255, 1];
//set new shapes to red to test position
var red = [1,0,0,1];

var scenes = ["drawTriDemo()", "drawGeomDemo()","drawBallDemo()"];
var scene = 0;


var colors = [[1,0,0,1],[0,1,0,1],[0,0,1,1]];

var angles = [60, 60, 60];

var lightposition = [-0.7, 1.8];

var laser = false;
var lamp = false;

//Transforms
var transform = new AffineTransform2D();
var transformStack = [];

function pushTransform() {
    transformStack.push( new AffineTransform2D(transform) );
}


function popTransform() {
    if (transformStack.length > 0) {
        transform = transformStack.pop();
    }
}

function draw(){
    gl.clearColor(0,0,0,1);
    gl.clear(gl.COLOR_BUFFER_BIT);


    drawScene();
}


function createProgram(gl, vertexShaderSource, fragmentShaderSource) {
   var vsh = gl.createShader( gl.VERTEX_SHADER );
   gl.shaderSource(vsh,vertexShaderSource);
   gl.compileShader(vsh);
   if ( ! gl.getShaderParameter(vsh, gl.COMPILE_STATUS) ) {
      throw "Error in vertex shader:  " + gl.getShaderInfoLog(vsh);
   }
   var fsh = gl.createShader( gl.FRAGMENT_SHADER );
   gl.shaderSource(fsh, fragmentShaderSource);
   gl.compileShader(fsh);
   if ( ! gl.getShaderParameter(fsh, gl.COMPILE_STATUS) ) {
      throw "Error in fragment shader:  " + gl.getShaderInfoLog(fsh);
   }
   var prog = gl.createProgram();
   gl.attachShader(prog,vsh);
   gl.attachShader(prog, fsh);
   gl.linkProgram(prog);
   if ( ! gl.getProgramParameter( prog, gl.LINK_STATUS) ) {
      throw "Link error in program:  " + gl.getProgramInfoLog(prog);
   }
   return prog;
}

function createWebGLContext(canvas) {
   var c;
   if ( ! canvas )
      throw "Canvas required";
   if (typeof canvas == "string")
      c = document.getElementById(canvas);
   else
      c = canvas;
   if ( ! c.getContext )
      throw "No legal canvas provided";
   var gl = c.getContext("webgl");
   if ( ! gl ) {
      gl = c.getContext("experimental-webgl");
   }
   if ( ! gl )
      throw "Can't create WebGLContext";
   return gl;
}


function initGL() {
    try{
        gl = createWebGLContext("webglcanvas");
        var prog = createProgram( gl, vertexShaderSource, fragmentShaderSource );
        gl.useProgram(prog);

        gl.blendFuncSeparate( gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA,
                                  gl.ZERO, gl.ONE );
        gl.enable(gl.BLEND)

        vertexAttributeLocation = gl.getAttribLocation(prog, "vertexCoords");
        transformUniformLocation = gl.getUniformLocation(prog, "coordinateTransform");
        colorAttribLocation = gl.getAttribLocation(prog, "vertexColor");

        vertexAttributeBuffer = gl.createBuffer();
        colorAttribBuffer = gl.createBuffer();

    }
    catch (e){
        console.log("Could not initialize WebGL! Error:" + e);
        return;
    }

    //initialize
    document.getElementById("geom-color-control").style.display = "none";
    document.getElementById("ball-color-control").style.display = "none";

    //overall controll
    document.getElementById("selector").onchange = changeDrawing;


    //triangles
    document.getElementById("tri-angles").onchange = doChangeAngles;

    document.getElementById("tri-color").onchange = doChangeColorTri;
    document.getElementById("tri-color1").onchange = doChangeColorTri;
    document.getElementById("tri-color2").onchange = doChangeColorTri;
    //geometry
    document.getElementById("sideRange").onchange = doChangeSides;
    document.getElementById("textRange").onchange = doChangeSides1;

    document.getElementById("geom-color").onchange = doChangeColorGeom;
    document.getElementById("geom-color1").onchange = doChangeColorGeom;
    document.getElementById("geom-color2").onchange = doChangeColorGeom;


    //ball
    document.getElementById("lightSlider").onchange = doChangeLight;
    document.getElementById("sideRangeBall").onchange = doChangeSidesBall;
    document.getElementById("textRangeBall").onchange = doChangeSides1Ball;

    document.getElementById("ball-color").onchange = doChangeColorBall;
    document.getElementById("ball-color1").onchange = doChangeColorBall;

    document.getElementById("lampCheck").checked = false
    document.getElementById("laserCheck").checked = false
    document.getElementById("lampCheck").onchange = doChangeLamp;
    document.getElementById("laserCheck").onchange = doChangeLaser;



    draw();    // draw the image


}
/*-----------side support-------------*/
function doChangeLamp(){
    if(document.getElementById("lampCheck").checked){
        lamp = true;
    }
    else{
        lamp = false;
    }
    doChangeColorBall();
}

function doChangeLaser(){
    if(document.getElementById("laserCheck").checked){
        laser = true;
    }
    else{
        laser = false;
    }
    doChangeColorBall();
}

function doChangeLight(){
    lightposition = [parseInt(document.getElementById("lightSlider").value)/100, lightposition[1]];
    doChangeColorBall();
}

function changeDrawing(){
    resetParams();
    scene = parseInt(document.getElementById("selector").selectedIndex);
    if(parseInt(document.getElementById("selector").selectedIndex)== 0){
        document.getElementById("tri-color-control").style.display = "block";
        document.getElementById("geom-color-control").style.display = "none";
        document.getElementById("ball-color-control").style.display = "none";
        doChangeColorTri();
    }
    if(parseInt(document.getElementById("selector").selectedIndex)== 1){
        sideNumber = 3;
        document.getElementById("tri-color-control").style.display = "none";
        document.getElementById("geom-color-control").style.display = "block";
        document.getElementById("ball-color-control").style.display = "none";
        doChangeColorGeom();
    }
    if(parseInt(document.getElementById("selector").selectedIndex)== 2){
        sideNumber = 20;
        document.getElementById("tri-color-control").style.display = "none";
        document.getElementById("geom-color-control").style.display = "none";
        document.getElementById("ball-color-control").style.display = "block";
        doChangeColorBall();
    }
}

function resetParams(){
    document.getElementById("sideRange").value = 3;
    document.getElementById("textRange").value = 3;

    document.getElementById("sideRangeBall").value = 20;
    document.getElementById("textRangeBall").value = 20;
}


function doChangeAngles(){
    angles[0] = parseInt(document.getElementById("aAngle").value);
    angles[1] = parseInt(document.getElementById("bAngle").value);
    angles[2] = parseInt(document.getElementById("cAngle").value);
    if((angles[0] + angles[1] + angles[2])== 180){
        doChangeColorTri();
    }
}
//sides for geom

function doChangeSides(){
    sideNumber = parseInt(document.getElementById("sideRange").value);
    document.getElementById("textRange").value = sideNumber;
    doChangeColorGeom();
}

function doChangeSides1(){
    sideNumber = parseInt(document.getElementById("textRange").value);
    document.getElementById("sideRange").value = sideNumber;
    doChangeColorGeom();
}

//sides for ball
function doChangeSidesBall(){
    sideNumber = parseInt(document.getElementById("sideRangeBall").value);
    document.getElementById("textRangeBall").value = sideNumber;
    doChangeColorBall();
}

function doChangeSides1Ball(){
    sideNumber = document.getElementById("textRangeBall").value;
    document.getElementById("sideRangeBall").value = sideNumber;
    doChangeColorBall();
}



function doChangeColorTri(){
    for(var i = 0; i < 3; i++){
        colors[i][0] = document.getElementById("geom-color"+(i+1)+"R").value/255;
        colors[i][1] = document.getElementById("geom-color"+(i+1)+"G").value/255;
        colors[i][2] = document.getElementById("geom-color"+(i+1)+"B").value/255;
        colors[i][3] = 1.0;

    }
    draw();
}


function doChangeColorGeom(){
    for(var i = 0; i < 3; i++){
        colors[i][0] = document.getElementById("geom-color"+(i+1)+"R1").value/255;
        colors[i][1] = document.getElementById("geom-color"+(i+1)+"G1").value/255;
        colors[i][2] = document.getElementById("geom-color"+(i+1)+"B1").value/255;
        colors[i][3] = 1.0;

    }
    draw();
}

function doChangeColorBall(){
    for(var i = 0; i < 2; i++){
        colors[i][0] = document.getElementById("ball-color"+(i+1)+"R").value/255;
        colors[i][1] = document.getElementById("ball-color"+(i+1)+"G").value/255;
        colors[i][2] = document.getElementById("ball-color"+(i+1)+"B").value/255;
        colors[i][3] = document.getElementById("ball-color"+2+"A").value/255;

    }
    colors[2][0] = document.getElementById("ball-color"+2+"R").value/255;
    colors[2][1] = document.getElementById("ball-color"+2+"G").value/255;
    colors[2][2] = document.getElementById("ball-color"+2+"B").value/255;
    colors[2][3] =  document.getElementById("ball-color"+2+"A").value/255;
    draw();
}
