class GlossWord extends HTMLElement {
  #word = { form: "", gloss: "", features: {}}
  constructor(){
    super()
    this.listen()
  }

  set data(word){
    this.#word = Object.assign(this.#word, word)
    this.render()
  }

  get data(){
    return {
      whatever: this.whatever,
      metadata: this.metadata
    }
  }

  render(){
  }

  listen(){
    this.addEventListener('click', clickEvent => {
      if(clickEvent.target.matches()){

      }
    })
  }
}

export {GlossWord}
customElements.define('gloss-word', GlossWord)
