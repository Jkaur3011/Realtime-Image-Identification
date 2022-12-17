function setup() {
  canvas = createCanvas(300, 300);
  canvas.position(650, 300);
  video = createCapture(VIDEO);
  video.hide();
  classifier = ml5.imageClassifier("MobileNet", modelLoaded);
}

function draw() {
  image(video, 0, 0, 300, 300);
  classifier.classify(video, gotResults);
}

function modelLoaded() {
  console.log("Model loaded!");
}

var previous_result = "";

function gotResults(error, results) {
  if (error) {
    console.log(error);
  } else {
    console.log(results);

    if (previous_result != results[0].label && results[0].confidence > 0.5) {

      previous_result = results[0].label;

      document.getElementById("result_object").innerHTML = results[0].label;
      document.getElementById("result_accuracy").innerHTML = results[0].confidence.toFixed(2);

      var synth = window.speechSynthesis;
      var data_Speak = "The object detected is "+results[0].label;
      var utterthis = new SpeechSynthesisUtterance(data_Speak);
      synth.speak(utterthis);
    }
  }
}