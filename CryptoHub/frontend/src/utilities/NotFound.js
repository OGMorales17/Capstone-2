import * as React from 'react';
import { Box } from "@mui/system";
import { makeStyles } from '@material-ui/core/styles'
import './NotFound.css'
import { Typography } from '@mui/material';
import BasicButtons from '../utilities/BasicButtons';



const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(8),
  },
}))


export default function NotFound() {
  const classes = useStyles()

  return (
    <div className="text-center">
      <div className={classes.root}>
        <Box sx={{ pt: 2 }}>
          <Typography variant="h2"
            style={{ color: "#b71c1c" }}
            sx={{ fontWeight: 'normal' }}>
            Error&nbsp;
            <Typography variant="h1" style={{ display: 'inline-block', color: "#b71c1c" }} sx={{ fontWeight: 'bold' }}>404</Typography>
          </Typography>
          <Typography variant="h5"
            style={{ color: "#b71c1c" }}
            sx={{ fontWeight: 'light', mt: 3 }}>
            Page Not Found
          </Typography>
        </Box>
        <Box sx={{ pt: 5 }}>
          <BasicButtons />
        </Box>
      </div>
    </div>
  );
}

/**
// <Box >
//   <Card>
//     <CardMedia
//       image={require('../img/glitch-backgroverlay.png')} />
//   </Card>
// </Box>
 */