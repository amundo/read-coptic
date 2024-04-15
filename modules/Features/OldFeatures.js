class Features {
  #features = {};

  constructor(featuresData = {}) {
    if (Array.isArray(featuresData)) {
      this.#features = Object.fromEntries(featuresData);
    } else if (typeof featuresData === 'object') {
      this.#features = featuresData;
    }
  }

  set(name, value) {
    if (Array.isArray(name) && name.length === 2) {
      value = name[1];
      name = name[0];
    }
    this.#features[name] = value;
  }

  get(name) {
    return this.#features[name];
  }

  delete(name) {
    if (this.#features[name]) {
      delete this.#features[name];
    }
  }

  has(name) {
    return this.#features[name] !== undefined;
  }

  wasforEach(callback) {
    for (const [key, value] of this.entries()) {
      callback(value, key);
    }
  }

  wasmap(callback) {
    return Array.from(this.entries()).map(([key, value]) => callback(value, key));
  }

  [Symbol.iterator]() {
    let index = 0;
    const keys = Object.keys(this.#features);
    const values = Object.values(this.#features);

    return {
      next: () => {
        if (index < keys.length) {
          const value = { key: keys[index], value: values[index] };
          index++;
          return { value, done: false };
        } else {
          return { done: true };
        }
      }
    };
  }

  entries() {
    return [...this];  // This will convert the iterable into an array of [key, value] pairs
  }

  toJSON() {
    return JSON.stringify(this.#features, null, 2);
  }
}

export { Features };
