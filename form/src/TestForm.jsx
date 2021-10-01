import React, { useState, useEffect } from 'react'
const apiKey = process.env.REACT_APP_API_KEY

const Airtable = require('airtable')
const base = new Airtable({ apiKey: apiKey }).base('appGoOyAJaaiLpXRD')

const initialState = {
  Name: '',
  'Favourite food': '',
  'Mode of transport': '',
  'Favourite number': 0,
  isCool: false
}

function TestForm (props) {
  const [edit, setEdit] = useState(false)
  const [entry, setEntry] = useState(initialState)
  const [message, setMessage] = useState('')
  const [error, setError] = useState(null)

  useEffect(async () => {
    if (props.location.params !== null) {
      setEdit(true)
      const editObj = props.location.param
      await setEntry(editObj)
      return console.log('entry', entry, 'editObj', editObj, 'edit', edit)
    } else {
      setEdit(false)
    }
  }, [])

  // const airtableEndPoint = 'https://api.airtable.com/v0/appGoOyAJaaiLpXRD/Test1/'

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

  function setTrue (e) {
    e.preventDefault()
    entry.isCool = true
    return entry
  }

  function setFalse (e) {
    e.preventDefault()
    entry.isCool = false
    return entry
  }

  function handleClick (e) {
    e.preventDefault()
    setError(null)

    const name = document.getElementById('name').value = ''
    const food = document.getElementById('food').value = ''
    const transport = document.getElementById('transport').value = ''
    const number = document.getElementById('number').value = ''
    // const cool = document.getElementById('cool').value = ''
    const clear = () => (name && food && transport && number)

    const date = Date.now()
    const dateObj = new Date(date)

    const newRecord = {
      fields: { ...entry, Modified: dateObj }
    }

    console.log(JSON.stringify(newRecord))

    if (entry !== initialState) {
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

  console.log(entry)

  return (
    <div className="App min-vh-100 d-flex flex-column justify-contents-start p-4 col-11 bg-dark text-white">
      {error && <>
        <h3 style={{ color: 'red' }}>Error:</h3><br/>
        <p>{error}</p>
      </>
      }
      <form className='d-flex flex-column justify-contents-start p-4 bg-dark text-white'>
        <label className='pb-2' htmlFor='name'>Name</label>
        <input className='pb-2' type='text' name='Name' id='name' placeholder='Enter a name' value={entry.Name} onChange={handleChange} />
        <label className='pb-2' htmlFor='food'>Favourite Kai</label>
        <input className='pb-2' type='text' name='Favourite food' id='food' placeholder='Enter your favourite food' value={entry['Favourite food']} onChange={handleChange} />
        <label className='pb-2' htmlFor='transport'>Mode of Transport</label>
        <input className='pb-2' type='text' name='Mode of transport' id='transport' placeholder='How do you get around?' value={entry['Mode of transport']} onChange={handleChange} />
        <label className='pb-2' htmlFor='number'>Favourite Number</label>
        <input className='pb-2' type='number' name='Favourite number' id='number' placeholder='Enter your favourite number' value={entry['Favourite number']} onChange={handleChange} />
        <div>
          <label className='p-2' htmlFor='cool'>Is cool?</label>
          <button onClick={setTrue}>True</button><button onClick={setFalse}>False</button>
        </div>
        {edit ? <button className='mt-3'>Update</button> : <button className='mt-3' onClick={e => handleClick(e)} >Submit</button>}
      </form>
      {message && <h3>Message:{message}</h3>}
    </div>
  )
}

export default TestForm
