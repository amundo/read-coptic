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
    return Array.from(this.querySelectorAll('configure-category'))
      .map(configureWordclass => configureWordclass.value)
      .reduce((features, feature) => {
        console.table(features)
        console.table(feature)
        return {...features, ...feature}
      }, {})
  }

  renderConfigureCategories(){
    if(!this.#selectedWordclass) { return }
    let categoryNames = this.#selectedWordclass.categories
    let categories = this.#grammar.categories
      .filter(category => categoryNames.includes(category.name))

    this.querySelector('.configure-categories').innerHTML = ''
    categories.forEach(category => {
      console.log(category)
      let configureCategory = document.createElement('configure-category')
      configureCategory.data = category
      this.querySelector('.configure-categories').append(configureCategory)
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

      this.dispatchEvent(new CustomEvent('choose-wordclass-change', {detail: this.value}))
      this.renderConfigureCategories()
    })
  }
}

export { ChooseWordclass }
customElements.define('choose-wordclass', ChooseWordclass)
