import React, {Component} from 'react'
import Header from '../Header/Header'
import Panel from '../../utils/Panel'
import HeroesList from '../HeroesList/HeroesList'

import './App.css'

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {

    }
  }

  render(){
    return (
      <div className="App">
        <Header />
        <div className="row">
          <Panel className="col" title='Create Hero'>
            Heaer would be a form
          </Panel>
          <Panel className="col" title='Heroes'>
            <HeroesList />
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
