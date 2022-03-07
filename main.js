status = "";
input = "";
function setup() {
    canvas = createCanvas(500, 450);
    canvas.center();
    video = createCapture(500, 450);
    video.hide();
}

function draw() {
    image(video, 0, 0, 500, 450);
}

function start() {
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    input = document.getElementById("name_of_objects").value;
    console.log("Input = " + input);

}

function modelLoaded() {
    console.log("Coco SSD Is Initialized");
    status = true;
}