import { createTheme , CssBaseline, ThemeProvider } from "@mui/material";
import React from "react";

type ThemeProp ={
    children : JSX.Element;
}


export enum themePalette{
    BG = "#5EDFF1",
    P2 = "#F7D00C",

}


const theme = createTheme({
    palette :{
        mode:"light",
        background:{
            default:themePalette.BG,
        },
        primary:{
            main:themePalette.P2
        },

    },
    components:{
        MuiButton:{
            defaultProps:{
                style:{
                    textTransform: "none",
                    boxShadow:"none",
                    borderRadius:"15px"
                }
            }
        }
    }
})



export const ThemeConfig : React.FC<ThemeProp>=({children})=>{
    return(
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            {children}
        </ThemeProvider>
    )
}