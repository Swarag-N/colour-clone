import sizes from "./Sizes";
export default{
    "NavBar":{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: '6vh',
    },
    
    logo:{
        marginRight: 15,
        padding: '0 15px',
        // padding: '0 13px',
        fontSize: 22,
        fontFamily: 'cursive',
        /* background-color: antiquewhite; */
        backgroundColor: '#E8E8E8',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        "& a":{
            textDecoration: 'none',
            color: 'black',
        },
        [sizes.down("xs")]: {
            display: "none"
        }

    },

    slider:{
        width: 250,
        margin: '0 10px',
        display: 'inline-block',
        "& .rc-slider-track":{
            backgroundColor: 'transparent',
        },
        "& .rc-slider-handle .rc-slider-handle:hover .rc-slider-handle:focus":{
            outline: 'none',
            border: 'none',
        },
        [sizes.down("sm")]: {
            width: "150px"
        }

    },
    selectContainer:{
        marginLeft: 'auto',
        marginRight: '2rem',
    }
}