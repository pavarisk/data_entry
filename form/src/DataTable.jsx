import React, { useEffect, useState } from 'react'
import Airtable from 'airtable'

const apiKey = process.env.REACT_APP_API_KEY
const base = new Airtable({ apiKey: apiKey }).base('appGoOyAJaaiLpXRD')

function DataTable (props) {
  const [data, setData] = useState([])

  useEffect(() => {
    base('Test1').select({
      // Selecting the first 3 records in Grid view:
      maxRecords: 100,
      view: 'Grid view',
      sort: [{ field: 'Status', direction: 'asc' }]
    }).eachPage(function page (records, fetchNextPage) {
      // This function (`page`) will get called for each page of records.
      setData(records)
      // records.forEach(function (record) {
      //   console.log('Retrieved', record.get('Name'))
      // })

      // To fetch the next page of records, call `fetchNextPage`.
      // If there are more records, `page` will get called again.
      // If there are no more records, `done` will get called.
      // fetchNextPage()
    }, function done (err) {
      if (err) { console.error(err) }
    })
  }, [])

  async function handleEdit (id, e) {
    e.preventDefault()
    await base('Test1').find(id, function (err, record) {
      if (err) { console.error(err); return }
      props.history.push({ pathname: '/form', param: record.fields })
      // console.log('Retrieved', record.fields)
    })
  }

  return (
    <div className='min-vh-100 d-flex flex-column justify-contents-start p-4 col-11 bg-dark text-white'>
      <table className='table table-hover table-dark'>
        <thead>
          <tr>
            <th scope='col'>#</th>
            <th scope='col'>Demands</th>
            <th scope='col'>Themes</th>
            <th scope='col'>Notes</th>
            <th scope='col'>Status</th>
            <th scope='col'>Start</th>
            <th scope='col'>End</th>
          </tr>
        </thead>
        <tbody>
          {data.map((record, i) => (
            <tr key={record.id} onClick={e => handleEdit(record.id, e)}>
              <th scope='row'>{i + 1}</th>
              <td>{record.fields.Demands}</td>
              <td>{record.fields.Themes}</td>
              <td>{record.fields.Notes}</td>
              <td>{record.fields.Status}</td>
              <td>{record.fields.Start}</td>
              <td>{record.fields.End}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default DataTable
