let recursiveAssign = (target, ...sources) => {
  sources.forEach((source) => {
    Object.keys(source).forEach((key) => {
      // Check if the value is an object and not null (to exclude arrays and null values)
      if (source[key] && typeof source[key] === "object" && !Array.isArray(source[key])) {
        // If the target doesn't have the key, create an empty object for it
        if (!target[key] || typeof target[key] !== "object" || Array.isArray(target[key])) {
          target[key] = {}
        }
        // Recursively assign nested objects
        recursiveAssign(target[key], source[key])
      } else {
        // Assign non-object values directly
        target[key] = source[key]
      }
    })
  })
  return target
}

// Usage example:
let word = { form: "pei", gloss: "", features: { gender: "masculine" } }
let annotations = { gloss: "the house", features: { number: "singular" } }

let newWord = recursiveAssign({}, word, annotations)
console.log(newWord)
