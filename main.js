img = "";
status = "";
objects = [];
song = ""

function preload(){
song = loadSound("ringing_old_phone.mp3")
}



function setup(){
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();


    objectDetector = ml5.objectDetector('cocossd', modelLoaded); 
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modelLoaded(){
    console.log("Model has been loaded.");
    status = true;
}

function gotResult(error, results){
    if(error){
        console.error(error);
    }
    console.log(results);
    objects = results;
}

function draw(){
    image(video, 0, 0, 380, 380);

    if(status != ""){
    for(i = 0; i < objects.length; i++)
    {
        document.getElementById("status").innerHTML = "Status : Objects Detected";
        document.getElementById("babyfound").innerHTML = "Baby Found";

        fill("#0000FF");
        percent = floor(objects[i].confidence * 100);
        text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
        noFill();
        stroke("#0000FF");
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
    }
    }
    else{
        document.getElementById("babyfound").innerHTML = "Baby Not Found";
        song.play();
    }
}