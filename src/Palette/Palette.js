import React, { Component } from 'react'
import ColorBox from './ColorBox'
import './Palette.css'

class Palette extends Component {
    render() {
        let {colors,paletteName} = this.props.palette
        let colourBoxes = []
        colors[300].every(colour=>(
            colourBoxes.push(<ColorBox background={colour.hex} name={colour.name} key={colour.color}/>)
        ))
        return (
            <div className="Palette">
                <h1>{paletteName}</h1>
                <div className="Palette-colors">
                    {colourBoxes}
                </div>
            </div>
        )
    }
}
export default Palette