import React, { Component } from 'react'
import {Link} from 'react-router-dom'

import ColorBox from './ColorBox'
import NavBar from './NavBar'
import PalatteFooter from './PaletteFooter'

class SingleColourPalette extends Component {
    constructor(props){
        super(props)
        this.state={
            format:"hex"
        }

        this._shades= this.extarctColours(this.props.palette,this.props.colorId)
        this.handleFormatChange = this.handleFormatChange.bind(this)
    }

    extarctColours(palette,colourID){
        let colourData = []
        let allColurs = palette.colors

        for (let levelKey in allColurs){
            let match = allColurs[levelKey].filter(
                eachColour=>eachColour.id===colourID
            )
            colourData.push(match[0])
        }

        return colourData.splice(1)
    }

    handleFormatChange(val){
        this.setState({format:val})
    }

    render() {
        const {paletteName,emoji,id}=this.props.palette
        const {format} = this.state
        let colorBoxes = this._shades.map(colourShade=>
                <ColorBox 
                    background={colourShade[format]} 
                    name={colourShade.name} 
                    moreUrl={false}
                    key={colourShade.name}
                    />
            )
        return (
            <div className="Palette SingleColourPalette">
                <NavBar
                    handleFormatChange={this.handleFormatChange}
                    showSlider={false}
                />
                <div className="Palette-colors">
                    {colorBoxes}
                    <div className="go-back ColorBox">
                        <Link to={`/palette/${id}`} className="back-button">Go Back</Link>
                    </div>
                </div>
                <PalatteFooter
                    paletteName={paletteName}
                    emoji={emoji}
                />
            </div>
        )
    }
}
export default SingleColourPalette