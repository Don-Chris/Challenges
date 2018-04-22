var Ecken = 15;
var radius = 100;

function setup() {
	createCanvas(600 , 600);
	frameRate(1);
}

function draw() {
	translate(width/2, height/2);
	strokeWeight(5);
	if(mouseIsPressed){
		var Punkte=vieleckgenerator (mouseX- width/2 , mouseY-height/2 , radius , Ecken);
		zeichnenecken(Punkte);	
	}
	// console.log(Punkte);
}

vieleckgenerator = function(x , y , r , anzahlecken){
	var ecken = [];
	var xi;
	var yi;
	var winkel = TWO_PI / anzahlecken;
	for (var i=0; i<anzahlecken; i++){
		xi = x + r* cos(winkel * i);
		yi = y + r* sin(winkel * i);
		ecken[i]= createVector (xi,yi,0); 
	}
	return ecken;
}

zeichnenecken = function(ecken){
	for (var i=0; i<ecken.length; i++){
		line(ecken[i].x,ecken[i].y,ecken[(i+1)%ecken.length].x,ecken[(i+1)%ecken.length].y);		
	}
	return;
}