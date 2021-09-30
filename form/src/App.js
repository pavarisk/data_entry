import React, { useState } from 'react'
// import request from 'superagent'
import './App.css'
const apiKey = process.env.REACT_APP_API_KEY

const Airtable = require('airtable')
const base = new Airtable({ apiKey: apiKey }).base('appGoOyAJaaiLpXRD')

function App () {
  const initialState = {
    Name: '',
    'Favourite food': '',
    'Mode of transport': '',
    'Favourite number': 0,
    isCool: false

  }
  // const baseUrl = 'http://localhost:8080/api/v1'
  // const airtableAPI = `https://api.airtable.com/v0/appGoOyAJaaiLpXRD/Test1/?api_key=${apiKey}`
  // const airtableEndPoint = 'https://api.airtable.com/v0/appGoOyAJaaiLpXRD/Test1/'
  // console.log(apiKey)

  const [entry, setEntry] = useState(initialState)

  const [message, setMessage] = useState('')
  const [error, setError] = useState(null)

  // function newEntry (data) {
  //   return request.post(`${airtableAPI}`)
  //     .set({
  //       'Content-type': 'application/json',
  //       accept: 'application/json',
  //       referrer: 'http://airtable.com'
  //     })
  //     .send({ data })
  //     .then(res => {
  //       return res.body
  //     })
  // }

  // function newEntry (data) {
  //   return fetch(airtableEndPoint,
  //     {
  //       method: 'POST',
  //       headers: {
  //         Authorization: `Bearer ${apiKey}`,
  //         'Content-type': 'application/json',
  //         accept: 'application/json'
  //       },
  //       body: data
  //     })
  // }

  function handleChange (e) {
    const { name, value } = e.target
    if (name === 'Favourite number') {
      setEntry(prevState => ({
        ...prevState,
        [name]: Number(value)
      }))
    } else {
      setEntry(prevState => ({
        ...prevState,
        [name]: value
      }))
    }
  }

  function handleClick (e) {
    e.preventDefault()
    setError(null)

    const name = document.getElementById('name').value = ''
    const food = document.getElementById('food').value = ''
    const transport = document.getElementById('transport').value = ''
    const number = document.getElementById('number').value = ''
    const cool = document.getElementById('cool').value = ''
    const clear = () => (name && food && transport && number && cool)

    // const date = Date.now()
    // const dateObj = new Date(date).toLocaleString()

    const newRecord = {
      fields: { ...entry }
    }
    console.log(JSON.stringify(newRecord))

    if (entry !== initialState) {
      // newEntry(record)
      //   .then(res => {
      //     return res
      //   })
      //   .catch(e => {
      //     setError(e.message)
      //   })
      base('Test1').create([newRecord], function (err, records) {
        if (err) {
          setError(err.message)
          return
        }
        records.forEach(function (record) {
          console.log(record.getId())
        })
      })

      if (error === null) {
        setMessage('The form has been submitted')
        setTimeout(() => {
          setMessage('')
        }, 5000)
      }

      return clear()
    } else return setError('Please enter something in the fields')
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
        <input className='pb-2' type='text' name='Name' id='name' placeholder='Enter a name' onChange={handleChange} />
        <label className='pb-2' htmlFor='food'>Favourite Kai</label>
        <input className='pb-2' type='text' name='Favourite food' id='food' placeholder='Enter your favourite food' onChange={handleChange} />
        <label className='pb-2' htmlFor='transport'>Mode of Transport</label>
        <input className='pb-2' type='text' name='Mode of transport' id='transport' placeholder='How do you get around?' onChange={handleChange} />
        <label className='pb-2' htmlFor='number'>Favourite Number</label>
        <input className='pb-2' type='number' name='Favourite number' id='number' placeholder='Enter your favourite number' onChange={handleChange} />
        <label className='pb-2' htmlFor='cool'>Is cool?</label>
        <input className='pb-2' type='checkbox' name='isCool' id='cool' placeholder='Enter your favourite number' onChange={handleChange} />
        <button className='mt-3' onClick={e => handleClick(e)} >Submit</button>
      </form>
      {message && <h3>Message:{message}</h3>}
    </div>
  )
}

export default App
