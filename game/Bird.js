class Bird {
  constructor() {
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
    }, 1000)
  }

  think() {
    const result = random();

    if(result > 0.5) {
      this.jump();
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