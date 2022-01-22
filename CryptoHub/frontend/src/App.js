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

export const TOKEN_STORAGE_ID = "cryptohub-token";

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
              primary: {
                main: lightBlue[400],
              },
              text: {
                primary: grey[900],
                secondary: grey[800],
              },
            }
            : {
              primary: {
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




/**
 * Another approach
 
  const mainPrimaryColor = mode === 'dark' ? amber[700] : lightBlue[500];
  const mainSecondaryColor = mode === 'dark' ? grey[900] : grey[50];


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
        type: colorMode,
        palette: {
          mode,
          primary: {
            main: mainPrimaryColor,
          },
          secondary: {
            main: mainSecondaryColor,
          }

        },
      }),
    [mode],
  );
 */