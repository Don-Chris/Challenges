let Kreise = [];



function setup() {
	createCanvas(600, 600);
	let x, y, pos;
	for (let i = 0; i < 100; i++) {
		pos = findPlace();
		x = pos[0];
		y = pos[1];
		r = pos[2];
		Kreise.push(new Kreis(x, y, r));

	}
	noLoop();
}

function draw() {
	background(0);
	for (var i = 0; i < Kreise.length; i++) {
		Kreise[i].show();
	}
	frameRate(1);
	console.log(Kreise);

}

function Kreis(x, y, r) {
	this.x = x;
	this.y = y;
	this.r = r;

	this.show = function() {
		// noStroke();
		fill(255);
		ellipse(x, y, 2 * r, 2 * r);
	}
	this.grow = function() {
		r += 0.1;
	}
	this.containsP = function(x, y) {
		return (dist(this.x, this.y, x, y) < this.r);
	}
	this.schneidetKreis = function(x, y, r_) {
		return (dist(this.x, this.y, x, y) < (this.r + r_));
	}
}

function findPlace() {
	let x, y;
	let r = random(50);
	let found = false;
	let counter = 0;
	while (!found) {
		x = random(width);
		y = random(height);
		found = true;
		for (let k of Kreise) {
			if (k.schneidetKreis(x, y, r)) {
				found = false;
			}
		}
		counter++;
		if (counter >= 100) {
			console.log("kein Punkt gefunden");
			break;
		}
	}
	// console.log(x,y);
	return [x, y, r];
}
