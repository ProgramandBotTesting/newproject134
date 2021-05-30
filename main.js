objects = [];

function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();

    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();

    object_detector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById('status').innerHTML = 'Status: Detecting babies';
}

function draw() {
    image(video, 0, 0, 380, 380);

    if (status != "") {
        r = random(255);
        g = random(255);
        b = random(255);
        object_detector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++) {
            document.getElementById('status').innerHTML = "Status: Object detected";
            fill(r, g, b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke(r, g, b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if (objects[i].label === "person") {
                document.getElementById('number_of_objects').innerHTML = "Status: Baby is found";
            } else if (!objects.length) {
                document.getElementById('number_of_objects').innerHTML = "Status: Baby is not detected";
            } else {
                document.getElementById('number_of_objects').innerHTML = "Status: Baby is not detected";
            }
        }

    }
}

function modelLoaded() {
    console.log('Loaded cocossd');
    status = true;
}

function gotResult(err, results) {
    objects = results;
    if (err) return console.log(err);
    if (!err) return console.log(results);
}