class Population {
  constructor(total) {
    this.total = total;
    this.active = [];
    this.saved = [];
  }

  create(Unit) {
    for(let i = 0; i < this.total; i++) {
      this.active.push(new Unit());
    }
  }

  remove(index) {
    const [unit] = this.active.splice(index, 1);
    this.saved.push(unit);
  }

  update() {
    for(let i = 0; i < this.total; i++) {
      const parent = this.pick();
      const child = new Bird(parent.brain);
      this.active.push(child);
    }

    this.saved.length = 0;
  }

  pick() {
    return random(this.saved);
  }
}