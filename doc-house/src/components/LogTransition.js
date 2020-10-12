import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
  layout: {
    width: 'auto',
    display: 'block',
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.up(400 + theme.spacing(6))]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  },
  paper: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    padding: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: theme.spacing(50),
    backgroundColor: 'theme.palette.background.paper',
    boxShadow: theme.shadows[6]
  },
  submit: {
    marginTop: theme.spacing(3),
  },
  link: {
    textDecoration: 'none'
  },
  footer: {
    marginTop: theme.spacing(2)
  }
});

class LogTransition extends Component {
    
    render() { 
      const { classes } = this.props;

        return ( 
      <React.Fragment>
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