var minen = 15;
var zellen_minen = [];
var aufloesung = 10;
var px_breite = 600;
var px_hoehe = 600;
var zellen = [];
var game_Over;
var flaechenaufgedeckt;
var spiel_Gewonnen;
var cheats = false;
var spielStart;

function setup() {
	zellen_minen= [];
	game_Over=false;
	flaechenaufgedeckt=0;
	spiel_Gewonnen= false;
	spielStart = true;
	createCanvas(px_breite +1 , px_hoehe +1);
	breite = px_breite / aufloesung;
	hoehe = px_hoehe / aufloesung;
	for( var i=0 ; i < aufloesung ; i++){
		zellen[i] = [];
		for( var j=0 ; j < aufloesung ; j++ ){
			zellen[i][j] = new Zelle(j*breite+breite/2 , i*hoehe+hoehe/2 , i , j);
		}
	}
	setzenDerMinen(zellen , zellen_minen , minen);
	nachbarHinzufuegen(zellen);
	Wertberechnen(zellen);
	frameRate(5);
	// console.log(zellen_minen);
	// noLoop();
}

function draw() {
	rectMode(CENTER);
	background(0);
	for( var i=0 ; i < aufloesung ; i++ ){
		for( var j=0 ; j < aufloesung ; j++ ){
			zellen[i][j].show();
		}
	}
	if (gameOver(zellen_minen)){
		// noLoop();
		console.log("Game Over");
		game_Over=true;
	}
	if ( spielGewonnen() ){
		console.log("Spiel gewonnen");
	}
	// textSize(30);
	// text(" " + zellen[0][0].wert, 10,10);
}

function mousePressed(){
	for( var i=0 ; i < aufloesung ; i++ ){
		for( var j=0 ; j < aufloesung ; j++ ){
			if(zellen[i][j].mausklick(mouseX,mouseY) && !game_Over){
				if (spielStart && zellen[i][j].zustand ==2){
					// zellen[i][j].zustand = 0;
					// zellen[i][j].ersteflache = true;
					// setzenDerMinen(zellen , zellen_minen , 1);
					// zellen[i][j].geklicktwerden();
					setup();
					mousePressed();
				}else if(zellen[i][j].zustand == 0){
					spielStart = false;
					zellen[i][j].geklicktwerden();
				}else{
					zellen[i][j].geklicktwerden();
				}
			}
		}
	}
	// console.log (mouseX + " " + mouseY);
}

function setzenDerMinen(arr ,arr2, mine){
	var counter = 0;
	if(mine > aufloesung*aufloesung){
		mine = 1;
		console.log("Mine falsch gewählt");
	}
	var x, y;
	while (counter < mine){
		x= int(random(aufloesung));
		y= int(random(aufloesung));
		if (arr[x][y].zustand == 0){
			arr[x][y].zustand = 2;
			arr2.push(arr[x][y]);
			counter++;
		}
	}
}

function nachbarHinzufuegen(arr){
	for(var i = 0 ; i < aufloesung ; i++){
		for ( var j = 0 ; j < aufloesung ; j++){
			arr[i][j].nachbarhinzu(arr);
		}
	}
}
function spielGewonnen(){
	if(flaechenaufgedeckt == aufloesung * aufloesung - minen){
		spiel_Gewonnen = true;
		cheats = true;
		return true;
	} else {
		return false;
	}
}

function Wertberechnen(arr){
	for(var i = 0 ; i < aufloesung ; i++){
		for ( var j = 0 ; j < aufloesung ; j++){
			for( var k = 0 ; k < arr[i][j].nachbar.length ; k++){
				if (arr[i][j].nachbar[k].zustand == 2){
					arr[i][j].wert++;
				}
			}
		}
	}
}

function gameOver(arr){
	for( var i=0 ; i < minen ; i++ ){
		if(arr[i].geklickt && arr[i].zustand == 2){
			return true;
		}
	}
	return false;	
}

function Zelle(x , y , reihe , spalte){
	this.zustand = 0; //0=ohne Nachbar, 1=mit Nachbar, 2=Mine
	this.x = x;
	this.y = y;
	this.reihe = reihe;
	this.spalte = spalte;
	this.nachbar = [];
	this.geklickt = false;
	this.temp = false;
	this.wert = 0;
	// this.ersteflache = false;

	this.show = function(){
		// noFill();
		var txt = " " + this.wert;
		if(this.zustand == 2 && game_Over){
			if(this.temp){
				fill(255,0,0);
				this.temp = false;
				rect(x,y, breite-1 , hoehe-1);
			}else{
				fill(200);
				this.temp = true;
				frameRate (2);
				rect(x,y, breite-1 , hoehe-1);
			}
		}else if(this.zustand == 2 && cheats){
			if(this.temp){
				fill(95);
				this.temp = false;
			}else{
				fill (200);
				this.temp = true;
				frameRate(2);
			}
			rect(x,y, breite-1 , hoehe-1);
		}else if(this.geklickt){
			fill(color(100,255,0));
			rect(x,y, breite-1 , hoehe-1);
			fill(0);
			if(this.wert != 0){
				textAlign(CENTER);
				textSize(hoehe/1,5);
				text(txt, this.x-breite/10 , this.y+hoehe/2.5);
			}
		}else {
			fill(95);
			rect(x,y, breite-1 , hoehe-1);
		}
	}
	this.mausklick = function(x,y){
		return abs(x-this.x) < (breite-1)/2 && abs(y-this.y) < (hoehe-1)/2;
	}
	this.nachbarhinzu = function(arr){
		if(this.reihe != 0){
			this.nachbar.push(arr[this.reihe-1][this.spalte]);
		}
		if(this.spalte != 0){
			this.nachbar.push(arr[this.reihe][this.spalte-1]);
		}
		if(this.reihe != aufloesung-1){
			this.nachbar.push(arr[this.reihe+1][this.spalte]);
		}
		if(this.spalte != aufloesung-1){
			this.nachbar.push(arr[this.reihe][this.spalte+1]);
		}
		if(this.reihe != 0 && this.spalte != 0){
			this.nachbar.push(arr[this.reihe-1][this.spalte-1]);
		}
		if(this.reihe != 0 && this.spalte != aufloesung-1){
			this.nachbar.push(arr[this.reihe-1][this.spalte+1]);
		}
		if(this.reihe != aufloesung-1 && this.spalte != 0){
			this.nachbar.push(arr[this.reihe+1][this.spalte-1]);
		}
		if(this.reihe != aufloesung-1 && this.spalte != aufloesung-1){
			this.nachbar.push(arr[this.reihe+1][this.spalte+1]);
		}
	}
	this.geklicktwerden = function(){
		if(this.wert == 0 && !this.geklickt && this.zustand != 2){
			this.geklickt= true;
			flaechenaufgedeckt++;
			for( var k = 0 ; k < this.nachbar.length ; k++){
				this.nachbar[k].geklicktwerden();
			}
		}else if( !this.geklickt ){
			this.geklickt = true;
			flaechenaufgedeckt++;
		}else if(!this.geklickt && this.zustand ==2){
			this.geklickt = true;
		}
	}
}
