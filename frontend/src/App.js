
import nameService from './services/names'
import React, { useState, useEffect } from 'react';
import './Styles.css';
import NameList from './components/NameList'
import { Spinner } from 'reactstrap';



const App = () => {
  const [names, setNames] = useState('')

  useEffect(() => {
    nameService
      .getAll()
      .then(res => {
        setNames(res.data.names)
      })
  }, [])

  if  (!names) {
    return (
      <Spinner size="sm" color="primary" />
    )
  }

  return (
    <div>
    <NameList names={names} />      
    </div>
  )

}

export default App;
