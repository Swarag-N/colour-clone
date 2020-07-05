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
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

const drawerWidth = 400;

const styles = theme => ({
    root: {
        display: "flex"
      },
    appBar: {
        transition: theme.transitions.create(["margin", "width"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen
        }),
        flexDirection: "row",
        justifyContent: "space-between",
        height: "64px"
      },
      appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(["margin", "width"], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen
        })
      },
      menuButton: {
        marginLeft: 12,
        marginRight: 20
      },
      navButtons:{}
});

class PaletteFormNavbar extends Component {
    constructor(props){
        super(props)
        this.state={
            newPaletteName:""
        }
        this.handleNameChange = this.handleNameChange.bind(this);
    }
    
    componentDidMount(){
        ValidatorForm.addValidationRule("PaletteNameUnique",value=>(
            this.props.palettes.every(
                ({paletteName}) => paletteName.toLowerCase() !== value.toLowerCase()
            )
        ));
    }
    handleNameChange(evt){
        this.setState({
            [evt.target.name]:evt.target.value}
        )
    }

    render() {
        const {open,classes} = this.props
        const {newPaletteName} = this.state
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
              onClick={this.props.handleDrawerOpen}
              className={classNames(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap>
              Create a Palette
            </Typography>
          </Toolbar>
          <div className={classes.navButtons}>
                <ValidatorForm ref="form" onSubmit={()=>this.props.handleSavePalete(newPaletteName)}>
                  <TextValidator
                    label="Palette Name"
                    value={newPaletteName}
                    name="newPaletteName"
                    onChange={this.handleNameChange}
                    validators={["required", "PaletteNameUnique"]}
                    errorMessages={["Give Palette A Name", "Palette Name is Used"]}
                  />
                  <Button variant="contained" color="primary" type="submit">
                    Save New Palete
                  </Button>
                </ValidatorForm>
                <Link to="/">
                    <Button variant="contained" color="secondary">
                      Go Back
                    </Button>
                </Link>
            </div>
        </AppBar>
      </div>
    );
  }
}

// export default PaletteFormNavbar;
export default withStyles(styles, { withTheme: true })(PaletteFormNavbar);
