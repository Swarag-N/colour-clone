import React, { Component } from 'react'

import Button from '@material-ui/core/Button';
import { withStyles } from "@material-ui/core/styles";

import {ChromePicker} from 'react-color'
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

import styles from './Styles/ColorPickerFormStyles'

class ColorPickerForm extends Component {
    constructor(props){
        super(props)
        this.state={
            currentColor:'orange',
            newColorName:""
        }
        this.handleUpadteColor = this.handleUpadteColor.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleSubmitColor = this.handleSubmitColor.bind(this);
    }

    componentDidMount(){
        // const {colours} = this.state;
        ValidatorForm.addValidationRule("isColorNameUnique",value=>(
            this.props.colours.every(
                ({name}) => name.toLowerCase() !== value.toLowerCase()
            )
        ));        

        ValidatorForm.addValidationRule("isColorUnique", value =>
            this.props.colours.every(({ color }) => color !== this.state.currentColor)
        );
    }

    handleUpadteColor(color){
        this.setState({currentColor:color.hex})
    }

    handleNameChange(evt){
        this.setState({
            [evt.target.name]:evt.target.value}
        )
    }

    handleSubmitColor(){
        const {newColorName,currentColor,}=this.state
        const colorNew = {
            name:newColorName,
            color:currentColor
        }
        this.props.addColourToState(colorNew)
        this.setState({newColorName:""})
    }

    render() {
        const {isPaletteFull,classes} = this.props
        const {currentColor,newColorName} = this.state
        return (
            <div>
            <ChromePicker 
                className={classes.picker}
                color={currentColor} 
                onChangeComplete={this.handleUpadteColor}/>
            <ValidatorForm
                ref="form"
                onSubmit={this.handleSubmitColor}
                instantValidate={false}
                >
                <TextValidator
                  label="Give Color a Name"
                  onChange={this.handleNameChange}
                  className={classes.colorNameInput}
                  variant='filled'
                  margin='normal'
                  name="newColorName"
                  value={newColorName}
                  validators={['required', "isColorNameUnique","isColorUnique"]}
                  errorMessages={[
                      "Enter a color name",
                      "Color name must be unique",
                      "Color already used!"]}
                />
                <Button
                    disabled={isPaletteFull}
                    type="submit"
                    variant="contained" 
                    color="primary"
                    className={classes.addColor}
                    style={{
                      backgroundColor: isPaletteFull?
                      "grey":
                      this.state.currentColor
                    }}
                    // style={{background:currentColor}}
                    >
                    {isPaletteFull ? "Palette Full" : "Add Color"}
                </Button>
            </ValidatorForm>
                
            </div>
        )
    }
}

// export default ColorPickerForm
export default withStyles(styles)(ColorPickerForm);