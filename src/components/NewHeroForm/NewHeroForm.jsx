import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './NewHeroForm.css';

class NewHeroForm extends Component {
  static propTypes = {
    onSubmit: PropTypes.func,
  };

  static defaultProps = {
    onSubmit: () => null,
  };

  state = {
    name: '',
    strength: 1,
    intelligence: 1,
    speed: 1,
  };

  handleSelect = e => {
    const { target } = e;
    this.setState({
      [target.name]: parseInt(target.value, 10),
    });
  };

  handleInput = e => {
    const { target } = e;
    this.setState({
      [target.name]: target.value,
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    const { name } = this.state;
    if (name !== '') {
      this.props.onSubmit({ ...this.state });
    }
  };

  selectNum = ({ name = '', max = 10 }) => {
    const options = [];

    for (let i = 1; i <= max; i += 1) {
      options.push(
        <option key={i} value={i}>
          {i}
        </option>,
      );
    }

    return (
      <div className="input-group">
        <span>{name}</span>
        <select
          onChange={this.handleSelect}
          name={name}
          value={this.state[name]}>
          {options}
        </select>
      </div>
    );
  };

  render() {
    return (
      <div className="form-wrapper">
        <form action="#" onSubmit={this.handleFormSubmit}>
          <input
            onChange={this.handleInput}
            type="text"
            name="name"
            value={this.state.name}
            placeholder="New hero name"
          />
          {this.selectNum({ name: 'strength' })}
          {this.selectNum({ name: 'intelligence' })}
          {this.selectNum({ name: 'speed' })}
          <button type="submit">Create</button>
        </form>
      </div>
    );
  }
}

export default NewHeroForm;
