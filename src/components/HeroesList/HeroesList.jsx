import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Hero from '../Hero/Hero';

import './HeroList.css';

class HeroesList extends Component {
  static propTypes = {
    heroList: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        strength: PropTypes.number,
        inteligense: PropTypes.number,
        speed: PropTypes.number,
      }),
    ),
    searchQuery: PropTypes.string.isRequired,
    removeHero: PropTypes.func.isRequired,
    heroToSquad: PropTypes.func.isRequired,
    handleSearch: PropTypes.func.isRequired,
  };

  static defaultProps = {
    heroList: [],
  };

  render() {
    const { heroList, searchQuery, handleSearch } = this.props;

    return (
      <div className="hero-list">
        <input
          className="hero-search"
          type="text"
          value={searchQuery}
          name="search"
          onChange={handleSearch}
          placeholder="Search by name"
        />
        <ul>
          {heroList.length > 0
            ? heroList.map(item => (
                <Hero
                  {...item}
                  key={item.id}
                  onRemove={this.props.removeHero(item.id)}
                  heroToSquad={this.props.heroToSquad(item.id)}
                />
              ))
            : 'no result ...'}
        </ul>
      </div>
    );
  }
}

export default HeroesList;
