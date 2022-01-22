import * as React from 'react';
// import { useEffect, useState } from 'react';
import { ThemeProvider, useTheme, createTheme } from '@mui/material/styles';
import { lightBlue, amber, grey, } from "@material-ui/core/colors";



export const ColorModeContext = React.createContext({ toggleColorMode: () => { } });


export const ColorTheme
const [darkState, setDarkState] = useState(true);

const palletType = darkState ? "dark" : "light";
const mainPrimaryColor = darkState ? amber[600] : lightBlue[500];
const mainSecondaryColor = darkState ? grey[900] : grey[50];

const theme = React.useMemo(
    () =>
        createTheme({
            palette: {
                type: palletType,
                primary: {
                    main: mainPrimaryColor
                },
                secondary: {
                    main: mainSecondaryColor
                }
            }
        })
        [model],
)





// ------------------------------



function MyApp() {
    const theme = useTheme();
    const colorMode = React.useContext(ColorModeContext);
    return (
        <Box
            sx={{
                display: 'flex',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'background.default',
                color: 'text.primary',
                borderRadius: 1,
                p: 3,
            }}
        >
            {theme.palette.mode} mode
            <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
                {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
        </Box>
    );
}

export default function ToggleColorMode() {
    const [mode, setMode] = React.useState('light');
    const colorMode = React.useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
            },
        }),
        [],
    );

    const palletType = darkState ? "dark" : "light";
    const mainPrimaryColor = darkState ? amber[600] : lightBlue[500];
    const mainSecondaryColor = darkState ? grey[900] : grey[50];

    const theme = React.useMemo(
        () =>
            createTheme({
                palette: {
                    type: palletType,
                    primary: {
                        main: mainPrimaryColor
                    },
                    secondary: {
                        main: mainSecondaryColor
                    }
                }
            })
            [mode],
    );

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <MyApp />
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}