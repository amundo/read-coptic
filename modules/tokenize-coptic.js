let isCopticPunctuation = (character) => {
  return character.match(/\p{P}/gu)
}

let isCopticScript = (character) => character.match(/\p{Script=Copt}/gu)

let isCombiningOverline = (character) => character == "\u0305"

let isCopticWord = (word) =>
  word
    .split("")
    .every((character) =>
      isCopticScript(character) || isCombiningOverline(character)
    )

class Categorizer {
  constructor(categorizations) {
    this.categorizations = categorizations
  }
  categorize(character) {
    if (this.categorizations[character]) {
      return this.categorizations[character]
    } else {
      return null
    }
  }
}

class Tokenizer {
  constructor(plaintext, categorizer) {
    this.plaintext = plaintext
    this.categorizer = categorizer
  }
  tokenize() {
    let tokens = this.plaintext
      .split(/(\P{Letter}+)/gu)
      .filter((token) => {
        let characters = token.split("")
        return characters.every((character) => {
          return this.categorizer.categorize(character)
        })
      })

    return tokens
  }
}

let tokenizeCoptic = (plaintext) => {
  let tokens = plaintext
    .split(/(\P{Letter}+)/gu)
    .filter((token) => {
      let characters = token.split("")
      return characters.every((character) => {
        // return isCopticPunctuation(character) || character.match(/\p{Letter}/gu)
        return isCopticScript(character)
      })
    })

  return tokens
}

export {
  Categorizer,
  isCombiningOverline,
  isCopticWord,
  tokenizeCoptic,
  Tokenizer,
}
