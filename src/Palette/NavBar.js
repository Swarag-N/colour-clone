import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';

import Slider from 'rc-slider';


import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton'
import Close from '@material-ui/icons/Close'

// import './NavBar.css'
import styles from './Styles/NavBarStyles'
import 'rc-slider/assets/index.css';

class NavBar extends Component {
    constructor(props){
        super(props)
        this.state={
            format:"hex",
            open:false
        }
        this.handleSelectChange = this.handleSelectChange.bind(this)
        this.handleSnackbarClose = this.handleSnackbarClose.bind(this)
    }
    handleSelectChange(evt){
        this.setState({format:evt.target.value,open:true})
        this.props.handleFormatChange(evt.target.value)
    }

    handleSnackbarClose(){
        this.setState({open:false})
    }

    render() {
        const {level, handleLevelChange, showSlider,classes} = this.props
        const {open,format} = this.state;
        return (
            <header className={classes.NavBar}>
                <div className={classes.logo}>
                    <Link to="/">colour-clone</Link>
                </div>
                {showSlider &&
                    <div className="slider-container">
                        <span>
                            Level:{level}
                        </span>
                        <div className={classes.slider}>
                            <Slider 
                                step={100} 
                                min={100} 
                                max={900} 
                                defaultValue={level}
                                onAfterChange={handleLevelChange}/>
                        </div>
                    </div>
                }
                <div className={classes.selectContainer}>
                    <Select value={format} onChange={this.handleSelectChange}>
                        <MenuItem value="hex">HEX - #ffffff</MenuItem>
                        <MenuItem value="rgb">RGB - rgb(255,255,255)</MenuItem>
                        <MenuItem value="rgba">RGBA - rgba(255,255,255,1.0)</MenuItem>
                    </Select>
                </div>
                <Snackbar
                    anchorOrigin={{ vertical:"bottom", horizontal:"left" }}
                    open={open}
                    autoHideDuration={2780}
                    onClose={this.handleSnackbarClose}
                    message={<span id="message-id">Format Changed to {format.toUpperCase()}</span>}
                    ContentProps={{
                        "aria-describedly":"message-id"
                    }}
                    action={
                        <IconButton 
                            onClick={this.handleSnackbarClose}
                            color='inherit'
                            key='close'
                            aria-label='close'>
                            <Close/>
                        </IconButton>
                    }

                />
            </header>
        )
    }
}

export default withStyles(styles)(NavBar);
