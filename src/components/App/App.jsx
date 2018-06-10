import React, {Component} from 'react'
import Header from '../Header/Header'
import Panel from '../../utils/Panel'
import HeroesList from '../HeroesList/HeroesList'
import NewHeroForm from '../NewHeroForm/NewHeroForm'
import SquadEditor from '../SquadEditor/SquadEditor'

import './App.css'

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      newHero: {},
      sqadEditorList: []
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

  clearSquadEditor = () => {
    this.setState({
      sqadEditorList: []
    })
  }

  heroToSquad = (hero) => () => {
    this.setState({
      sqadEditorList: [hero, ...this.state.sqadEditorList]
    })
  }

  heroFromEditRemove = (id) => () => {
    console.log(id)
    this.setState({
      sqadEditorList: this.state.sqadEditorList.filter( item => item.id !== id)
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
            <HeroesList
              newHero={this.state.newHero}
              clearHero={this.clearHero}
              heroToSquad={this.heroToSquad}
              heroesInEditor={this.state.sqadEditorList}
            />
          </Panel>
          <Panel className="col" title='Squad Editor'>
            <SquadEditor
              editorList={this.state.sqadEditorList}
              onClear={this.clearSquadEditor}
              heroRemove={this.heroFromEditRemove}
            />
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
