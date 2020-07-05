import React from 'react'
import DragableColorBox from './DragableColorBox'
import {SortableContainer} from 'react-sortable-hoc';

const DragableColorBoxList = SortableContainer(({colours,deleteColor})=> {
    return (
        <div style={{height:"100%"}}>
            {colours.map((colour,i)=>(
                <DragableColorBox 
                    index={i}
                    color={colour.color} 
                    name={colour.name} 
                    key={colour.name} 
                    deleteColor={()=>deleteColor(colour.name)}
                    />
              //   <li style={{backgroundColor:colour}}>{colour}</li>
            ))}
        </div>
    )
});

export default DragableColorBoxList
