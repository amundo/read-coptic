// list-unique-grammar-values.js
let json = await Deno.readTextFile("SahidicGlossary-lexicon.json")
let lexicon = JSON.parse(json)


let grammarLabelCount = lexicon.entries
  .reduce((grammarLabelCount, word) => {
    if(!grammarLabelCount[word.grammar]){
      grammarLabelCount[word.grammar] = 0
    }
    grammarLabelCount[word.grammar]++
    return grammarLabelCount
  },   {})

  grammarLabelCount
let grammarLabelCountByFrequency = Object.entries(grammarLabelCount)
  .sort((a,b) => b[1] - a[1])
console.table(grammarLabelCountByFrequency)