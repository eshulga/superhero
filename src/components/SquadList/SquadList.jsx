import React from 'react'
import PropTypes from 'prop-types'

function SquadList ({squads}) {

  return (
    <div className="squad-list">
      <ul>
        {squads.map(item => <li key={item.id}>{item.heroes}{item.stats}</li>)}
      </ul>
    </div>
  )
}

SquadList.propTypes = {
  squads: PropTypes.arrayOf(PropTypes.shape({
    heroes: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      strengt: PropTypes.number.isRequired,
      intelligence: PropTypes.number.isRequired,
      speed: PropTypes.number.isRequired
    })),
    stats: PropTypes.arrayOf(PropTypes.shape({
      str: PropTypes.number.isRequired,
      int: PropTypes.number.isRequired,
      spd: PropTypes.number.isRequired
    }))
  })).isRequired
}


export default SquadList
