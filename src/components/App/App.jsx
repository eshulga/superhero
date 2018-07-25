import React, { Component } from 'react';

import Header from '../Header/Header';
import Panel from '../../common/Panel';
import HeroesList from '../HeroesList/HeroesList';
import NewHeroForm from '../NewHeroForm/NewHeroForm';
import SquadEditor from '../SquadEditor/SquadEditor';
import SquadList from '../SquadList/SquadList';
import * as API from '../../utils/api';

import './App.css';

class App extends Component {
  state = {
    squadEditorList: [],
    squadsList: [],
    heroList: [],
    searchList: [],
    searchQuery: '',
  };

  componentDidMount() {
    API.getHeroList().then(result => {
      this.setState({
        heroList: result.data,
      });
    });

    API.getSquadList().then(result => {
      this.setState({
        squadsList: [...result.data],
      });
    });
  }

  clearSquadEditor = () => {
    this.setState({
      squadEditorList: [],
    });
  };

  heroToSquad = id => () => {
    this.setState(prevState => ({
      squadEditorList: [id, ...prevState.squadEditorList],
    }));
  };

  removeFromSquadEditorList = id => () => {
    this.setState(prevState => ({
      squadEditorList: prevState.squadEditorList.filter(item => item !== id),
    }));
  };

  saveSquad = () => {
    const { squadEditorList, heroList } = this.state;

    const totalStat = stat => {
      let total = 0;

      squadEditorList.forEach(id => {
        const hero = heroList.find(item => item.id === id);
        total += hero[stat];
      });

      return total;
    };

    if (squadEditorList && squadEditorList.length > 0) {
      const squad = {
        heroes: squadEditorList.map(id =>
          heroList.find(item => item.id === id),
        ),
        stats: {
          str: totalStat('strength'),
          spd: totalStat('speed'),
          int: totalStat('intelligence'),
        },
      };

      API.postSquad({ ...squad }).then(response => {
        if (response.status === 201) {
          this.setState(prevState => ({
            squadsList: [response.data, ...prevState.squadsList],
            squadEditorList: [],
          }));
        }
      });
    }
  };

  squadRemove = id => () => {
    API.deleteSquad(id).then(() => {
      this.setState(prevState => ({
        squadsList: prevState.squadsList.filter(item => item.id !== id),
      }));
    });
  };

  newHeroSubmit = newHero => {
    if (Object.keys(newHero).length !== 0) {
      const heroExist = this.state.heroList.filter(
        item => item.name === newHero.name,
      );

      if (heroExist.length === 0)
        API.postHero({ ...newHero }).then(response => {
          this.setState(prevState => ({
            heroList: [response.data, ...prevState.heroList],
          }));
        });
    }
  };

  removeHero = itemId => () => {
    API.deleteHero(itemId).then(() => {
      this.setState(prevState => ({
        heroList: prevState.heroList.filter(item => item.id !== itemId),
      }));
    });
  };

  handleSearch = e => {
    const { target } = e;

    this.setState({
      searchQuery: target.value.toLowerCase(),
    });
  };

  render() {
    const { squadEditorList, squadsList, heroList, searchQuery } = this.state;

    const editorList = heroList.filter(item =>
      squadEditorList.includes(item.id),
    );
    const heroListPrepare = heroList
      .filter(item => !squadEditorList.includes(item.id))
      .filter(item => item.name.toLowerCase().indexOf(searchQuery) > -1);

    return (
      <div className="App">
        <Header />
        <div className="row">
          <Panel className="col" title="Create Hero">
            <NewHeroForm onSubmit={this.newHeroSubmit} />
          </Panel>
          <Panel className="col" title="Heroes">
            <HeroesList
              heroList={heroListPrepare}
              searchQuery={searchQuery}
              removeHero={this.removeHero}
              heroToSquad={this.heroToSquad}
              handleSearch={this.handleSearch}
            />
          </Panel>
          <Panel className="col" title="Squad Editor">
            <SquadEditor
              editorList={editorList}
              onClear={this.clearSquadEditor}
              onSave={this.saveSquad}
              heroRemove={this.removeFromSquadEditorList}
            />
          </Panel>
          <Panel className="col" title="Saved squads">
            <SquadList squads={squadsList} onRemove={this.squadRemove} />
          </Panel>
        </div>
      </div>
    );
  }
}

export default App;
