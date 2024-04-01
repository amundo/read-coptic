import Papa from 'https://esm.sh/papaparse@5.4.1'

let {parse} = Papa
let tsv = await Deno.readTextFile(`sheet-1H1C8rnk1OQn6xh1BWI3xDwXOE8yEUMCKrHQ297k9b4o-gid-553624726.tsv`)

// contains revamped key names 
let names = JSON.parse(await Deno.readTextFile('names.json'))

// remove first two lines with comments
tsv = tsv.split('\n').slice(2).join('\n')

let removeLinesWithOnlyId = tsv => {
  return tsv
    .split('\n')
    .filter(line => {
      let fields = line.split('\t')
      fields = fields.map(field => field.trim())
      fields = fields.filter(field => field)
      return fields.length > 1
    })
    .join('\n')
}
tsv = removeLinesWithOnlyId(tsv)

let entries = parse(tsv, {
  header:true,
  // skipFirstNLines: 2, // doesn't work for some reason?
  skipEmptyLines: true,
  delimiter: '\t'
}).data


let renameKeys = entries => entries
  .map(entry => {
    let entry2 = {}
    names.forEach(
      ({before,after}) => {
        entry2[after] = entry[before]
      })              
    return entry2
  })
  
entries = renameKeys(entries)

let noSharedWords = (s1,s2) => {
  let words1 = s1.split(' ')
  let words2 = s2.split(' ')
  return words1.every(word => !words2.includes(word))
}

let removeEntriesWithNeitherLemmaNorForm = entries => entries.filter(entry => entry.lemma || entry.form)

entries = removeEntriesWithNeitherLemmaNorForm(entries)

let renumberEntries = entries => {
  let id = 1
  for(let entry of entries){
    entry.id = id++
  }
  return entries
}

entries = renumberEntries(entries)

let restructureLexemes = entries => {
  let lemma = ""
  let seenFormsByForm = {} // track homonyms by form

  // the first entry with a lemma is a lemma
  let lemmaEntry = entries.find(entry => entry.lemma)

  for(let entry of entries){

    if(!entry.form && entry.lemma){
      // this entry has no form so it’s a lemma, copy lemma to form
      entry.isLemma = true 
      entry.form = entry.lemma // copy lemma to form
      entry.lemmaId = 0 // lemmaId is 0 for lemmas
      entry.lemmaForm = entry.form // kind of pointless
      lemmaEntry = entry // update lemmaEntry
    } else if(entry.form && !entry.lemma){
      // this entry is not a lemma, copy lemmaId from lemmaEntry
      entry.lemmaForm = lemmaEntry.form
      entry.isLemma = false
      entry.lemmaId = lemmaEntry.id
    }


    if(!seenFormsByForm[entry.form]){
      seenFormsByForm[entry.form] = []
      entry.homonymId = 0
    }
    seenFormsByForm[entry.form].push(entry)

    if(entry.form in seenFormsByForm){
      let homonyms = seenFormsByForm[entry.form];
      // if there are homonyms, add homonymId to this entry
      if(homonyms.length > 1){
        homonyms.forEach((homonym, i) => {
          homonym.homonymId = `${homonym.lemma}_${i+1}`
        })
      }
    }
  }

  return entries
}


entries = restructureLexemes(entries)


let metadata = {
  title: "Sahidic Glossary (Lambdin)",
  source: "Google Sheets",
  contributors: ["Christian (@/ouamsnof", "Randy Komforty"],
  url: "https://docs.google.com/spreadsheets/d/1H1C8rnk1OQn6xh1BWI3xDwXOE8yEUMCKrHQ297k9b4o/edit#gid=553624726",
  notes: [
    "heading names modified by Patrick Hall",
    "data structure modified by Patrick Hall"
  ],
  parsedWith: "parse-coptic-lexicon-tsv.js"
}

Deno.writeTextFile('SahidicGlossary-lexicon.json', JSON.stringify({metadata, entries}, null, 2))

console.log(`Wrote SahidicGlossary-lexicon.json with ${entries.length} entries`)