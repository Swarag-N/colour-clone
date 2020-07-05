import React from 'react'

import { withStyles } from '@material-ui/core/styles';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import { SortableElement } from "react-sortable-hoc";

const styles={
    DragableColorBox:{
        display: "inline-block",
        height: "25%",
        width: "20%",
        cursor: "pointer",
        position: "relative",
        margin: "0 auto",
        marginBottom: "-3.5px",
        "&:hover svg": {
            color: "white",
            transform: "scale(1.5)"
        }
    },
    boxContent:{
        position: "absolute",
        width: "100%",
        left: "0px",
        bottom: "0px",
        padding: "10px",
        color: "black",
        letterSpacing: "1px",
        textTransform: "uppercase",
        fontSize: "12px",
        display:"flex",
        justifyContent:"space-between"
    },
    deleteIcon: {
        transition: "all 0.3s ease-in-out"
    }
}
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
