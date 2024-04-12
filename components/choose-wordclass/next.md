---
title: what's next?
author: Patrick Hall
---

there is a tokenized text in the dom.

## Render tokens

for each token
  create a word
    create a view-word
      view-word.data = word

click a word.

* for each token
  * create a word
  * create view-word
    * view-word.data = word

* the parent appends edit buttons to each view-word
  * onclick, the view-word emits a change event
    * the parent listens for change events
      *  the parent creates an edit-word
        * edit-word opens a dialog 
          * the dialog has an edit-word
            * edit-word has a form
              * edit-word manages a word
                * onsubmit, edit-word updates its word
              * the form is populated from the word
                * onclose, the dialog emits a change event
          


## workflow

* open the app
  * choose import plaintext
    * plaintext it tokenized and words are created
      * each token is replaced with view-word
        * listeners are set up for clicks on each view-word
          * the user can click the view-word to edit it 
            * the view-word emits a change event
              * the parent listens for change events
                * the parent creates an edit-word
                  * edit-word opens a dialog 
                    * the dialog has an edit-word
                      * edit-word has a form
                        * edit-word manages a word
                          * onsubmit, edit-word updates its word
                        * the form is populated from the word
                          * onclose, the dialog emits a change event
                        * the view-word hears the emitted change event and updates itself
    

