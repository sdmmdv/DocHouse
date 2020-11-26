import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Navbar from './Navbar';
import {styles} from '../../styles/styleLogTransition';


class LogTransition extends Component {
    
    render() { 
      const { classes } = this.props;

        return ( 
      <React.Fragment>
        <Navbar/>
        <CssBaseline />
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography variant="h4">Log Options</Typography>
              <br/>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                href="/signup-user"
                className={classes.submit}
              >
                Register as a User
              </Button>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                href="/signup-doctor"
                className={classes.submit}
              >
                Register as a Doctor
              </Button>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                href="/login-user"
                className={classes.submit}
              >
                Log in as a User
              </Button>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                href="/login-doctor"
                className={classes.submit}
              >
                Log in as a Doctor
              </Button>
          </Paper>
        </main>
      </React.Fragment>
         );
    }
}
 
export default (withStyles(styles)(LogTransition));