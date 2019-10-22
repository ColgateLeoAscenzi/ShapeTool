//draws the foreground waves
function foreground(){
	pushTransform();
        filledTriangle(red, curveTriangle([0,0], 1, [60,60,60], [0.5,0.5]));
    popTransform();

}
