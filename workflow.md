---
title: Workflow design
author: Patrick Hall
---


## Word
* `gloss word` - starting with a form, edit gloss and features
* `gloss sentence` - tokenize and gloss each form


## Sentence

* `gloss text` - segment and gloss each sentence
* `build lexicon` - concatenate words and deduplicate


## Lexicon

* `build dictionary` - concatenate entries and deduplicate

## HTML document (Lambdin)

* `analyze entry` - given a dom definition, select tokens and group/edit into towrsd
* `build grammar` - given a dictionary, generate a grammar
* `edit orthography` — edit a list of all characters used in a writing system
* `edit character` - edit a single orthographic character
* `selectType(item, types)` - given a list of values and an item, associate a `type` property from the list with the item
* `select wordclass` - select type
* `edit form` - form input
* `edit gloss` - gloss input
* `transliterate input` - transliterate from one orthography to another as the user types




edit-word
  p.form
  form
    [name=gloss]
    edit-features


edit-features
  button.add-feature
  ul.features
    li.feature
      select.choose-feature
      input[name=feature-value][list=feature-values-123]
      datalist#feature-values-123
        option[value=feature-value]
