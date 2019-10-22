//Draws background with mount fuji and sky
function background(){
    pushTransform();
    transform.scale(3,2);
        filledSquare(tan);
    popTransform();
    pushTransform();
        transform.scale(0.4);
        transform.translate(2,-0.5);
        mtFuji();
    popTransform();


}

//draws foreground and bubbles
function oceanspray(){

}
