var labyrinth;
var counter = 0;
var zoom = 4;
var height_, width_;

function preload() {
  labyrinth = loadImage("test_4.jpg");
  colorMode(RGB, 255);
}

function setup() {
  height_ = labyrinth.height / zoom;
  width_ = labyrinth.width / zoom;
  createCanvas(width_, height_);
  background(0);
  frameRate(1);
  image(labyrinth, 0, 0, labyrinth.width / zoom, labyrinth.height / zoom);
}

function draw() {
  // console.log(this.canvas);
  noLoop();
  findeGabelungen();

}

function findeGabelungen() {
  console.log(get(25, 24));
  // for (var i = 0; i < pixel; i += 4) {
  //   for (var j = 0; j < pixel; j++) {
  //     if (get(i, j)[0] == 255) {
  //       counter++;
  //     }
  //
  //     // }
  //   }
  // }
  console.log(sqrt(pixels.length / 4));
}