import React from 'react'
import PropTypes from 'prop-types'

import removeButton from'../../assets/img/remove.svg';
import './SquadList.css'

function SquadHeroes({heroes}){
  return (
  <div>Squad Heroes
    <ul>
    {
      heroes.map(item => <li key={item.id}>{item.name}</li>)
    }</ul>
  </div>
)}

function SquadStats({str, int, spd}){
  return (
    <div>Squad stats
      <ul>
        <li>Speed: {spd}</li>
        <li>Strengt: {str}</li>
        <li>Inteligence: {int}</li>
      </ul>
    </div>
)}

function SquadList ({squads, onRemove}) {

  return (
    <div className="squad-list">
      <ul>
        {squads.map(item => <li key={item.id}>
          <div className='squad-wrap'>
            <SquadStats {...item.stats} />
            <SquadHeroes heroes={item.heroes} />
            <div className="squad-bottom">
              <button onClick={ onRemove(item.id)}>
                <img src={removeButton} alt='remove'/>
              </button>
            </div>
          </div>
        </li>)}
      </ul>

    </div>
  )
}

SquadList.propTypes = {
  squads: PropTypes.arrayOf(PropTypes.shape({
    heroes: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      strength: PropTypes.number.isRequired,
      intelligence: PropTypes.number.isRequired,
      speed: PropTypes.number.isRequired
    })),
    stats: PropTypes.shape({
      str: PropTypes.number.isRequired,
      int: PropTypes.number.isRequired,
      spd: PropTypes.number.isRequired
    })
  })).isRequired,
  onRemove: PropTypes.func.isRequired
}

SquadHeroes.propTypes = {
  heroes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string
  })).isRequired
}

SquadStats.propTypes = {
  str: PropTypes.number.isRequired,
  spd: PropTypes.number.isRequired,
  int: PropTypes.number.isRequired,
}


export default SquadList
