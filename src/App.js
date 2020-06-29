import React from 'react';
import './App.css';
import Palette from './Palette/Palette'
import colours from  './seedColors' 

function App() {
  return (
    <div className="App">
      <Palette palette={colours[5]}/>
    </div>
  );
}

export default App;
