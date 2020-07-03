import React from 'react'
import { withStyles } from '@material-ui/core/styles';

const styles = {
    root: {
    //   background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
      background: 'white',
      border:'1px solid black',
      borderRadius:'5px',
      padding:'0.5rem',
      position:"realtive",
      overflow:"hidden",
      "&:hover":{
          cursor:"pointer"
      }

    },
    colors:{
        // background:"gray",
        backgroundColor: "#dae1e4",
        height: "150px",
        width: "100%",
        borderRadius: "5px",
        overflow: "hidden"

    },
    title:{
        display:"flex",
        justifyContent:"space-between",
        alignItems:"center",
        margin:"0",
        "color":"black",
        paddingTop:"0.5rem",
        fontSize: "1rem",
        position: "relative"
    },
    emoji:{
        marginLeft: "0.5rem",
        fontSize: "1.5rem"
    },
    miniColor: {
        height: "25%",
        width: "20%",
        display: "inline-block",
        margin: "0 auto",
        position: "relative",
        marginBottom: "-3.5px"
    }
};

function MiniPalette(props){
    const {classes,paletteName,colors,emoji,handleClick} = props
    let miniColors = colors.map(colour=>(
        <div className={classes.miniColor} style={{backgroundColor:colour.color}} key={colour.name}>

        </div>
    ))
    console.log(classes)
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