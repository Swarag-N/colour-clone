import React , {Component} from 'react';
import './App.css';
import {HashRouter,Route,Switch} from 'react-router-dom'

import Palette from './Palette/Palette'
import PaletteList from './Palette/PaletteList'
import SingleColourPalette from './Palette/SingleColourPalette'
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
      <HashRouter basename='/'>
      <div className="App">
        <Switch>
          <Route
            exact
            path="/palette/:paletteId/:colorID"
            render={
              (routeProps)=>(
              <SingleColourPalette
                {...routeProps}
                palette={
                  generatePalette(
                    this.findPaletteById(routeProps.match.params.paletteId)
                  )
                }
                colorId={routeProps.match.params.colorID}
                />)
            }
          />
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
          <Route 
            exact 
            path="/" 
            render={
              (routeProps)=><PaletteList palettes={colours} {...routeProps}/>
            }
          />

        </Switch>
        {/* <Palette palette={generatePalette(colours[1])} /> */}
      </div>
      </HashRouter>
    );
  }
}

export default App;
