import { GET_DATA } from '../actions/data'

const initialState = []

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DATA:
      console.log(action.data)
      return state
    default:
      return state
  }
}

export default reducer
