let snake;
let food;
let scl = 20;
let gameStarted = false;

let startButton;

function setup() {
  createCanvas(windowWidth, 400);
  snake = new Snake();
  frameRate(10);
  pickLocation();
  startButton = createButton('Start Game');
  startButton.position(width / 2, height / 2);
  startButton.mousePressed(startGame);
}

function pickLocation() {
  let cols = floor(width / scl);
  let rows = floor(height / scl);
  food = createVector(floor(random(cols)), floor(random(rows)));
  food.mult(scl);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);

  if (gameStarted) {
    if (snake.eat(food)) {
      pickLocation();
   }

    snake.update();
    snake.show();

    if (snake.endGame()) {
      background(255, 0, 0);
      textSize(32);
      fill(255);
      textAlign(CENTER);
      text("Game Over", width / 2, height / 2);
      noLoop();
    }

    fill(255, 0, 100);
    circle(food.x, food.y, scl, scl);
  }
}

function startGame() {
  gameStarted = true;
  startButton.hide();
  loop();
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    snake.dir(0, -1);
  } else if (keyCode === DOWN_ARROW) {
    snake.dir(0, 1);
  } else if (keyCode === RIGHT_ARROW) {
    snake.dir(1, 0);
  } else if (keyCode === LEFT_ARROW) {
    snake.dir(-1, 0);
  }

}
class Food {
  constructor() {
    this.position = createVector(0, 0);
    this.pickLocation();
  }

  pickLocation() {
    let cols = floor(width / scl);
    let rows = floor(height / scl);
    this.position = createVector(floor(random(cols)), floor(random(rows)));
    this.position.mult(scl);
  }

  show() {
    noStroke(); // Add this line to remove the outline
    fill(255, 0, 0);
    ellipse(this.position.x, this.position.y, scl, scl);
  }
}

class Snake {
  constructor() {
    this.body = [];
    this.size = []; // Initialize the size array for storing the size of each body segment
    let cols = floor(width / scl); // Declare cols
    let rows = floor(height / scl); // Declare rows
    this.body[0] = createVector(floor(cols/2), floor(rows/2)); // Use cols and rows to calculate initial position
    this.xdir = 0;
    this.ydir = 0;
  }

  // rest of the code...


  update() {
    let head = this.body[this.body.length - 1].copy();
    this.body.shift();
    head.x += this.xdir * scl;
    head.y += this.ydir * scl;
    this.body.push(head);
  }

show() {
  for (let i = 0; i < this.body.length; i++) {
    let size = this.size[i] || scl;
    if (i === this.body.length - 1) {
      size += 5;
    }
    noStroke();
    fill(0, 255, 0);
    ellipse(this.body[i].x, this.body[i].y, size, size);
  }
}
 eat(pos) {
    let d = dist(this.body[this.body.length - 1].x, this.body[this.body.length - 1].y, pos.x, pos.y);
    if (d < scl) {
      this.grow();
      return true;
    } else {
      return false;
    }
}
  
location() {
  let cols = floor(width / scl);
  let rows = floor(height / scl);
  this.pos = createVector(floor(random(cols)), floor(random(rows)));
  this.pos.mult(scl);
}

grow() {
  let tail = this.body[this.body.length - 1];
  let newSegment = createVector(tail.x, tail.y);
  
  // Add the new segment to the body
  this.body.push(newSegment);
  
  // Make the new segment larger
  this.size.push(scl + 5); // Increase the size of the new segment by 5
}

  endGame() {
    let head = this.body[this.body.length - 1];
    for (let i = 0; i < this.body.length - 1; i++) {
      let part = this.body[i];
      if (part.x === head.x && part.y === head.y) {
        return true;
      }
    }
    if (head.x < 0 || head.x >= width || head.y < 0 || head.y >= height) {
      return true;
    }
    return false;
  }

  dir(x, y) {
    this.xdir = x;
    this.ydir = y;
  }
}