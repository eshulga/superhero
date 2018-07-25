import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Hero from '../Hero/Hero';

import './SquadEditor.css';

class SquadEditor extends Component {
  static propTypes = {
    editorList: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        strength: PropTypes.number,
        intelligence: PropTypes.number,
        speed: PropTypes.number,
      }),
    ).isRequired,
    onClear: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    heroRemove: PropTypes.func.isRequired,
  };

  totalStat = stat => {
    const { editorList } = this.props;
    let total = 0;
    editorList.forEach(item => {
      total += item[stat];
    });

    return total;
  };

  render() {
    const { editorList, onClear, onSave, heroRemove } = this.props;

    return (
      <div className="squad-editor">
        <div className="controls">
          <button onClick={onSave}>save</button>
          <button onClick={onClear}>reset</button>
        </div>
        <div className="squad-stats">
          <span>Strength: {this.totalStat('strength')}</span>
          <span>
            Speed: {this.totalStat('speed')}
          </span>
          <span>
            Intelligence: {this.totalStat('intelligence')}
          </span>
        </div>
        <div className="squad-list">
          <ul>
            {editorList.map(item => (
              <Hero key={item.id} {...item} onRemove={heroRemove} inEditor />
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default SquadEditor;
