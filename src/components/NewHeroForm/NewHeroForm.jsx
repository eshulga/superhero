import React, {Component} from 'react'
import './NewHeroForm.css'

class NewHeroForm extends Component {

  state = {
    name: '',
    strenght: 0,
    inteligence: 0,
    speed: 0
  }

  selectNum = ({name = '', max = 10}) => {

    const options = []

    for( let i = 1; i <= max; i+=1) {
      options.push(<option key={i} value={i}>{i}</option>)
    }

    return (
      <div className="input-group">
        <span>{name}</span>
        <select name={name} defaultValue={1}>
          {options}
        </select>
      </div>
    )
  }

  render () {

    return (
      <div className='form-wrapper'>
        <form action='#'>
          <input type='text' name='name' placeholder='New hero name'/>
          {this.selectNum({name: 'strenght'})}
          {this.selectNum({name: 'inteligence'})}
          {this.selectNum({name: 'speed'})}
          <button type='submit'>Create</button>
        </form>
      </div>
    )
  }
}

export default NewHeroForm


