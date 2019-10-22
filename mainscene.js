//this code will handle the overall body of the project
function drawScene(){
    pushTransform();
        transform.scale(0.66666,1);
        drawGeom();
    popTransform();
}

function poolBalls(){
    pushTransform();
    transform.translate(-0.3,0.3);
    for(var j = 0; j < 7; j++){
        for(var i = 1; i < j; i++){
            pushTransform();
                transform.scale(0.25,0.3);
                transform.translate(j*0.5-(i*0.3*j*0.4), 1-(j*0.6));
                drawGeom();
            popTransform();
        }
    }
    popTransform();
}
