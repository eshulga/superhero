import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Hero from '../Hero/Hero'

import './SquadEditor.css'

class SquadEditor extends Component {

  static propTypes = {
    editorList: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        strength: PropTypes.number,
        intelligence: PropTypes.number,
        speed: PropTypes.number
      })
    ).isRequired,
    onClear: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    heroRemove: PropTypes.func,
  }

  static defaultProps = {
    heroRemove: () => null
  }

  state = {
    strengthTotal: 0,
    speedTotal: 0,
    intelligenceTotal: 0
  }

  static getDerivedStateFromProps ( nextProps ) {

    const { editorList } = nextProps
    let returnResult

    const newState = {
      strengthTotal: 0,
      speedTotal: 0,
      intelligenceTotal: 0,
    }

    if ( !editorList.length ) {
      returnResult = newState
    } else {

      editorList.forEach( item => {
        newState.strengthTotal += item.strength
        newState.speedTotal += item.speed
        newState.intelligenceTotal += item.intelligence
      });

      returnResult = newState
    }

    return returnResult
  }

  render () {

    const { strengthTotal, speedTotal, intelligenceTotal} = this.state
    const { editorList, onClear, onSave, heroRemove } = this.props

    return (
      <div className='squad-editor'>
        <div className="controls">
          <button onClick={onSave({
            str: strengthTotal,
            spd: speedTotal,
            int: intelligenceTotal
          })}>save</button>
          <button onClick={onClear}>reset</button>
        </div>
        <div className="squad-stats">
          <span>strength: {strengthTotal}</span>
          <span>Speed: {speedTotal}</span>
          <span>Intelligence: {intelligenceTotal}</span>
        </div>
        <div className="squad-list">
          <ul>
            {
              editorList.map((item) => <Hero
                                          key={item.id}
                                          {...item}
                                          onRemove={heroRemove}
                                          inEditor
                                        />)
            }
          </ul>
        </div>
      </div>
    )
  }
}

export default SquadEditor
