import React, {Component} from 'react'
import Header from '../Header/Header'
import Panel from '../../utils/Panel'
import HeroesList from '../HeroesList/HeroesList'
import NewHeroForm from '../NewHeroForm/NewHeroForm'

import './App.css'

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      newHero: {}
    }
  }

  newHeroSubmit = (newHero) => {
    this.setState({
      newHero: newHero.state
    })
  }

  clearHero = () => {
    this.setState({
      newHero: {}
    })
  }

  render(){
    return (
      <div className="App">
        <Header />
        <div className="row">
          <Panel className="col" title='Create Hero'>
            <NewHeroForm onSubmit={this.newHeroSubmit} />
          </Panel>
          <Panel className="col" title='Heroes'>
            <HeroesList newHero={this.state.newHero} clearHero={this.clearHero} />
          </Panel>
          <Panel className="col" title='Squad Editor'>
            Heaer would be a form
          </Panel>
          <Panel className="col" title='Saved squads'>
            Heaer would be a form
          </Panel>
        </div>
      </div>
    )
  }

}

export default App;
