import React, { Component } from 'react'
import { withStyles } from "@material-ui/styles";
// import {Link} from 'react-router-dom'
import styles from './Styles/PaletteListStyles'
import MiniPalette from './MiniPalette'


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
                                <MiniPalette {...palette} handleClick={()=>this.redirectToPallete(palette.id)} key={palette.id}/>
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