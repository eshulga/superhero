import React, {Component} from 'react'
import axios from 'axios'
import Hero from './components/Hero'

import './HeroList.css'

class HeroesList extends Component {

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

    const renderResult = searchQuery.length > 0 ? searchList : list

    return (
      <div className="hero-list">
        <input className="hero-search" type="text" value={this.searchQuery} name="search" onChange={this.handleSearch} placeholder="Search by name"/>
        <ul>
          {renderResult.map((item) => <Hero {...item} key={item.id}/>)}
        </ul>
      </div>
    )
  }
}

export default HeroesList
