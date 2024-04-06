import {ChooseWordclass} from '../choose-wordclass/ChooseWordclass.js'

class EditWord extends HTMLElement {
  #word = { form: '', gloss: '', features: {}}
  #grammar = {}

  constructor(){
    super()
    this.innerHTML = `<span class=form></span>
    <input name=gloss placeholder=gloss>
    <choose-wordclass></choose-wordclass>
    `

    this.listen()
  }

  connectedCallback(){

  }

  static get observedAttributes(){
    return ["form", "gloss", "features"]
  }

  attributeChangedCallback(attribute, oldValue, newValue){
    if(attribute == "form"){
      this.data = Object.assign(this.#word, {form: newValue})
    }

    if(attribute == "gloss"){
      this.data = Object.assign(this.#word, {gloss: newValue})
    }
    
    if(attribute == "features"){
      let newFeatures = JSON.parse(newValue)
      let features = Object.assign(this.#word.features, newFeatures)
      this.data = Object.assign(this.#word, {features})
    }
  } 

  set data(word){
    this.#word = word
    this.render()
  }

  set grammar(grammar){
    this.#grammar = grammar
  }

  get grammar(){
    return this.#grammar
  }

  renderFeatures(features){
    Object.entries(features)
      .reduce((table, [feature, value]) => {
        let tr = document.createElement('tr')
        tr.innerHTML = `<th>${feature}</th><td>${value}</td>`
        table.append(tr)
        return table
      }, this.querySelector("table.feature-table"))
  }

  render(){
    this.querySelector('.form').innerHTML = this.#word.form
    this.querySelector('choose-wordclass').data = this.#grammar.wordclasses
    // this.querySelector('.gloss').innerHTML = this.#word.gloss
    // this.querySelector('.features').innerHTML = this.renderFeatures(this.#word.features)
  }

  listen(){
    this.addEventListener('click', clickEvent => {
      if(clickEvent.target.matches()){

      }
    })
  }
}

export {EditWord}
customElements.define('edit-word', EditWord)
