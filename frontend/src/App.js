import React, { useState, useEffect } from 'react';
import { Spinner } from 'reactstrap';
import nameService from './services/names';
import './Styles.css';
import NameList from './components/NameList';

const App = () => {
  const [names, setNames] = useState('');

  useEffect(() => {
    nameService
      .getAll()
      .then((res) => {
        setNames(res.data.names);
      });
  }, []);

  if (!names) {
    return (
      <Spinner size="sm" color="primary" />
    );
  }

  return (
    <div>
    <NameList names={names} />
    </div>
  );
};

export default App;
