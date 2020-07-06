import React, { Component } from "react";

import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";

import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Button from '@material-ui/core/Button';
import  arrayMove  from "array-move";

import DragableColorBoxList from './DragableColorBoxList';
import PaletteFormNavbar from './PaletteFormNavbar';
import ColorPickerForm from './ColorPickerForm';

import styles from './Styles/NewPaletteFormStyles';
import seedColors from '../seedColors';

class NewPaletteForm extends Component {
  static defaultProps={
    maxColours:20
  }
    constructor(props){
        super(props);
        this.state = {
            open: true,
            colours:seedColors[0].colors,
            newPaletteName:""
        };
        // this.handleUpadteColor = this.handleUpadteColor.bind(this);
        this.addColourToState = this.addColourToState.bind(this);
        // this.handleNameChange = this.handleNameChange.bind(this);
        this.handleSavePalete = this.handleSavePalete.bind(this);
        this.deleteColor = this.deleteColor.bind(this);
        this.clearPalette = this.clearPalette.bind(this);
        this.addRandomColor = this.addRandomColor.bind(this);
    }

    deleteColor(colorName){
      this.setState({
        colours:this.state.colours.filter(({name})=>name.toLowerCase()!==colorName.toLowerCase())
      })
    }

    clearPalette(){
      this.setState({
        colours:[]
      })
    }

    addRandomColor(){
      const allColours = this.props.palettes.map(p=>p.colors).flat()
      let randomColor
      let isDuplicateColor=true
      while(isDuplicateColor){
        randomColor = allColours[Math.floor(Math.random()*allColours.length)]
        isDuplicateColor = this.state.colours.some(colour=>colour.name ===randomColor.name)
      }
      this.setState(st=>({
        colours:[...st.colours,randomColor]
      }))
      // console.log(randomColor)
    }

    handleDrawerOpen = () => {
      this.setState({ open: true });
    };
  
    handleDrawerClose = () => {
      this.setState({ open: false });
    };


    addColourToState(colorNew){
        const {colours}=this.state
        this.setState({
            colours:[...colours,colorNew],
            newColorName:""
        })
    }

    // handleNameChange(evt){
    //     this.setState({
    //         [evt.target.name]:evt.target.value}
    //     )
    // }

    handleSavePalete(newPalette){
        newPalette.id=newPalette.paletteName.toLowerCase().replace(/ /g,'-');
        newPalette.colors=[...this.state.colours]
        this.props.savePalete(newPalette)
        this.props.history.push('/');
    }

    onSortEnd = ({ oldIndex, newIndex }) => {
      this.setState(({ colours }) => ({
        colours: arrayMove(colours, oldIndex, newIndex)
      }));
    };

    render() {
      const { classes,maxColours,palettes} = this.props;
      const { open ,colours} = this.state;
      const isPaletteFull = colours.length>=maxColours;

      return (
        <div className={classes.root}>
          <PaletteFormNavbar 
            open={open} 
            // classes={classes}
            palettes={palettes}
            handleSavePalete={this.handleSavePalete}
            handleDrawerOpen={this.handleDrawerOpen}/>
        <Drawer
          className={classes.drawer}
          variant='persistent'
          anchor='left'
          open={open}
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <div className={classes.container}>
            <Typography variant="h4" gutterBottom>Create A Palette here</Typography>
            <div className={classes.buttons}>
              <Button
                variant="contained"
                color="secondary"
                onClick={this.clearPalette}
                className={classes.button}
                >
                  Clear Palette
                </Button>
              <Button 
                variant="contained" 
                color="primary" 
                onClick={this.addRandomColor}
                disabled={isPaletteFull}
                className={classes.button}
                >
                  Random Colour
                </Button>
              <ColorPickerForm 
                isPaletteFull={isPaletteFull}
                addColourToState={this.addColourToState}
                colours={colours}/>
            </div>
          </div>
        </Drawer>
        <main
            className={classNames(classes.content, {
                [classes.contentShift]: open
            })}
        >
        <div className={classes.drawerHeader} />
            <DragableColorBoxList 
              distance={20}
              axis='xy'
              onSortEnd={this.onSortEnd}
              colours={colours} 
              deleteColor={this.deleteColor}
              />
        </main>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(NewPaletteForm);