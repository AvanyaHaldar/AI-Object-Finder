status = "";
input = "";
objects=[];

function setup() {
    canvas = createCanvas(500, 450);
    canvas.center();
    video = createCapture(500, 450);
    video.hide();
}

function draw() {
    image(video, 0, 0, 500, 450);
    if (status!="") {
        objectDetector.detect(getResult);
        console.log("Length="+objects.length);
        for (i = 0; i < objects.length; i++) {
            document.getElementById("no_of_objects").innerHTML = "No. Of Objects = " + objects.length;
            document.getElementById("status").innerHTML = "Status : Objects Detected";
            percent = Math.floor(objects[i].confidence * 100);
            fill("red");
            text(objects[i].label + " " + percent + "%", objects[i].x+15, objects[i].y+15);
            noFill();
            stroke("red");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            if (input==objects[i].label) {
                video.stop();  
                document.getElementById("status").innerHTML = "Status : Objects Mentioned Is Found";
                var synth = window.speechSynthesis;
                var utterThis = new SpeechSynthesisUtterance( input+"Found");
                synth.speak();
            }

            else{
                document.getElementById("status").innerHTML = "Status : Objects Mentioned Is Not Found";
            }
        }   

    }

}
function start() {
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    objectDetector.detect(video, getResult);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    input = document.getElementById("name_of_objects").value;
    console.log("Input = " + input);
}

function getResult(error, result) {
    if (error) {
        console.log(error);
    }
    else {
        console.log(result);
        objects = result;
    }
}

function modelLoaded() {
    console.log("Coco SSD Is Initialized");
    status = true;
}