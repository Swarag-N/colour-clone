import React, { Component } from 'react'
import classNames from "classnames";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {Link} from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import styles from './Styles/ColorBoxStyles'

// import './ColorBox.css'

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

        return (
            <CopyToClipboard text={background} onCopy={this.handleCopyState}> 
            <div className={classes.ColorBox} style={{background}}>
                <div className={classNames(classes.copyOverlay, {
                    [classes.show]: copied})
                } 
                style={{background}}/>
                    <div 
                        className={classNames(classes.copyMessage,{
                            [classes.showMessage]:copied
                        })}>
                        <h1>copied!</h1>
                        <p className={classes.copyText}>{background}</p>
                    </div>
                    <div>
                        <div className={classes.boxConatiner}>
                            <span className={classes.colourName}>{name}</span>
                        </div>
                        <button className={classes.copyButton}>Copy</button>
                    </div>
                    {showingFullPalette && 
                        <Link to={`/palette/${paletteId}/${id}`} onClick={evt=>evt.stopPropagation()}>
                            <span className={classes.seeMore}>More</span>
                        </Link>
                    }
            </div>
            </CopyToClipboard>

        )
    }
}

export default withStyles(styles)(ColorBox);
