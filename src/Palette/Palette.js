import React, { Component } from 'react'
import ColorBox from './ColorBox'
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

import './Palette.css'

class Palette extends Component {
    constructor(props){
        super(props)
        this.state ={
            level:300
        }
        this.handleLevelChange = this.handleLevelChange.bind(this)
    }
    handleLevelChange(level){
        this.setState({level})
    }
    render() {
        const {colors,paletteName} = this.props.palette
        const {level} = this.state
        let colourBoxes = []
        colors[level].every(colour=>(
            colourBoxes.push(<ColorBox background={colour.hex} name={colour.name} key={colour.color}/>)
        ))

        return (
            <div className="Palette">
                <h1>{paletteName}</h1>
                <div className="Palette-colors">
                <Slider step={100} dots={true} activeDotStyle={{borderColor: 'yellow'}} min={100} max={900} defaultValue={level}onAfterChange={this.handleLevelChange}/> 
                    {colourBoxes}
                </div>
            </div>
        )
    }
}

export default Palette