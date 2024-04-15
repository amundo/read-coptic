class Features extends Map {

  constructor(featuresData = {}) {
    console.log(featuresData)
    if (typeof featuresData === 'object') {
      super(Object.entries(featuresData))
    } else {
      super(featuresData)
    }
  }

  set(key, value) {
    // If key is an array, destructure it
    if (Array.isArray(key)) {
      [key, value] = key;
    }

    // Set the key-value pair
    super.set(key, value);
  }
} 

export {Features}