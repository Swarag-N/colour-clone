import React, { Component } from 'react'
import { withStyles } from "@material-ui/styles";
// import {Link} from 'react-router-dom'

import MiniPalette from './MiniPalette'

const styles = {
    root: {
        backgroundColor: "blue",
        height: "100vh",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center"
    },
    container: {
        width: "50%",
        display: "flex",
        alignItems: "flex-start",
        flexDirection: "column",
        flexWrap: "wrap"
    },
    nav: {
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
        color: "white"
    },
    palettes: {
        boxSizing: "border-box",
        width: "100%",
        display: "grid",
        gridTemplateColumns: "repeat(3, 30%)",
        gridGap: "5%"
    }
};

class PaletteList extends Component {
    redirectToPallete(id){
        this.props.history.push(`/palette/${id}`)
    }
    render() {
        const {palettes,classes} = this.props
        return (
            <div className={classes.root}>
                <div className={classes.container}>
                    <nav className={classes.nav}>
                        <h1>Palettes List</h1>
                    </nav>
                    <div className={classes.palettes}>
                        {
                        palettes.map(
                            palette=>(
                                <MiniPalette {...palette} handleClick={()=>this.redirectToPallete(palette.id)}/>
                            // <Link to={`/palette/${palette.id}`}><MiniPalette {...palette}/></Link>
                            // <Link to={`/palette/${palette.id}`}>{palette.paletteName}</Link> 
                            )
                        )
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(PaletteList);