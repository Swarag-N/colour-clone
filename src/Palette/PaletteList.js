import React, { Component } from 'react'

import { withStyles } from "@material-ui/styles";
import {Link} from 'react-router-dom'
import { CSSTransition, TransitionGroup} from 'react-transition-group';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';

import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';
import {blue,red} from "@material-ui/core/colors";

import MiniPalette from './MiniPalette'

import styles from './Styles/PaletteListStyles'

class PaletteList extends Component {
    constructor(props){
        super(props);
        this.state={
            deleteDialoge:false,
            toBeDeletedId:"",
        }
        this.openDeleteDialoge=this.openDeleteDialoge.bind(this);
        this.closeDeleteDialoge=this.closeDeleteDialoge.bind(this);
        this.handleDeletion=this.handleDeletion.bind(this);
        this.redirectToPallete=this.redirectToPallete.bind(this);
    }
    openDeleteDialoge(id){
        this.setState({deleteDialoge:true, toBeDeletedId:id})
    }
    closeDeleteDialoge(){
        this.setState({deleteDialoge:false,toBeDeletedId:""})
    }
    redirectToPallete(id){
        this.props.history.push(`/palette/${id}`)
    }
    handleDeletion(){
        this.props.deletePalette(this.state.toBeDeletedId)
        this.closeDeleteDialoge()
    }
    render() {
        const {palettes,classes} = this.props
        const {deleteDialoge} = this.state;
        return (
            <div className={classes.root}>
                <div className={classes.container}>
                    <nav className={classes.nav}>
                        <h1  className={classes.heading} >Palettes List</h1>
                        <Link to='/palette/new'>Create a New Palette</Link>
                    </nav>
                    <TransitionGroup className={classes.palettes}>
                        {
                        palettes.map(
                        palette=>(
                            <CSSTransition key={palette.id} classNames="fade" timeout={500}>
                            <MiniPalette 
                                {...palette} 
                                goToPalette={this.redirectToPallete}  
                                key={palette.id}
                                openDeleteDialoge={this.openDeleteDialoge}/>
                            </CSSTransition>
                        ))}
                        </TransitionGroup>
                </div>
                <Dialog 
                    open={deleteDialoge}
                    onClose={this.closeDeleteDialoge}>
                    <DialogTitle>
                       Delete the Palete? 
                    </DialogTitle>
                    <DialogContent>
                        <List>
                            <ListItem button onClick={this.handleDeletion}>
                                <ListItemAvatar>
                                    <Avatar style={{ backgroundColor: blue[100], color: blue[600] }}>
                                        <CheckIcon/>
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary="Delete"/>
                            </ListItem>
                            <ListItem button onClick={this.closeDeleteDialoge}>
                                <ListItemAvatar>
                                    <Avatar style={{ backgroundColor: red[100], color: red[600] }}>
                                        <CloseIcon/>
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary="Cancel"/>
                            </ListItem>
                        </List>
                    </DialogContent>
                </Dialog>
            </div>
        )
    }
}

export default withStyles(styles)(PaletteList);