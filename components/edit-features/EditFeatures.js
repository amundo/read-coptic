import {Features} from '../../modules/features/Features.js'

class EditFeatures extends HTMLElement {
  #features = new Features()

  constructor(){
    super()
    
    this.listen()
  }

  set data(data){
    this.render()
  }

  get data(){
    return {
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

export {EditFeatures}
customElements.define('edit-features', EditFeatures)
