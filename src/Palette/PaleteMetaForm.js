import React, { Component } from 'react'

import Button from '@material-ui/core/Button';
// import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'

class PaleteMetaForm extends Component {
    constructor(props){
        super(props)
        this.state={
            open:"form",
            // open:true,
            newPaletteName:""
        }
        this.handleNameChange = this.handleNameChange.bind(this);
        this.showEmojiPicker = this.showEmojiPicker.bind(this);
        this.savePalette = this.savePalette.bind(this);
    }
    
    componentDidMount(){
        ValidatorForm.addValidationRule("PaletteNameUnique",value=>(
            this.props.palettes.every(
                ({paletteName}) => paletteName.toLowerCase() !== value.toLowerCase()
            )
        ));
    }

    showEmojiPicker(){
        this.setState({
            open:"emoji"
        })
        // this.props.handleSavePalete(this.state.newPaletteName)
    }

    savePalette(emoji){
        const newPalette = {
            paletteName:this.state.newPaletteName,
            emoji:emoji.native
        }
        // console.log(emoji.native)
        this.props.handleSavePalete(newPalette)
        this.setState({
            open:""
        })
    }
    handleNameChange(evt){
        this.setState({
            [evt.target.name]:evt.target.value}
        )
    }
    handleClickOpen = () => {
        this.setState({
            open:true
        })
    };
    
    handleClose = () => {
        this.setState({
            open:"form"
        })
    };

    
    render() {
        const {open,newPaletteName} = this.state
        const {hideForm} = this.props
        return (
            <div>
                <Dialog
                    open={open==="emoji"}
                    onClose={hideForm} >
                        <DialogTitle id='form-dialog-title'>
                            Choose a Palette Emoji
                        </DialogTitle>
                    <Picker
                        title='Pick a Palette Emoji'
                        onSelect={this.savePalette}
                    />
                </Dialog>
                <Dialog 
                    open={open==="form"} 
                    onClose={hideForm} 
                    aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Save Palette</DialogTitle>
                    <ValidatorForm ref="form" onSubmit={this.showEmojiPicker}>
                        <DialogContent>
                            <DialogContentText>
                            Add name to your Palette. Make sure it is Unique. 
                            </DialogContentText>
                        <TextValidator
                            label="Palette Name"
                            value={newPaletteName}
                            name="newPaletteName"
                            fullWidth
                            margin='normal'
                            onChange={this.handleNameChange}
                            validators={["required", "PaletteNameUnique"]}
                            errorMessages={["Give Palette A Name", "Palette Name is Used"]}/>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={hideForm} color="primary">
                            {/* <Button onClick={this.handleClose} color="primary"> */}
                              Cancel
                            </Button>
                            <Button variant="contained" color="primary" type="submit">
                              Save New Palete
                            </Button>
                        </DialogActions>
                    </ValidatorForm>
              </Dialog>
            </div>
          );
        }
    }

export default PaleteMetaForm