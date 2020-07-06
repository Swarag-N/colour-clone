import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";

import {Link} from 'react-router-dom'

import classNames from "classnames";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

import Button from "@material-ui/core/Button";

import PaleteMetaForm from './PaleteMetaForm'

import styles from './Styles/PaletteFormNavbarStyles'

class PaletteFormNavbar extends Component {
    constructor(props){
        super(props)
        this.state={
            newPaletteName:"",
            showingDialogForm:false,
        }
        // this.handleNameChange = this.handleNameChange.bind(this);
        this.showForm = this.showForm.bind(this);
        this.hideForm = this.hideForm.bind(this);
    }
    
    handleNameChange(evt){
      this.setState({
          [evt.target.name]:evt.target.value}
      )
    }

    showForm(){
      this.setState({showingDialogForm:true})
    }

    hideForm(){
      this.setState({showingDialogForm:false})
    }

    render() {
        const {open,classes,palettes,handleSavePalete,handleDrawerOpen} = this.props
        const {showingDialogForm} = this.state
        // const {newPaletteName} = this.state
        return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: open,
          })}
          color="default"
        >
          <Toolbar disableGutters={!open}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={handleDrawerOpen}
              className={classNames(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap>
              Create a Palette
            </Typography>
          </Toolbar>
          <div className={classes.navButtons}>
            <Button
              variant='contained'
              color='primary'
              onClick={this.showForm}
              className={classes.button}
            >
              Save
            </Button>
            <Link to="/">
                <Button variant="contained" color="secondary">
                  Go Back
                </Button>
            </Link>
          </div>
        </AppBar>
        {showingDialogForm &&
          <PaleteMetaForm
            hideForm={this.hideForm}
            palettes={palettes}
            handleSavePalete={handleSavePalete}
            />
        }
      </div>
    );
  }
}

// export default PaletteFormNavbar;
export default withStyles(styles, { withTheme: true })(PaletteFormNavbar);
