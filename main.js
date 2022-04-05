objects=[];
video="";
status="";

function preload(){
    video=createVideo('video.mp4');
}

function setup(){
    canvas=createCanvas(480,380);
    canvas.center();
    video.hide();
}

function start(){
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Status: Detecting Objects";
}

function modelLoaded(){
    console.log("Model Loaded!");
    status=true;
    video.loop();
    video.speed(1);
    video.volume(0);
}

function gotResult(error,results){
    if(error){
        console.error(error)
    }
    console.log(results);
    objects=results;
}

function draw(){
    image(video,0,0,480,380);
    if(status !=""){
        objectDetector.detect(video,gotResult);
        for(i=0;i<objects.length;1++){
            document.getElementById("status").innerHTML="Status: Objects Detected";
            document.getElementById("no_of_obs").innerHTML="Number of Objects detected is: "+objects.length;
            fill("orange");
            percent=floor(objects[i].confidence*100);
            text(objects[i].label+" "+percent+"%",objects[i].x,objects[i].y);
            noFill();
            stroke("orange");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
    }
}