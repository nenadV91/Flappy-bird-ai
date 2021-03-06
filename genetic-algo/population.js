class Population {
  constructor(total) {
    this.total = total;
    this.active = [];
    this.saved = [];
    this.pool = [];
    this.generation = 1;
  }

  create(Unit) {
    this.Unit = Unit;
    for(let i = 0; i < this.total; i++) {
      this.active.push(new Unit());
    }
  }

  remove(index) {
    const [unit] = this.active.splice(index, 1);
    this.saved.push(unit);
  }

  update() {
    this.calcFitness();
    this.nextGeneration();

    this.saved.length = 0;
    this.generation += 1;
  }

  pick() {
    let index = 0;
    let r = random(1);

    while(r > 0) {
      r = r - this.pool[index].fitness;
      index++
    }

    index--;
    return this.pool[index];
  }

  calcFitness() {
    this.saved.sort((a, b) => {
      return a.score - b.score
    });

    this.pool = this.saved.slice(-20);

    const total = this.pool.reduce((r, e) => {
      return r + e.score
    }, 0);

    this.pool.forEach(unit => {
      unit.fitness = unit.score / total;
    })
  }

  nextGeneration() {
    for(let i = 0; i < this.total; i++) {
      const parent = this.pick();
      const child = new this.Unit(parent.brain);
      this.active.push(child);
    }
  }
}