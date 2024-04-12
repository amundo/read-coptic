class FancyForm extends HTMLElement {
  #data = {}
  constructor(){
    super()
    this.innerHTML = `<form></form>`
    this.addEventListeners()
  }

  addEventListeners(){
    this.querySelector('form')
      .addEventListener('submit', submitEvent => {
        submitEvent.preventDefault()
        this.dispatchEvent(new Event('submit', { bubbles: true }))
      })
  }
}