import React, { Component } from "react";

import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";

import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import Button from '@material-ui/core/Button';
import { arrayMove } from "react-sortable-hoc";

import DragableColorBoxList from './DragableColorBoxList'
import PaletteFormNavbar from './PaletteFormNavbar'
import ColorPickerForm from './ColorPickerForm'
// import DragableColorBox from './DragableColorBox'

const drawerWidth = 400;

const styles = theme => ({
  root: {
    display: "flex"
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth,
    display: "flex",
    alignItems: "center"
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  },
  content: {
    height:"calc(100vh - 64px)",
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  },
  container:{
    width: "90%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  buttons: {
    width: "100%"
  },
  button: {
    width: "50%"
  }
});

class NewPaletteForm extends Component {
  static defaultProps={
    maxColours:20
  }
    constructor(props){
        super(props);
        this.state = {
            open: true,
            // currentColor:'orange',
            // colours:[],
            // colours:[{name:'blue', color:'blue'},{name:'red',color:'red'}],
            colours:this.props.palettes[0].colors,
            // newColorName:"",
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

    // componentDidMount(){
    //     // const {colours} = this.state;
    //     ValidatorForm.addValidationRule("isColorNameUnique",value=>(
    //         this.state.colours.every(
    //             ({name}) => name.toLowerCase() !== value.toLowerCase()
    //         )
    //     ));        
        

    //     ValidatorForm.addValidationRule("isColorUnique", value =>
    //         this.state.colours.every(({ color }) => color !== this.state.currentColor)
    //     );
    // }

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
      let randomColor = allColours[Math.floor(Math.random()*allColours.length)]
      this.setState(st=>({
        colours:[...st.colours,randomColor]
      }))
    }

    handleDrawerOpen = () => {
      this.setState({ open: true });
    };
  
    handleDrawerClose = () => {
      this.setState({ open: false });
    };

    // handleUpadteColor(color){
    //     this.setState({currentColor:color.hex})
    // }

    addColourToState(colorNew){
        const {colours}=this.state
        // const {newColorName,currentColor,colours}=this.state
        // const colorNew = {
        //     name:newColorName,
        //     color:currentColor
        // }
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

    handleSavePalete(newPaletteName){
        let newPalette={
            paletteName:newPaletteName,
            id:newPaletteName.toLowerCase().replace(/ /g,'-'),
            colors:[...this.state.colours]
        }
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