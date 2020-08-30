import React from 'react';
import './App.css';
import Values from './Components/Values/Values';
import Table from './Components/Table/CountryTable';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <Values/>
      <Table/>
    </div>
  );
}

export default App;
