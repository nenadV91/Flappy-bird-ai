let canvas;
let width;
let height;
let game;

function setup() {
  width = 600;
  height = 400;
  canvas = createCanvas(width, height);
  game = new Game();
  game.init();
}


function draw() {
  background(51);

  game.stats();
  game.update();
  game.checkCollision();
}


function keyPressed() {
  if(keyCode === 32 && !game.isPaused) {
    game.bird.jump()
  }

  if(keyCode === 82) {
    if(game.isOver) {
      game.reset();
    }
  }

  if(keyCode === 13) {
    if(game.isPaused && !game.isOver) {
      game.resume()
    } else {
      game.pause()
    }
  }
}