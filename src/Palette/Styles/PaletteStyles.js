import sizes from "./Sizes";
export default{
    Palette:{
        height: "95vh",
        display: "flex",
        flexDirection: "column",
    },
    PaletteColors:{
        height: "90%",
    },
    goBack:{
        display: "inline-block",
        // height: "25%",
        height:"50%",
        width: "20%",
        cursor: "pointer",
        position: "relative",
        margin: "0 auto",
        marginBottom: "-3.5px",
        opacity:1,
        backgroundColor: "black",
        // position: "relative",
        "& a":{
            color:"white",
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
        },
        [sizes.down("lg")]: {
            width: "25%",
            height: "33.3333%"
          },
          [sizes.down("md")]: {
            width: "50%",
            height: "20%"
          },
          [sizes.down("xs")]: {
            width: "100%",
            height: "10%"
          },
    }
}
