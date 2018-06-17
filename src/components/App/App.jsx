import React, { Component } from 'react';

import Header from '../Header/Header';
import Panel from '../../common/Panel';
import HeroesList from '../HeroesList/HeroesList';
import NewHeroForm from '../NewHeroForm/NewHeroForm';
import SquadEditor from '../SquadEditor/SquadEditor';
import SquadList from '../SquadList/SquadList';
import { getSquadList, postSquad, deleteSquad } from '../../utils/api';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newHero: {},
      squadEditorList: [],
      squadsList: [],
    };
  }

  componentDidMount() {
    getSquadList().then(result => {
      this.setState({
        squadsList: [...result.data],
      });
    });
  }

  newHeroSubmit = newHero => {
    this.setState({
      newHero: newHero.state,
    });
  };

  clearHero = () => {
    this.setState({
      newHero: {},
    });
  };

  clearSquadEditor = () => {
    this.setState({
      squadEditorList: [],
    });
  };

  heroToSquad = hero => () => {
    this.setState({
      squadEditorList: [hero, ...this.state.squadEditorList],
    });
  };

  saveSquad = stats => () => {
    const squadEditorList = this.state.squadEditorList;

    if (squadEditorList && squadEditorList.length > 0) {
      const squad = {
        stats,
        heroes: squadEditorList,
      };

      postSquad({ ...squad }).then(response => {
        if (response.status === 201) {
          this.setState({
            squadsList: [response.data, ...this.state.squadsList],
            squadEditorList: [],
          });
        }
      });
    }
  };

  squadRemove = id => () => {
    deleteSquad(id).then(() => {
      this.setState({
        squadsList: this.state.squadsList.filter(item => item.id !== id),
      });
    });
  };

  heroFromEditRemove = id => () => {
    this.setState({
      squadEditorList: this.state.squadEditorList.filter(
        item => item.id !== id,
      ),
    });
  };

  render() {
    return (
      <div className="App">
        <Header />
        <div className="row">
          <Panel className="col" title="Create Hero">
            <NewHeroForm onSubmit={this.newHeroSubmit} />
          </Panel>
          <Panel className="col" title="Heroes">
            <HeroesList
              newHero={this.state.newHero}
              clearHero={this.clearHero}
              heroToSquad={this.heroToSquad}
              heroesInEditor={this.state.squadEditorList}
            />
          </Panel>
          <Panel className="col" title="Squad Editor">
            <SquadEditor
              editorList={this.state.squadEditorList}
              onClear={this.clearSquadEditor}
              onSave={this.saveSquad}
              heroRemove={this.heroFromEditRemove}
            />
          </Panel>
          <Panel className="col" title="Saved squads">
            <SquadList
              squads={this.state.squadsList}
              onRemove={this.squadRemove}
            />
          </Panel>
        </div>
      </div>
    );
  }
}

export default App;
