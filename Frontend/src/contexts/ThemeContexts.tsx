import { createContext, useCallback, useContext, useMemo, useState, PropsWithChildren } from "react";
import {ThemeProvider} from '@mui/material';
import { DarkTheme, LightTheme } from "./../theme";
import Box from '@mui/material/Box';


//typescript typing definition
interface IThemeContextData{
    //themes created - only accept these
    themeName: 'light' | 'dark';
    //eg. switcher from light to dark theme
    toggleTheme: () => void;
}

// this context has IThemeContextData properties
const ThemeContext = createContext({} as IThemeContextData);

export const useAppThemeContext = () => {
    return useContext(ThemeContext);
}

// export const AppThemeProvider: React.FC = ({children}) => {
    export const AppThemeProvider: React.FC<PropsWithChildren> = ({ children }) => {

    const[themeName, setThemeName] = useState<'light' | 'dark'>('light');

    const toggleTheme = useCallback (() => {
        //passing two parameters to the function: 1- fuction 2-dependency array (indicates when this function should be updated). The results react stores. 
        //oldThemeName -> before
        setThemeName(oldThemeName => oldThemeName === 'light' ? 'dark' : 'light');

    }, []);

    const theme = useMemo(() => {
        if (themeName === 'light') return LightTheme;
        return DarkTheme; 
    }, [themeName]);

    return(
        <ThemeContext.Provider value={{themeName, toggleTheme}}>
            <ThemeProvider theme = {theme}>
                {/* the color on the entire screen of the application */}
                <Box width='100vw' height='100vh' bgcolor={theme.palette.background.default}>
                    { children }
                    
                </Box>
                
            </ThemeProvider>      
        </ThemeContext.Provider>
    );
}
