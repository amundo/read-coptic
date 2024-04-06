
class ConfigureCategory extends HTMLElement {
  #category = {} 

  constructor(){
    super()
    this.listen()
  }
 
  connectedCallback(){

  } 

  set data({name,values}){
    this.#category.name = name
    this.#category.values = values
    this.render()
  }

  get data(){
  }

  set value(value) {
    const radioToSelect = this.querySelector(`input[name="${this.#category.name}"][value="${value}"]`);

    if (radioToSelect) {
      radioToSelect.checked = true;
    }

    return {[this.#category.name]: this.value}

  }
  
  get value(){
    const checkedRadio = this.querySelector(':checked');
    if(checkedRadio){
      let value = checkedRadio.value
      return {[this.#category.name]: value}
    }
  }

  renderRadio(){
    let div = this.#category.values
      .reduce((div, {symbol,value}) => {
        let input = document.createElement('input')
        input.type = 'radio'
        input.name = this.#category.name
        input.value = value
        
        let label = document.createElement('label')
        label.append(input,symbol)

        div.append(label)

        return div
      }, document.createElement('div'))
    return div
  }
   
  render(){

    this.innerHTML = `<span class=category-name>${this.#category.name}</span>`
    this.append(this.renderRadio())

  }

  listen(){

  }
}

export {ConfigureCategory}
customElements.define('configure-category', ConfigureCategory)
