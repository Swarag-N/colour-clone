import React from 'react'

import { withStyles } from '@material-ui/core/styles';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import { SortableElement } from "react-sortable-hoc";

import styles from './Styles/DragableColorBoxStyles'

const DragableColorBox= SortableElement((props)=> {
    const {classes,color,name,deleteColor} = props
    return (
        <div className={classes.DragableColorBox} style={{backgroundColor:color}}>
            <div className={classes.boxContent}>
                <span>{name}</span>
                <DeleteRoundedIcon className={classes.deleteIcon} onClick={deleteColor} />
            </div>
        </div>
    )
});

export default  withStyles(styles)(DragableColorBox);
