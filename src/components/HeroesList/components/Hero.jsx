import React, { Component } from 'react'
import PropTypes from 'prop-types'

import infoButton from'../../../assets/img/info.svg';
import tolistButton from'../../../assets/img/more.svg';
import removeButton from'../../../assets/img/remove.svg';

import './Hero.css'

class Hero extends Component {

  static propTypes = {
    name: PropTypes.string.isRequired,
    intelligence: PropTypes.number,
    strenght: PropTypes.number,
    speed: PropTypes.number,
    onRemove: PropTypes.func
  }

  static defaultProps = {
    name: '',
    intelligence: 0,
    strenght: 0,
    speed: 0,
    onRemove: null
  }

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

  HeroStats = () => {
    const { intelligence, strenght, speed }  = this.state

    return (
      <div className='hero-stats'>
      <ul>
        <li>Strenght: {strenght}</li>
        <li>Intelligence: {intelligence}</li>
        <li>Speed: {speed}</li>
      </ul>
    </div>
  )}

  render () {
    const { name, statsAcive } = this.state
    const { onRemove } = this.props

    return (
      <li>
        <div className="hero-wrap">
          <div className="hero-panel">
            {name}
            <div className="button-group">
              <button onClick={this.toggleInfo}><img src={infoButton} alt='info'/></button>
              <button onClick={this.toggleInfo}><img src={tolistButton} alt='to list'/></button>
              <button onClick={onRemove}><img src={removeButton} alt='remove'/></button>
            </div>
          </div>
          {statsAcive && <this.HeroStats />}
        </div>
      </li>
    )
  }
}

export default Hero
