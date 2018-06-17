import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Hero from '../Hero/Hero'
import { getHeroList, postHero, deleteHero } from '../../utils/api'

import './HeroList.css'

class HeroesList extends Component {

  static propTypes = {
    newHero: PropTypes.shape({
      name: PropTypes.string,
      strength: PropTypes.number,
      inteligense: PropTypes.number,
      speed: PropTypes.number,
    }),
    heroesInEditor: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        strength: PropTypes.number,
        inteligense: PropTypes.number,
        speed: PropTypes.number
      })
    ),
    clearHero: PropTypes.func.isRequired,
    heroToSquad: PropTypes.func.isRequired
  }

  static defaultProps = {
    newHero: {},
    heroesInEditor: [],
  }

  state = {
    list: [],
    searchList: [],
    searchQuery: ''
  }

  componentDidMount () {
    getHeroList()
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
        postHero({...newHero})
          .then( response => {
            this.setState({
              list: [response.data, ...this.state.list]
            })
          })
      this.props.clearHero()
    }
  }

  removeHero = (itemId) => () => {
    deleteHero(itemId)
      .then( () => {
          this.setState({
            list: this.state.list.filter(item => item.id !== itemId)
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

    const { heroesInEditor } = this.props

    const renderList = searchQuery.length > 0 ? searchList : list
    const filteredList = renderList.filter((hero) => {
                                      const heroId = hero.id
                                      const isInList = heroesInEditor.some((item) => item.id === heroId)

                                      return !isInList
                                    })
    return (
      <div className="hero-list">
        <input className="hero-search" type="text" value={this.searchQuery} name="search" onChange={this.handleSearch} placeholder="Search by name"/>
        <ul>
          { filteredList.length > 0 ? filteredList
            .map((item) => <Hero
                              {...item}
                              key={item.id}
                              onRemove={this.removeHero(item.id)}
                              heroToSquad={this.props.heroToSquad}
                            />) : 'no result ...'
          }
        </ul>
      </div>
    )
  }
}

export default HeroesList
