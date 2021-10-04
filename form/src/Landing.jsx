import React, { useState } from 'react'
import { connect } from 'react-redux'
import { setUser as setUSER } from './actions/user'

const users = [
  {
    name: 'Bomb',
    PIN: '1234'
  },
  {
    name: 'Andrew',
    PIN: '6969'
  }
]

const initialState = { name: '', PIN: '' }

function Landing (props) {
  const [user, setUser] = useState(initialState)
  const { dispatch } = props

  function clearFields () {
    const name = document.getElementById('navName').value = ''
    const PIN = document.getElementById('navPin').value = ''
    return name && PIN
  }

  function handleChange (e) {
    e.preventDefault()
    const { name, value } = e.target
    user[name] = value
  }

  function handleSubmit (e) {
    e.preventDefault()
    console.log('Button Clicked')
    if (users.find((u) => u.name === user.name)) {
      const index = users.findIndex((u) => u.name === user.name)
      if (users[index].PIN === user.PIN) {
        console.log('Submitted', user)
        dispatch(setUSER(user))
        clearFields()
      } else {
        clearFields()
        alert('PIN Does not match the Name')
      }
    } else {
      setUser(initialState)
      clearFields()
      return alert('User does not exist')
    }
  }

  return (
    <div className='d-flex flex-column align-items-center w-100 bg-dark text-white p-4'>
      <div>
        <label htmlFor="name">Navigators Name:</label><br/>
        <input type="text" name='name' id='navName' onChange={handleChange} />
      </div>
      <div className='pt-4'>
        <label htmlFor="PIN">PIN:</label><br/>
        <input type="password" name='PIN' id='navPin' onChange={handleChange} />
      </div>
      <div className='pt-4'>
        <input type="submit" onClick={handleSubmit} />
      </div>
    </div>
  )
}

function mapStateToProps (state) {
  console.log(state)
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(Landing)
