class Features {
  #features = {}
  constructor(featuresData = {}) {
    if(Array.isArray(featuresData)){
      this.#features = Object.fromEntries(featuresData)
    } else if (typeof featuresData == 'object'){
      this.#features = featuresData
    }
  }

  set(name, value) {
    if(Array.isArray(name) && name.length == 2){
      value = name[1]
      name = name[0]
    }
    this.#features[name] = value;
  }

  get(name){
    return this.#features[name]
  }

  delete(name) {
    if (this.#features[name]) {
      delete this.#features[name];
    }
  }

  has(name){
    return this.#features[name] !== undefined
  }

  forEach(callback) {
    Object.entries(this.#features).forEach(([key, value]) => {
      callback(key, value)
    })
  }

  map(callback) {
    return Object.entries(this.#features)
      .map((key,value) => callback(key,value))
  }

  toJSON(){
    return JSON.stringify(this.#features, null, 2)
  }
}

export { Features };
