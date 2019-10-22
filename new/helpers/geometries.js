//WAVE GEOMETRIES
//LOW LEVEL GEOMETRIES
//filledTriangle([0,0,1,1, 0,0,1,1, 0,0,1,0.5]);
//filledSquare([0,0,1,1, 0,0,1,1, 0,0,1,0.5, 1,0,0,1]);
//filledCircle(uniformColorGen([0,1,0,1]), 32);
//hexagon([[0,0,1,1], [0,1,1,1], [1,0,1,1], [1,1,0,1], [1,0,0,1], [0.5,0.2,1,1]])
//above code is acceptably abstract
var eqTri = genTriangle([0,0], 1, [60,60,60]);

function waveBody(){

    //center
    pushTransform();
        transform.scale(0.7);
        transform.translate(-1,-0.3);
        hexagon([darkBlue, concatColor([darkBlue, whiteShadow, lightBlue]), darkBlue, lightBlue, darkBlue, lightBlue])
    popTransform();

    //left leg
    pushTransform();
        transform.scale(0.7);
        transform.translate(-2.5,-1.165);
        filledTriangle(darkBlue, eqTri);
    popTransform();

    pushTransform();
        transform.scale(0.7);
        transform.translate(-0.5,-1.165);
        filledTriangle(darkBlue, eqTri);
    popTransform();

    pushTransform();
        transform.scale(0.4);
        transform.translate(0,0);
        pentagon([red]);
    popTransform();
}

function mtFuji(){
    pushTransform();
        filledTriangle(red, genTriangle([0,0], 1, [45,45,90]));
    popTransform();
}
