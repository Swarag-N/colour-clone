import React, { PureComponent } from 'react'


import DeleteIcon from "@material-ui/icons/Delete";

import { withStyles } from '@material-ui/core/styles';
import styles from './Styles/MiniPaletteStyles'

class MiniPalette extends PureComponent {
    constructor(props){
        super(props);
        this.deletePalette = this.deletePalette.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    deletePalette(evt){
        evt.stopPropagation();
        this.props.openDeleteDialoge(this.props.id)
    }
    handleClick(){
        this.props.goToPalette(this.props.id)
    }
    render() {
        const {classes,paletteName,colors,emoji} = this.props
        let miniColors = colors.map(colour=>(
            <div className={classes.miniColor} style={{backgroundColor:colour.color}} key={colour.name}></div>
        ))
        return (
            <div className={classes.root} onClick={this.handleClick}>
                <DeleteIcon
                    onClick={this.deletePalette}
                    className={classes.deleteIcon}
                    style={{ transition: "all 0.3s ease-in-out" }}
                />
                <div className={classes.colors}>
                    {miniColors}
                </div>
                <div className={classes.title}>{paletteName}
                    <span className={classes.emoji}>
                        {emoji}
                    </span>
                </div>
            </div>
        ) 
    }
}

export default withStyles(styles)(MiniPalette);