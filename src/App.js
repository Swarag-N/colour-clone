import React , {Component} from 'react';
import './App.css';
import {Route,Switch} from 'react-router-dom'
import Palette from './Palette/Palette'
import PaletteList from './Palette/PaletteList'
import colours from  './seedColors' 
import {generatePalette} from './Palette/ColorHelper'


class App extends Component{
  findPaletteById(id){
    return colours.find((palette)=>{
      return palette.id === id
    })
  }
  render () {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" render={()=><PaletteList palettes={colours}/>}/>
          <Route
            exact 
            path="/palette/:id"  
            render={
              (routeProps)=>(<Palette palette={
                generatePalette(
                  this.findPaletteById(routeProps.match.params.id)
                  )
                }/>)
              }
            />
        </Switch>
        {/* <Palette palette={generatePalette(colours[1])} /> */}
      </div>
    );
  }
}

export default App;
