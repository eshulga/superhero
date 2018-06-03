import React, {Component} from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import Hero from './components/Hero'

import './HeroList.css'

class HeroesList extends Component {

  static propTypes = {
    newHero: PropTypes.shape({
      name: PropTypes.string,
      strenght: PropTypes.number,
      inteligense: PropTypes.number,
      speed: PropTypes.number
    })
  }

  static defaultProps = {
    newHero: {}
  }

  state = {
    list: [],
    searchList: [],
    searchQuery: ''
  }

  componentDidMount () {
    axios
      .get('http://localhost:3001/heroes')
      .then( result => {
        this.setState({
          list: result.data
        })
      })
  }

  componentDidUpdate () {
    this.newHero(this.props.newHero)
  }

  newHero = ( newHero ) => {
    if(Object.keys(newHero).length !== 0){
      const heroExist = this.state.list.filter( item => item.name === newHero.name )

      if (heroExist.length === 0)
        axios
          .post('http://localhost:3001/heroes', {...newHero})
          .then( response => {
            if(response.status === 201){
              this.setState({
                list: [response.data, ...this.state.list]
              })
            }
          })
    }
  }

  handleSearch = (e) => {
    const { target } = e
    const { list } = this.state

    const filteredList = list.filter(item => item.name.toLowerCase().indexOf(target.value.toLowerCase()) > -1)
    this.setState({
      searchList: filteredList,
      searchQuery: target.value,
    })
  }

  render () {
    const { list, searchList, searchQuery } = this.state

    const renderList = searchQuery.length > 0 ? searchList : list

    return (
      <div className="hero-list">
        <input className="hero-search" type="text" value={this.searchQuery} name="search" onChange={this.handleSearch} placeholder="Search by name"/>
        <ul>
          {renderList.map((item) => <Hero {...item} key={item.id}/>)}
        </ul>
      </div>
    )
  }
}

export default HeroesList
