import React, { Component } from 'react'

import {CopyToClipboard} from 'react-copy-to-clipboard';
import {Link} from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import styles from './Styles/ColorBoxStyles'

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
        const {background,name,paletteId,id,showingFullPalette,classes}= this.props;
        const {copied} = this.state;
        // const isDarker = chroma(background).luminance()<0.5;
        // const isLight = chroma(background).luminance()>0.6;
        return (
            <CopyToClipboard text={background} onCopy={this.handleCopyState}> 
            <div className={classes.ColorBox} style={{background}}>
                <div className={`${classes.copyOverlay} ${copied && classes.show}`} style={{background}}/>
                    {/* <div className={`copy-msg ${copied && "show"}`}> */}
                    <div className={`${classes.copyMessage} ${copied && classes.showMessage}`}>
                        <h1>copied!</h1>
                        <p className={classes.copyText}>{background}</p>
                    </div>
                    {/* <div className="copy-container"> */}
                    <div>
                        <div className={classes.boxConatiner}>
                            <span className={classes.colourName}>{name}</span>
                            {/* <span className={isDarker && 'light-text'}>{name}</span> */}
                        </div>
                        <button className={classes.copyButton}>Copy</button>
                        {/* <button className={`copy-button ${isLight && "dark-text"}`}>Copy</button> */}
                    </div>
                    {showingFullPalette && 
                        <Link to={`/palette/${paletteId}/${id}`} onClick={evt=>evt.stopPropagation()}>
                            <span className={classes.seeMore}>More</span>
                            {/* <span className={`see-more ${isLight && "dark-text"}`}>More</span> */}
                        </Link>
                    }
            </div>
            </CopyToClipboard>

        )
    }
}

export default withStyles(styles)(ColorBox);
