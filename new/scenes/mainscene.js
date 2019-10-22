//this code will handle the overall body of the project
function drawScene(){
    pushTransform();
        //adjust for aspect ratio
        transform.scale(0.66666666,1);

        eval(scenes[sceneToDraw]);
    popTransform();

}

function drawAll(){
    for(var i = 0; i < scenes.length-1; i++){
        eval(scenes[i]);
    }
}
