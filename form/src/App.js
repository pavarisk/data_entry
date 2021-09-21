import React, {useState} from 'react'
import request from 'superagent'
import './App.css';

function App() {
  const baseUrl = 'http://localhost:8080/api/v1'
  const [name, setName] = useState(null)
  const [value, setValue] = useState(null)

  const input = document.querySelectorAll('input')

  // const [entry, setEntry] = useState({
  //   name: '',
  //   value: 0
  // })

  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  function resetField(input) {
    for (var i = 0; i < input.length; i++) {
      input[i].value = ''
    }
    return
  }


  function newEntry (data) {
    return request.post(`${baseUrl}/data`)
      .send({data})
      .then( res => res.body)
  }

  function handleName(e) {
    return setName(e.target.value)
  }

  function handleValue(e) {
    return setValue(e.target.value)
  }
  // function handleChange (e) {
  //   const value = e.target.value
  //   const name = e.target.name
  //   setEntry({
  //     ...entry,
  //     [name]: value
  //   })
  // }



  function handleClick (name, value, input, e) {
    e.preventDefault()
    setError('')
    const entry = {name, value}
    return newEntry(entry)
      .then(res => {
        if (res.status === 200) {
          setMessage('The form has been submitted')
          setTimeout(()=> {
            setMessage('')
          }, 3000)
          return resetField()
        }
      })
      .catch(e => {
        setError(e.message)
      })
  }
  return (
    <div className="App min-vh-100">
      {error && <h3 style={{color: 'red'}}>{error}</h3>}
      <form className='d-flex flex-column justify-contents-start p-4 bg-dark text-white'>
        <label className='pb-2' htmlFor='name'>Name</label>
        <input className='pb-2' type='text' name='name' id='name' placeholder='Enter a name of less than 8 characters' onChange={e => handleName(e)} />
        <label className='pb-2' htmlFor='value'>Value</label>
        <input className='pb-2' type='number' name='value' id='value' placeholder='Enter value between 0 and 99' onChange={e => handleValue(e)} />
        <button className='mt-3' onClick={e => handleClick(name, value, input, e)} >Submit</button>
      </form>
      {message && <h3>{message}</h3>}
    </div>
  );
}

export default App;
