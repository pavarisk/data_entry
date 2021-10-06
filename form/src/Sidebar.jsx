import React from 'react'

function Sidebar () {
  return (
    <div className='min-vh-100 d-flex flex-column col-1 align-items-center p-4 bg-dark text-info'>
      <a href="/" className='p-3'>Home</a>
      <a href='/#/table' className='p-3'>Table</a>
      <a href='/#/form' className='p-3'>Form</a>
    </div>
  )
}

export default Sidebar
