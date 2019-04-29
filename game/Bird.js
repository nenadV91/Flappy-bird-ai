class Bird {
  constructor(brain) {
    this.x = 100;
    this.y = height / 2;
    this.r = 20;

    this.color = color(255);
    this.velocity = 0;
    this.gravity = 0.5;
    this.friction = 0.95;
    this.lift = -15;

    this.isImortal = true;
    this.hitEdge = false;
    this.score = 0;

    window.setTimeout(() => {
      this.isImortal = false
    }, 1000);

    if(brain instanceof NeuralNetwork) {
      this.brain = brain.clone();
      this.brain.mutate(0.1);
    } else {
      this.brain = this.createBrain();
    }
  }

  createBrain() {
    const brain = new NeuralNetwork();
    brain.add(new Layer({ inodes: 5, onodes: 3 }));
    brain.add(new Layer({ onodes: 4 }));
    brain.add(new Layer({ onodes: 1 }));
    return brain;
  }

  think(obstacles) {
    let [first] = obstacles;
    let firstDist = abs(this.x - first.x);

    for(let i = 0; i < obstacles.length; i++) {
      let obstacle = obstacles[i];
      let dist = abs(this.x - obstacle.x);

      if(dist < firstDist) {
        first = obstacle;
        firstDist = dist;
      }
    }

    const input = [];
    input.push(first.topEdge / height);
    input.push(first.bottomEdge / height);
    input.push(first.x / width);
    input.push(map(this.y, 0, height, 0, 1));
    input.push(map(this.velocity, -5, 5, 0, 1));

    const [output] = this.brain.predict(input);

    if(output > 0.5) {
      this.jump()
    }
  }

  update() {
    this.score += 1;
    this.velocity += this.gravity;
    this.velocity *= this.friction;
    this.y += this.velocity;

    if(this.y <= 0 + this.r / 2) {
      this.y = 0 + this.r / 2;
      this.velocity = 0;
      this.hitEdge = true;
    }

    if(this.y >= height - this.r / 2) {
      this.y = height - this.r / 2;
      this.velocity = 0;
      this.hitEdge = true;
    }
  }

  jump() {
    this.velocity += this.lift;
  }

  show() {
    let col = this.color;

    if(this.isImortal) col = color(0, 0, 255, 100);
    else col = this.color;

    stroke(col);
    fill(255, 50);
    ellipse(this.x, this.y, this.r, this.r);
  }
}