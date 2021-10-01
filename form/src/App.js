import React from 'react'
import './App.css'
import Sidebar from './Sidebar'
import TestForm from './TestForm'
import DataTable from './DataTable'
import { Route } from 'react-router-dom'

function App () {
  return (
    <div className='d-flex justify-content-center'>
      <Route path='/' component={Sidebar}/>
      <Route path='/table' component={DataTable}/>
      <Route exact path='/form' component={TestForm}/>
    </div>
  )
}

export default App
