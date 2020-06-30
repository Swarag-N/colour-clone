import React, { Component } from 'react'
import {CopyToClipboard} from 'react-copy-to-clipboard';
import './ColorBox.css'
class ColorBox extends Component {
    constructor(props){
        super(props)
        this.state={
            copied:false
        }
        this.handleCopyState = this.handleCopyState.bind(this)
    }
    handleCopyState(){
        this.setState({copied:true},()=>{
            setTimeout(()=>this.setState({copied:false}),1000)
        })
    }
    render() {
        const {background,name}= this.props;
        const {copied} = this.state;
        return (
            <CopyToClipboard text={background} onCopy={this.handleCopyState}> 
            <div className="ColorBox" style={{background}}>
                <div className={`copy-overlay ${copied && "show"}`} style={{background}}/>
                    <div className={`copy-msg ${copied && "show"}`}>
                        <h1>copied!</h1>
                        <p>{background}</p>
                    </div>
                    <div className="copy-container">
                        <div className="box-conatiner">
                            <span>{name}</span>
                        </div>
                        <button className="copy-button">Copy</button>
                    </div>
                <span className="see-more">More</span>
            </div>
            </CopyToClipboard>

        )
    }
}

export default ColorBox
