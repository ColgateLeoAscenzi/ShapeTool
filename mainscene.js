//this code will handle the overall body of the project
function drawScene(){
    pushTransform();
    //adjust for canvas aspect ratio
        transform.scale(0.66666,1);
        eval(scenes[scene]);
    popTransform();
}
