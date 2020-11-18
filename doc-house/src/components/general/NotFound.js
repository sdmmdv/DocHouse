import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Navbar from './Navbar';

const styles = theme => ({
  container: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    height: '400px',
    justifyContent: 'center',
    left: '50%',
    outline: 'none',
    position: 'absolute',
    textAlign: 'center',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    padding: theme.spacing(3),
    boxShadow: theme.shadows[3]
  }
});

class NotFound extends Component {
  render() { 
    const {classes} = this.props;
    return ( 
        <div>
            <Navbar/>
            <main className={classes.layout}>
            <Paper className={classes.container}>
                <Typography variant="h1">404</Typography>
                <Typography variant="h4">Page Not Found</Typography>
                <Typography variant="subtitle1">
                    The page you are looking for was not found.
                </Typography>
            </Paper>
            </main>
        </div>
     );
  }
}

export default withStyles(styles)(NotFound);
