import React , {Component} from 'react';
import './App.css';
import Palette from './Palette/Palette'
import colours from  './seedColors' 
import {generatePalette} from './Palette/ColorHelper'


class App extends Component{
  render () {
    console.log(generatePalette(colours[5]))
    return (
      <div className="App">
        <Palette palette={generatePalette(colours[5])} />
      </div>
    );
  }
}

export default App;
