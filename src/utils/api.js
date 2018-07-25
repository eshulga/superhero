import axios from 'axios'

const handlePromiseError = error => console.log(`Error: ${error}`)

const processApiResponse = ({
  response,
  successCode,
  errorMessage
}) => ({
  data: response.data,
  error: response.status === successCode ? null : errorMessage,
  status: response.status
})

export const getSquadList = () =>
  axios
  .get('/squads')
  .then(response => processApiResponse({
    response,
    successCode: 200,
    errorMessage: 'can`t get SquadList'
  }))
  .catch(handlePromiseError)

export const postSquad = (squad) =>
  axios
  .post('/squads', squad)
  .then(response => processApiResponse({
    response,
    successCode: 201,
    errorMessage: 'can`t post Squad'
  }))
  .catch(handlePromiseError)

export const deleteSquad = (id) =>
  axios
  .delete(`/squads/${id}`)
  .then(response => processApiResponse({
    response,
    successCode: 200,
    errorMessage: 'can`t delete Squad'
  }))
  .catch(handlePromiseError)

export const getHeroList = () =>
  axios
  .get('/heroes')
  .then(response => processApiResponse({
    response,
    successCode: 200,
    errorMessage: 'can`t get HeroList'
  }))
  .catch(handlePromiseError)

export const deleteHero = (id) =>
  axios
  .delete(`/heroes/${id}`)
  .then(response => processApiResponse({
    response,
    successCode: 200,
    errorMessage: 'can`t delete Hero'
  }))
  .catch(handlePromiseError)

export const postHero = (hero) =>
  axios
  .post('/heroes', hero)
  .then(response => processApiResponse({
    response,
    successCode: 200,
    errorMessage: 'can`t pos Hero'
  }))
  .catch(handlePromiseError)
