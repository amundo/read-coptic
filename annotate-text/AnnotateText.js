import {tokenizeCoptic} from '../modules/tokenize-coptic-intl-segmenter.js'

class AnnotateText extends HTMLElement {
  constructor(){
    super()
    this.listen()
  }

  async fetch(url){
    let response = await fetch(url)
    let data = await response.json()
    this.data = data
  }

  connectedCallback(){

  }

  static get observedAttributes(){
    return ["text", "lexicon"]
  }

  attributeChangedCallback(attribute, oldValue, newValue){
    if(attribute == "text"){
      this.fetchText(newValue)
    }
    if(attribute == "lexicon"){
      this.fetchLexicon(newValue)
    }
  }

  async fetchText(url){
    let response = await fetch(url)
    let text = await response.text()
    this.text = text
  }

  async fetchLexicon(url){
    let response = await fetch(url)
    let lexicon = await response.json()
    this.lexicon = lexicon
  }
  

  set data(data){
    this.whatever = data.whatever
    this.metadata = data.metadata
    this.render()
  }

  get data(){
    return {
      whatever: this.whatever,
      metadata: this.metadata
    }
  }

  render(){
    // edit .innerHTML here
  }

  listen(){
    this.addEventListener('click', clickEvent => {
      if(clickEvent.target.matches()){

      }
    })
  }
}

export {AnnotateText}
customElements.define('annotate-text', AnnotateText)
