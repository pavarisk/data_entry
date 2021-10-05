import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
const apiKey = process.env.REACT_APP_API_KEY

const Airtable = require('airtable')
const base = new Airtable({ apiKey: apiKey }).base('appGoOyAJaaiLpXRD')

const initialState = {
  Demands: '',
  Themes: '',
  Notes: '',
  Status: '',
  Start: null,
  End: null
}

function TestForm (props) {
  const [edit, setEdit] = useState(false)
  const [entry, setEntry] = useState(initialState)
  const [message, setMessage] = useState('')
  const [error, setError] = useState(null)

  useEffect(async () => {
    if (props.location.params !== undefined) {
      setEdit(true)
      const editObj = props.location.param
      await setEntry(editObj)
      return console.log('entry', entry, 'editObj', editObj, 'edit', edit)
    } else if (props.location.params === undefined) {
      setEdit(false)
      setEntry(initialState)
    }
  }, [])

  // const airtableEndPoint = 'https://api.airtable.com/v0/appGoOyAJaaiLpXRD/Test1/'

  function handleChange (e) {
    const { name, value } = e.target
    setEntry(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  function handleClick (e) {
    e.preventDefault()
    setError(null)

    const Demands = document.getElementById('Demands').value = ''
    const Notes = document.getElementById('Notes').value = ''
    const Start = document.getElementById('Start').value = ''
    const End = document.getElementById('End').value = ''
    const clear = () => (Demands && Notes && Start && End)

    const newRecord = {
      fields: { ...entry }
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

  return (
    <div className="App min-vh-100 d-flex flex-column justify-contents-start p-4 col-11 bg-dark text-white">
      {props.user && <h3>Welcome {props.user.name}</h3>}
      {error && <>
        <h3 style={{ color: 'red' }}>Error:</h3><br/>
        <p>{error}</p>
      </>
      }
      <form className='d-flex flex-column justify-contents-start p-4 bg-dark text-white'>
        <label className='pb-2' htmlFor='Demands'>Demands</label>
        <input className='pb-2' type='text' name='Demands' id='Demands' placeholder='Enter a Demands' value={entry.Demands} onChange={handleChange} />
        <label className='pb-2' htmlFor='Themes'>Themes</label>
        <select className='pb-2' name='Themes' id='Themes' placeholder='Themes' onChange={handleChange} >
          <option value="Health">Health</option>
          <option value="Housing">Housing</option>
          <option value="Education">Education</option>
        </select>
        <label className='pb-2' htmlFor='Notes'>Notes</label>
        <input className='pb-2' type='Notes' name='Notes' id='Notes' placeholder='Notes' value={entry.Notes} onChange={handleChange} />
        <label className='pb-2' htmlFor='Status'>Status</label>
        <select className='pb-2' name='Status' id='Status' placeholder='Status' onChange={handleChange} >
          <option value="Initial Demands">Initial Demands</option>
          <option value="On Going">On Going</option>
          <option value="Completed">Completed</option>
        </select>
        <label className='pb-2' htmlFor="Start">Start Date</label>
        <input className='pb-2' type="date" name='Start' id='Start' onChange={handleChange} />
        <label className='pb-2' htmlFor="End">End Date</label>
        <input className='pb-2' type="date" name='End' id='End' onChange={handleChange} />
        {edit ? <button className='mt-3'>Update</button> : <button className='mt-3' onClick={e => handleClick(e)} >Submit</button>}
      </form>
      {message && <h3>Message:{message}</h3>}
    </div>
  )
}

function mapStateToProps (state) {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(TestForm)
