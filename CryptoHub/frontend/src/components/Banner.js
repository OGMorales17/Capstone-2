import { Container, makeStyles, Typography } from "@material-ui/core";
import { Box } from "@material-ui/core";


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(),
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4)
    },
}));

function Banner(props) {
    const classes = useStyles();

    return (
        <div >
            <Box sx={{ width: '100%', textAlign: 'center' }}>
                <Container maxWidth="md">
                    <div className={classes.root}>
                        <Typography variant="h2" gutterBottom>
                            CryptoHub
                        </Typography>
                        <Typography
                            variant="subtitle2"
                            style={{
                                color: "darkgrey",
                                textTransform: "capitalize",
                            }}
                        >
                            {props.text}
                        </Typography>
                    </div>
                </Container>
            </Box>
        </div>
    );
}

export default Banner;