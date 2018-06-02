import React, { Component } from 'react'
import PropTypes from 'prop-types'
import infoButton from'../../../assets/img/info.svg';
import tolistButton from'../../../assets/img/more.svg';
import removeButton from'../../../assets/img/remove.svg';

import './Hero.css'

class Hero extends Component {

  state = {
    name: this.props.name,
    intelligence: this.props.intelligence,
    strenght: this.props.strenght,
    speed: this.props.speed,
    statsAcive: false
  }

  toggleInfo = () => {
    this.setState({
      statsAcive: !this.state.statsAcive
    })
  }

  render () {

    const { name, intelligence, strenght, speed, statsAcive } = this.state

    return (
      <li>
        <div className="hero-wrap">
          <div className="hero-panel">
            {name}
            <div className="button-group">
              <button onClick={this.toggleInfo}><img src={infoButton} alt='info'/></button>
              <button onClick={this.toggleInfo}><img src={tolistButton} alt='to list'/></button>
              <button onClick={this.toggleInfo}><img src={removeButton} alt='remove'/></button>
            </div>
          </div>
          <div className={['hero-stats', statsAcive ? 'active' : ''].join(' ')}>
            <ul>
              <li>Intelligence: {intelligence}</li>
              <li>Strenght: {strenght}</li>
              <li>Speed: {speed}</li>
            </ul>
          </div>
        </div>
      </li>
    )
  }
}

Hero.propTypes = {
  name: PropTypes.string.isRequired,
  intelligence: PropTypes.number,
  strenght: PropTypes.number,
  speed: PropTypes.number
}

Hero.defaultProps = {
  name: '',
  intelligence: 0,
  strenght: 0,
  speed: 0
}

export default Hero
