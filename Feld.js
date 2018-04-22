function Feld(i, j, w) {
  this.x = i * w + w / 2;
  this.y = j * w + w / 2;
  this.w = w;
  this.i = i;
  this.j = j;
  this.nachbarWaende = [];
  this.weg = false;
  this.start = false;
  this.ende = false;
  this.nachbarFelder = [];


  this.waendeErmitteln = function() {
    this.nachbarWaende.push(grid[this.i][this.j - 1]);
    this.nachbarWaende.push(grid[this.i + 1][this.j]);
    this.nachbarWaende.push(grid[this.i][this.j + 1]);
    this.nachbarWaende.push(grid[this.i - 1][this.j]);
    // top,right,bottom,left
  }


  this.nachbarnErmitteln = function() {
    this.nachbarFelder = [];
    if (j - 2 > 0 && !grid[this.i][this.j - 2].weg) {
      this.nachbarFelder.push(grid[this.i][this.j - 2]);
    }
    if (i + 2 < cols && !grid[this.i + 2][this.j].weg) {
      this.nachbarFelder.push(grid[this.i + 2][this.j]);
    }
    if (j + 2 < rows && !grid[this.i][this.j + 2].weg) {
      this.nachbarFelder.push(grid[this.i][this.j + 2]);
    }
    if (i - 2 > 0 && !grid[this.i - 2][this.j].weg) {
      this.nachbarFelder.push(grid[this.i - 2][this.j]);
    }
  }


  this.pickNeighbor = function() {
    this.nachbarnErmitteln();
    if (this.nachbarFelder.length < 1) {
      this.draw();
      randomBacktrack();
    } else {
      if (this.nachbarFelder.length > 1) {
        verzweigungen.push(current);
        current.drawRed();
      }
      var next = random(this.nachbarFelder);
      if (this.i - next.i == 2) {
        this.nachbarWaende[3].weg = true;
        this.nachbarWaende[3].draw();
      } else if (this.i - next.i == -2) {
        this.nachbarWaende[1].weg = true;
        this.nachbarWaende[1].draw();
      } else if (this.j - next.j == 2) {
        this.nachbarWaende[0].weg = true;
        this.nachbarWaende[0].draw();
      } else {
        this.nachbarWaende[2].weg = true;
        this.nachbarWaende[2].draw();
      }
      if (this.nachbarFelder.length == 1) {
        this.draw();
      }
      next.weg = true;
      current = next;
    }
  }

  this.draw = function() {
    if (this.start) {
      fill(0, 255, 0);
    } else if (this.ende) {
      fill(255, 0, 0);
    } else if (this.weg) {
      fill(255, 255, 255);
    } else {
      fill(0, 0, 0);
    }
    rect(this.x, this.y, this.w, this.w);
  }
  this.drawRed = function() {
    fill(255, 0, 0);
    rect(this.x, this.y, this.w, this.w);
  }
}





function Wand(i, j, w) {
  this.x = i * w + w / 2;
  this.y = j * w + w / 2;
  this.i = i;
  this.j = j;
  this.w = w;
  this.ende = false;
  this.weg = false;
  this.start = false;
  this.draw = function() {
    if (this.start) {
      fill(0, 255, 0);
    } else if (this.ende) {
      fill(255, 0, 0);
    } else if (this.weg) {
      fill(255, 255, 255);
    } else {
      fill(0, 0, 0);
    }
    rect(this.x, this.y, this.w, this.w);
  }
}