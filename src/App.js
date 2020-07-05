import React , {Component} from 'react';
import './App.css';
import {HashRouter,Route,Switch} from 'react-router-dom'

import Palette from './Palette/Palette'
import PaletteList from './Palette/PaletteList'
import SingleColourPalette from './Palette/SingleColourPalette'
import NewPaletteForm from './Palette/NewPaletteForm'

import colours from  './seedColors' 
import {generatePalette} from './Palette/ColorHelper'
// import seedColors from './seedColors';


class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      palettes:colours
    }
    this.savePalette= this.savePalette.bind(this);
    this.findPaletteById = this.findPaletteById.bind(this);
  }

  savePalette(newPalette){
    this.setState({
      palettes:[...this.state.palettes,newPalette]
    })
  }

  findPaletteById(id){
    return this.state.palettes.find((palette)=>{
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
            path="/palette/new"
            render={
              (routeProps)=>(
                <NewPaletteForm 
                {...routeProps} 
                savePalete={this.savePalette}
                palettes={this.state.palettes}/>
              )
            }
          />

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
              (routeProps)=><PaletteList palettes={this.state.palettes} {...routeProps}/>
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
