import React, {useState} from 'react'
import request from 'superagent'
import './App.css';

function App() {
  const baseUrl = 'http://localhost:8080/api/v1'
  const [entry, setEntry] = useState({
    name: '',
    value: 0
  })

  function newEntry (data) {
    return request.post(`${baseUrl}/data`)
      .send({data})
      .then( res => res.body)
  }

  function handleChange (e) {
    console.log(e.target.name, e.target.value)
    const value = e.target.value
    const name = e.target.name
    setEntry({
      ...entry,
      [name]: value
    })
  }

  function handleClick (e) {
    e.preventDefault()
    newEntry(entry)
      .then(res => console.log(res))
      .catch(e => console.log(e.message))
    return setEntry({
      name: '',
      value: 0
    })
  }
  return (
    <div className="App min-vh-100">
      <form className='d-flex flex-column justify-contents-start p-4 bg-dark text-white'>
        <label className='pb-2' htmlFor='name'>Name</label>
        <input className='pb-2' type='text' name='name' placeholder='Enter a name of less than 8 characters' onChange={e => handleChange(e)} />
        <label className='pb-2' htmlFor='value'>Value</label>
        <input className='pb-2' type='number' name='value' placeholder='Enter value between 0 and 99' onChange={e => handleChange(e)} />
        <button className='mt-3' onClick={handleClick} >Submit</button>
      </form>
    </div>
  );
}

export default App;
