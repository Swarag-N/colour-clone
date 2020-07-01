import React, { Component } from 'react'
import ColorBox from './ColorBox'
import NavBar from './NavBar'


import './Palette.css'

class Palette extends Component {
    constructor(props){
        super(props)
        this.state ={
            level:300,
            format:"hex"
        }
        this.handleLevelChange = this.handleLevelChange.bind(this)
        this.handleFormatChange = this.handleFormatChange.bind(this)
    }
    handleLevelChange(level){
        this.setState({level})
    }

    handleFormatChange(val){
        this.setState({format:val})
    }

    render() {
        const {colors,paletteName,emoji} = this.props.palette
        const {level,format} = this.state
        let colourBoxes = []
        colors[level].every(colour=>(
            colourBoxes.push(<ColorBox background={colour[format]} name={colour.name} key={colour.id}/>)
        ))

        return (
            <div className="Palette">
                <NavBar level={level} handleLevelChange={this.handleLevelChange} format={format} handleFormatChange={this.handleFormatChange}/>
                <div className="Palette-colors"> 
                    {colourBoxes}
                </div>
                <footer className="palette-footer">
                    {paletteName}
                    <span className="emoji">{emoji}</span>
                </footer>
            </div>
        )
    }
}

export default Palette