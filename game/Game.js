class Game {
  constructor() {
    this.obstacles = [];
    this.birds = [];
    this.isOver = false;
    this.isPaused = false;
    this.score = 0;
    this.total = 100;
  }

  init() {
    this.obstacles.push(new Obstacle());
    this.birds = new Population(this.total);
    this.birds.create(Bird);
  }

  update() {
    if(this.isPaused) {
      this.paused();
    }

    if(!this.birds.active.length) {
      this.reset();
    }

    if(frameCount % 5 === 0) {
      this.score += 1;
    }

    if(frameCount % 100 === 0) {
      this.obstacles.push(new Obstacle())
    }

    for(let i = this.birds.active.length - 1; i >= 0; i--) {
      const bird = this.birds.active[i];

      if(bird.hitEdge) {
        this.birds.remove(i);
      }

      bird.think(this.obstacles);
      bird.update();
      bird.show();
    }
  }

  checkCollision() {
    for(let i = this.obstacles.length - 1; i >= 0; i--) {
      const obstacle = this.obstacles[i];

      for(let j = this.birds.active.length - 1; j >= 0; j--) {
        const bird = this.birds.active[j];

        if(!bird.isImortal) {
          if(obstacle.hit(bird)) {
            this.birds.remove(j);
          }
        }
      }

      obstacle.update();
      obstacle.show();

      if(obstacle.x <= -obstacle.width) {
        this.obstacles.splice(i, 1)
      }
    }
  }

  reset() {
    frameCount = 0;
    this.score = 0;
    this.obstacles = [];
    this.birds.update();
    this.isOver = false;
    this.isPaused = false;
    loop();
  }

  pause() {
    this.isPaused = true;
    noLoop();
  }

  paused() {
    textSize(14);
    this.textStyle();
    text('Paused', width / 2, height / 2);
  }

  resume() {
    this.isPaused = false;
    loop();
  }

  over() {
    this.isOver = true;
    this.overText();
    noLoop();
  }

  textStyle(color = 255, pos = CENTER) {
    noStroke();
    fill(color);
    textAlign(pos);
  }

  stats() {
    fill(255);
    noStroke();
    textSize(12);
    textAlign(LEFT);
    text(`Score: ${this.score}`, 20, 25);
    text(`Generation: ${this.birds.generation}`, 20, 40);
  }

  overText() {
    this.textStyle();

    textSize(24);
    text('Game over', width / 2, height / 2);

    textSize(14);
    text('Press R to play again', width / 2, height / 2 + 20);

    textSize(26)
    text('↺', width / 2, height / 2 + 60);
  }
}