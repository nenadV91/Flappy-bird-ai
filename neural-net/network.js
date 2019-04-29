class NeuralNetwork {
  constructor() {
    this.layers = [];
  }

  get isFirst() {
    return !this.layers.length;
  }

  get prev() {
    return this.layers.slice(-1)[0];
  }

  add(layer) {
    if(!this.isFirst) {
      if(this.prev) {
        layer.prev = this.prev;
        layer.inodes = this.prev.onodes;
      }
    } else {
      if(!layer.inodes) {
        const error = 'inodes must be defined on first layer';
        throw new Error(error);
      }
    }

    this.layers.push(layer);
    layer.activate();
  }

  query(input) {
    let prev = undefined;
    let layers = this.layers;

    for(let i = 0; i < layers.length; i++) {
      let layer = layers[i];
      if(!prev) layer.train(input);
      else layer.train(prev.output);
      prev = layer;
    }

    return prev.output.toArray();
  }

  update(target) {
    let prev = undefined;
    let layers = this.layers;

    for(let i = layers.length - 1; i >= 0; i--) {
      const layer = layers[i];
      if(!prev) layer.update({ target });
      else layer.update({ prev });
      prev = layer;
    }
  }

  train(input, target) {
    if(!input) {
      const error = 'Input parameter is required on train method';
      throw new Error(error);
    }

    if(!target) {
      const error = 'Target parameter is required on train method';
      throw new Error(error);
    }

    this.query(Matrix.fromArray(input));
    this.update(Matrix.fromArray(target));
  }

  predict(input) {
    if(!input) {
      const error = 'Input parameter is required on predict method';
      throw new Error(error);
    }

    return this.query(Matrix.fromArray(input));
  }
}