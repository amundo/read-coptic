import {ConfigureCategory} from '../configure-category/ConfigureCategory.js'

class ChooseWordclass extends HTMLElement {
  #grammar = {}
  #wordclasses = []
  #selectedWordclass = null
  constructor() {
    super()
    this.innerHTML = `<select class=wordclass-select>
      <option>Choose wordclass…</option>
    </select>
    <div class=configure-categories></div>`
    this.listen()
  }

  set data(grammar) {
    this.#grammar = grammar
    this.#wordclasses = grammar.wordclasses

    this.render()
  }

  get data(){ 
    return this.#wordclasses 
  }

  set value(wordclass) {
    this.querySelector('select.wordclass-select').value = wordclass
  }

  get value() {
    return Array.from(this.querySelectorAll('configure-feature'))
      .map(configureWordclass => configureWordclass.value)
      .reduce((features, feature) => {
        console.table(features)
        console.table(feature)
        return {...features, ...feature}
      }, {})
  }

  renderConfigureFeatures(){
    if(!this.#selectedWordclass) { return }
    let categoryNames = this.#selectedWordclass.categories
    let categories = this.#grammar.categories
      .filter(feature => categoryNames.includes(category.name))

    this.querySelector('.configure-features').innerHTML = ''

    categories.forEach(category => {
      let configureFeature = document.createElement('configure-feature')
      configureFeature.data = category
      this.querySelector('.configure-features').append(configureFeature)
    })
  }

  renderSelect() {
    this.#wordclasses.reduce((select, wordclass) => {
      let option = document.createElement('option')
      option.value = wordclass.name
      option.textContent = wordclass.name
      select.append(option)
      return select
    }, this.querySelector('select.wordclass-select'))

  }

  render(){
    this.renderSelect()
  }

  listen() {
    this.addEventListener('change', changeEvent => {
      let wordclassName = changeEvent.target.value
      this.#selectedWordclass = this.#wordclasses.find(wordclass => wordclass.name === wordclassName)

      this.dispatchEvent(new Event('change', {bubbles: true}))
      this.renderConfigureFeatures()
    })
  }
}

export { ChooseWordclass }
customElements.define('choose-wordclass', ChooseWordclass)
