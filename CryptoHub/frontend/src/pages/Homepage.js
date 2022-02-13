import Container from "@material-ui/core/Container";
import Banner from "../components/Banner";
import { Box } from "@mui/system";
import { makeStyles } from '@material-ui/core/styles'
import "./Homepage.css";


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(8),
  },
  seeMore: {
    marginTop: theme.spacing(3)
  },
}))

function Homepage() {
  const classes = useStyles()


  return (
    <div className="container" >
      <div className={classes.root}>
        <Box sx={{ pt: 8 }}>
          <Banner text={'Get all the Info regarding your favorite Crypto Currency'} />
          <Container maxWidth="lg" className={classes.container}>
            {/* <Search /> */}
          </Container>
        </Box>
      </div>
    </div>
  );
}



export default Homepage;
