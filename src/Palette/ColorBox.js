import React, { Component } from 'react'
import './ColorBox.css'
class ColorBox extends Component {
    render() {
        return (
            <div 
                className="ColorBox"
                style={{background:this.props.background}}>
                <span>more</span> <span>{this.props.name}</span>
            </div>
        )
    }
}

export default ColorBox
