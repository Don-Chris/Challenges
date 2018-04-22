var feld = new Feld();
var rows = 25;
var cols = 25;
var grid = [];
var w = 1;
var felder = [];
var starter, current;
var verzweigungen = [];
var waende = [];

// beide Werte müssen ungerade sein
if (rows % 2 == 0) {
  rows++;
}
if (cols % 2 == 0) {
  cols++;
}

function setup() {
  noStroke();
  rectMode(CENTER);
  // frameRate(5);
  createCanvas(cols * w, rows * w);
  background(0);
  colorMode(RGB, 255);
  rows = height / w;
  cols = width / w;

  for (var i = 0; i < cols; i++) {
    // for (var j = 0; j < rows, j++){
    grid[i] = [];
    // }
  }
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      if (i % 2 == 1 && j % 2 == 1) {
        var temp = new Feld(i, j, w);
        grid[i][j] = temp;
        felder.push(temp);
      } else if (i % 2 == 0 && j % 2 == 0) {} else {
        var temp = new Wand(i, j, w);
        grid[i][j] = temp;
        waende.push(temp);
      }

    }
  }
  for (var i = 0; i < felder.length; i++) {
    felder[i].waendeErmitteln();
  }
  starter = grid[1][1];
  starter.start = true;
  grid[1][0].start = true;
  grid[1][0].weg = true;
  verzweigungen.push(starter);
  current = starter;
  grid[cols - 2][rows - 1].ende = true;
  grid[cols - 2][rows - 2].ende = true;


  grid[cols - 2][rows - 2].draw();
  grid[cols - 2][rows - 1].draw();
  starter.draw();
  grid[1][0].draw();


}

function draw() {
  // background(0);
  for (var i = 0; i < 50; i++) {
    if (verzweigungen.length >= 1) {
      current.pickNeighbor();
    }
  }
  // for (var i = 0; i < waende.length; i++) {
  //   waende[i].draw();
  // }
  // for (var i = 0; i < felder.length; i++) {
  //   felder[i].draw();
  // }
  // for (var i = 0; i < verzweigungen.length; i++) {
  //   verzweigungen[i].drawRed();
  // }
  if (verzweigungen.length == 0) {
    noLoop();
    console.log("Fertig");
    if (rows % 2 == 1) {
      rows--;
    }
    if (cols % 2 == 1) {
      cols--;
    }
    var name = "Labyrinth" + "_" + rows + "_" + cols + ".jpg";
    save(name);
  }
}



function backtrack() {
  current = verzweigungen[verzweigungen.length - 1];
  verzweigungen.splice(verzweigungen.length - 1, 1);
}



function randomBacktrack() {
  var tmp = floor(random(verzweigungen.length));
  current = verzweigungen[tmp];
  verzweigungen[tmp].draw();
  verzweigungen.splice(tmp, 1);
}