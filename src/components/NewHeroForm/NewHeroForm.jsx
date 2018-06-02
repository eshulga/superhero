import React, {Component} from 'react'

class NewHeroForm extends Component {

  state = {
    name: '',
    strenght: 0,
    inteligence: 0,
    speed: 0
  }

  selectNum = ({name = '', max = 10}) => {

    const options = []

    for( let i = 0; i < max; i+=1) {
      options.push(`<option value='${i}'>${i}</option>`)
    }

    return (
      <select name={name}>
        <option disabled>{name}</option>
        {options}
      </select>
    )
  }

  render () {

    return (
      <div className="form-wrapper">
        <form action="#">
          <input type="text" name="name"/>
          {this.selectNum({name: 'strenght'})}
          {this.selectNum({name: 'inteligence'})}
          {this.selectNum({name: 'speed'})}
          <button type='submit'>Add</button>
        </form>
      </div>
    )
  }
}

export default NewHeroForm


