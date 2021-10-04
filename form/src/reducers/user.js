import { SET_USER } from '../actions/user'

const initialState = {}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      console.log(action.user)
      return state
    default:
      return state
  }
}

export default reducer
