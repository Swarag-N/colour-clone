import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import styles from './Styles/MiniPaletteStyles'

function MiniPalette(props){
    const {classes,paletteName,colors,emoji,handleClick} = props
    let miniColors = colors.map(colour=>(
        <div className={classes.miniColor} style={{backgroundColor:colour.color}} key={colour.name}>

        </div>
    ))
    return (
        <div className={classes.root} onClick={handleClick}>
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

export default withStyles(styles)(MiniPalette);