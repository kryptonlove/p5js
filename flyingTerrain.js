let cols;
let rows;
let scl = 20; // scale
let w;
let h;
let speed = 0;
let terrain = [];
let stars = [];

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);

  let w = windowWidth;
  let h = windowHeight;
  
  cols = (w - w%scl) / scl *2;
  rows = (h - h%scl) / scl *2;
  // cols = w / scl * 2; 
  // rows = h/ scl * 2; 

  // empty array for terrain
  terrain = new Array(cols); // rows of the matrix
  for (i = 0; i < cols; i++) {
    terrain[i] = new Array(rows); // fill with rows
  }

  for (var i = 0; i < 200; i++) {
		stars[i] = new Star();
	}
}

function draw() {
  background(0);
//  drawStar();
  drawTerrain();
}

function drawTerrain() {
  speed -= 0.08;
  let yoff = speed;
  for (let y = 0; y < rows; y++) {
    let xoff = 0;
    for (let x = 0; x < cols; x++) {
      terrain[x][y] = map(noise(xoff, yoff), 0, 1, -150, 150 );
      xoff += 0.2;
    }
    yoff += 0.2;
  }

  stroke(255, 0, 0);
  fill(0);

  let w = windowWidth;
  let h = windowHeight;

  translate(width/2 - w, height/2 - w/5);
  rotateX(PI/3);

  for (let y = 0; y < rows - 1 ; y++) {
    beginShape(TRIANGLE_STRIP);
    for (let x = 0; x < rows; x++) {
      vertex(x*scl, y*scl, terrain[x][y]);
      vertex(x*scl, (y+1)*scl, terrain[x][y+1]);
    }
    endShape();
  }

}

function drawStar() {
  for (let i = 0; i < stars.length; i++) {
		stars[i].draw();
	}
}

class Star {
	constructor() {
		this.x = random(0,200);
		this.y = random(0,200);
		this.size = random(0.25, 3);
		this.t = random(TAU);
	}

	draw() {
		this.t += 0.1;
		var scale = this.size + sin(this.t) * 2;
		noStroke();
    translate(-10,-10);
		ellipse(this.x, this.y, scale, scale);
	}
}