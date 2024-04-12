import {Features} from '../../modules/features/Features.js'

class DisplayFeatures extends HTMLElement {
  #features = new Features()

  constructor(){
    super()
  }

  
  set data(featuresData){
    this.#features = featuresData
    this.render()
  }

  get data()
    this.#features.toJSON()
  }

  render(){
    this.#features.forEach()
  }

  listen(){
    this.addEventListener('click', clickEvent => {
      if(clickEvent.target.matches()){

      }
    })
  }
}

export {DisplayFeatures}
customElements.define('display-features', DisplayFeatures)
