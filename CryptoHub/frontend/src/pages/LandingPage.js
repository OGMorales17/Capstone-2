import { Box } from "@mui/system";
import { makeStyles } from '@material-ui/core/styles'
import "./LandingPage.css";


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(8),
  },
  seeMore: {
    marginTop: theme.spacing(3)
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
}))

function Homepage() {
  const classes = useStyles()

  return (
    <Box sx={{ pt: 8 }}>
      <div className="container" >
        <div className={classes.root}>
        </div>
      </div>
    </Box>
  );
}

export default Homepage;
