import React, { Component } from 'react'
import PropTypes from 'prop-types'

import infoButton from'../../assets/img/info.svg';
import tolistButton from'../../assets/img/more.svg';
import removeButton from'../../assets/img/remove.svg';

import './Hero.css'

class Hero extends Component {

  static propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    intelligence: PropTypes.number,
    strength: PropTypes.number,
    speed: PropTypes.number,
    onRemove: PropTypes.func,
    heroToSquad: PropTypes.func,
    inEditor: PropTypes.bool
  }

  static defaultProps = {
    id: 0,
    name: '',
    intelligence: 0,
    strength: 0,
    speed: 0,
    onRemove: null,
    heroToSquad: null,
    inEditor: false
  }

  state = {
    statsAcive: false,
  }

  toggleInfo = () => {
    this.setState({
      statsAcive: !this.state.statsAcive
    })
  }

  HeroStats = () => {
    const { intelligence, strength, speed }  = this.props

    return (
      <div className='hero-stats'>
      <ul>
        <li>strength: {strength}</li>
        <li>Intelligence: {intelligence}</li>
        <li>Speed: {speed}</li>
      </ul>
    </div>
  )}

  render () {
    const { statsAcive } = this.state
    const { name, id, onRemove, heroToSquad, inEditor } = this.props

    return (
      <li>
        <div className="hero-wrap">
          <div className="hero-panel">
            {name}
            <div className="button-group">
              <button onClick={this.toggleInfo}>
                <img src={infoButton} alt='info'/>
              </button>
              { !inEditor
                ?
                <button onClick={heroToSquad({...this.props })}>
                  <img src={tolistButton} alt='to list'/>
                </button>
                : ''
              }
              <button onClick={ inEditor ? onRemove(id) : onRemove }>
                <img src={removeButton} alt='remove'/>
              </button>
            </div>
          </div>
          {statsAcive && <this.HeroStats />}
        </div>
      </li>
    )
  }
}

export default Hero
