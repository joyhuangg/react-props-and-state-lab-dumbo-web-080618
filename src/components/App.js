import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {

  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }


  onChangeType = (typeVal) => {
    const newState = Object.assign({}, {...this.state})
    newState['filters']['type'] = typeVal
    this.setState(newState)
  }

  onFindPetsClick = () => {
    let url = '/api/pets'
    let filter = this.state.filters.type === 'all'
      ? ''
      : `?type=${this.state.filters.type}`
    url+=filter
    fetch(url)
      .then(res => res.json())
      .then(pets => this.setState({pets:pets}))


  }

  onAdoptPet = (id) => {
    const newPets = this.state.pets.map((pet) => {
      if (pet.id === id){
        return {...pet, isAdopted: !pet.isAdopted}
      }
      else{
        return pet
      }
    })
    this.setState({pets: newPets})
  }



  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.onChangeType} onFindPetsClick={this.onFindPetsClick}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.onAdoptPet}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
