import chroma from 'chroma-js'
export default {
    ColorBox:{
        display: "inline-block",
        // height: "25%",
        height: props=> props.showingFullPalette?"25%":"50%",
        width: "20%",
        cursor: "pointer",
        position: "relative",
        margin: "0 auto",
        marginBottom: "-3.5px",
        "&:hover button":{
            opacity:1
        }
    },
    copyText:{
        color:props=>
            chroma(props.background).luminance()>0.6?"black":"white"
    },
    colourName:{
        color: props=> chroma(props.background).luminance()<0.5&&"white"
    },
    boxConatiner:{
        position: "absolute",
        width: "100%",
        left: "0px",
        bottom: "0px",
        padding: "10px",
        color: "black",
        letterSpacing: "1px",
        textTransform: "uppercase",
        fontSize: "12px",
    },
    seeMore:{
        color:props=> chroma(props.background).luminance()>0.6?"black":"white",
        background: "rgba(255, 255, 255, 0.3)",
        position: "absolute",
        border: "none",
        right: "0px",
        bottom: "0px",
        width: "60px",
        height: "30px",
        textAlign: "center",
        lineHeight: "30px",
        textTransform: "uppercase",
    },
    copyButton:{
        color:props=> chroma(props.background).luminance()>0.6?"black":"white",
        background: "rgba(255,255,255,0.25)",
        textTransform:"uppercase",
        display: "inline-block",
        width:"100px",
        height: "30px",
        position: "absolute",
        marginLeft:"-50px",
        marginTop: "-15px",
        top: "50%",
        left: "50%",
        fontSize: "1rem",
        lineHeight: "30px",
        outline: "none",
        border: "none",
        textAlign: "center",
        textDecoration: "none",
        opacity:0
    },
    copyOverlay:{
    opacity: "0",
    zIndex: "0",
    width: "100%",
    height: "100%",
    transition: "transform 0.6s ease-in-out",
    transform: "scale(0.1)"
    },
    show:{
        transform: "scale(50)",
        opacity: "1",
        zIndex: "10",
        position: "absolute",
    },
    copyMessage:{
        transform: "scale(0.1)",
        justifyContent: "center",
        position: "fixed",
        left: "0",
        right: "0",
        top: "0",
        bottom: "0",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        fontSize: "4rem",
        opacity: "0",
        color: "white",
        "& h1":{
            textShadow: "1px 2px black",
            background: "rgba(255, 255, 255, 0.2)",
            width: "100%",
            fontWeight: "400",
            textAlign: "center",
            marginBottom: "0",
            padding: "1rem",
            textTransform: "uppercase",
        },
        "& p":{
            fontSize: "2rem",
            fontWeight:"100",
        }
    },
    showMessage:{
        opacity: "1",
        transform: "scale(1)",
        zIndex: "25",
        transition: "all 0.4s ease-in-out",
        transitionDelay: "0.3s",
    }
}