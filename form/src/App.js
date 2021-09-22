import React, { useState } from 'react'
import request from 'superagent'
import './App.css'

function App () {
  const initialState = {
    name: '',
    value: 0
  }
  const baseUrl = 'http://localhost:8080/api/v1'

  const [entry, setEntry] = useState(initialState)

  const [message, setMessage] = useState('')
  const [error, setError] = useState(null)

  function newEntry (data) {
    return request.post(`${baseUrl}/data`)
      .send({ data })
      .then(res => {
        return res.body
      })
  }

  function handleChange (e) {
    const { name, value } = e.target
    setEntry({
      ...entry,
      [name]: value
    })
  }

  function handleClick (e) {
    e.preventDefault()
    setError(null)
    if (entry !== initialState) {
      newEntry(entry)
        .then(res => {
          return res
        })
        .catch(e => {
          setError(e.message)
        })
      if (error === null) {
        setMessage('The form has been submitted')
        setTimeout(() => {
          setMessage('')
        }, 5000)
      }
      const name = document.getElementById('name').value = ''
      const value = document.getElementById('value').value = ''
      const clear = name && value

      return clear
    } else return setError('Please enter a name and any value between 0 and 99')
  }

  return (
    <div className="App min-vh-100d-flex flex-column justify-contents-start p-4 bg-dark text-white">
      {error && <>
        <h3 style={{ color: 'red' }}>Error:</h3><br/>
        <p>{error}</p>
      </>
      }
      <form className='d-flex flex-column justify-contents-start p-4 bg-dark text-white'>
        <label className='pb-2' htmlFor='name'>Name</label>
        <input className='pb-2' type='text' name='name' id='name' placeholder='Enter a name of less than 8 characters' onChange={handleChange} />
        <label className='pb-2' htmlFor='value'>Value</label>
        <input className='pb-2' type='number' name='value' id='value' placeholder='Enter value between 0 and 99' onChange={handleChange} />
        <button className='mt-3' onClick={e => handleClick(e)} >Submit</button>
      </form>
      {message && <h3>Message:{message}</h3>}
    </div>
  )
}

export default App
