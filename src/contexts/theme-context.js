import { createContext, useState } from "react";
import lightButtonImg from '../img/icon-fire.png';
import darkButtonImg from '../img/icon-dark.png';

export const themes = {
    light: {
        color1: '#f1f1f1',
        color2: '#38B6FF',
        border1: '#f1f1f1',
        border2: '#38B6FF',
        background1: '#CB2121',
        background2: '#38B6FF',
        background3: '#f1f1f1',
        buttonImg: lightButtonImg,
    },
    dark: {
        color1: '#f1f1f1',
        color2: '#f1f1f1',
        border1:'#2E2E2E',
        border2:'#222029',
        background1: '#501515',
        background2: '#222029',
        background3:'#2E2E2E',
        buttonImg: darkButtonImg,
    }
}
export const ThemeContext = createContext({})

export const ThemeProvider = (props) => {

    const [theme, setTheme] = useState(themes.light)

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {props.children}
        </ThemeContext.Provider>
    ) 
}
