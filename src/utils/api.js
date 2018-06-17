import axios from 'axios'

const handlePromiseError = error => console.log(`Error: ${error}`)

const processApiResponse = ({ response, successCode, errorMessage }) => ({
    data: response.data,
    error: response.status === successCode ? null : errorMessage,
    status: response.status
})

export const getSquadList = () =>
  axios
    .get('http://localhost:3001/squads')
    .then(response => processApiResponse({
      response,
      successCode: 200,
      errorMessage: 'can`t get SquadList'
    }))
    .catch(handlePromiseError)

export const postSquad = (squad) =>
  axios
    .post('http://localhost:3001/squads', squad)
    .then(response => processApiResponse({
      response,
      successCode: 201,
      errorMessage: 'can`t get SquadList'
    }))
    .catch(handlePromiseError)

export const deleteSquad = (id) =>
  axios
    .delete(`http://localhost:3001/squads/${id}`)
    .then(response => processApiResponse({
      response,
      successCode: 200,
      errorMessage: 'can`t get SquadList'
    }))
    .catch(handlePromiseError)

export const getHeroList = () =>
    axios
      .get('http://localhost:3001/heroes')
      .then(response => processApiResponse({
        response,
        successCode: 200,
        errorMessage: 'can`t get SquadList'
      }))
      .catch(handlePromiseError)

export const deleteHero = (id) =>
    axios
      .delete(`http://localhost:3001/heroes/${id}`)
      .then(response => processApiResponse({
        response,
        successCode: 200,
        errorMessage: 'can`t get SquadList'
      }))
      .catch(handlePromiseError)

export const postHero = (hero) =>
    axios
    .post('http://localhost:3001/heroes', hero)
      .then(response => processApiResponse({
        response,
        successCode: 200,
        errorMessage: 'can`t get SquadList'
      }))
      .catch(handlePromiseError)
