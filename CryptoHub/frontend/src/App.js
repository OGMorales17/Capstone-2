import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import NavRoutes from "./components/NavRoutes";
import MiniDrawer from './components/MiniDrawer';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ColorModeContext from './auth/ColorModeContext';
import { makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@mui/material/CssBaseline';
import {
  lightBlue,
  amber,
  grey,
} from "@material-ui/core/colors";



const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(4),
  }
}))

export default function App() {
  const [mode, setMode] = React.useState('dark');
  const classes = useStyles()



  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === 'light'
            ? {
              // background: {
              //   paper: 'transparent'
              //   // paper: 'rgba(228, 232, 234, 0.2)'
              // },
              primary: {
                // main: 'rgb(41, 182, 246, 0.9)',
                main: lightBlue[400],
              },
              text: {
                primary: grey[900],
                secondary: grey[800],
              },
            }
            : {
              // background: {
              //   paper: 'transparent'
              //   // paper: 'rgba(0, 0, 0, 0.2)'
              // },
              primary: {
                // main: 'rgba(255, 160, 0, 0.9)',
                main: amber[700],
              },
              text: {
                primary: '#fff',
                secondary: grey[500],
              },
            }),
        },
      }),
    [mode],
  );


  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <div className={classes.root}>
            <MiniDrawer NavRoutes={NavRoutes} />
          </div>
        </BrowserRouter>
      </ThemeProvider>
    </ColorModeContext.Provider >
  );
}

