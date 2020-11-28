import React, { Component} from 'react';
import { NavLink } from 'react-router-dom';
import axios from '../../axios';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import ValidateLogin from '../../validation/validateLogin';
import Navbar from '../general/Navbar';
import {styles} from '../../styles/styleLoginPageDoctor';


const formLabelsTheme = createMuiTheme({
    overrides: {
      MuiFormLabel: {
        asterisk: {
          color: '#4caf50',
          '&$error': {
            color: '#4caf50'
          },
        }
      }
    },
    palette: {
      error: {
        main: '#4caf50',
      },
  },
})

class LoginPageDoctor extends Component {
  state = {
    email: '',
    password: '',
    errors: {}
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState(() => ({ [name]: value }));
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    const loginDoctor = { email, password };

    //client side error check
    const { errors, isValid } = ValidateLogin(loginDoctor);
    //return login validation errors
    if (!isValid) {
      this.setState({errors: errors})
    }
        else {

        try {
          const loginRes = await axios.post(
            "/doctors/login",
            loginDoctor
          );
          
          this.setState({
            token: loginRes.data.token,
            doctor: loginRes.data.doctor,
          });
          localStorage.setItem("auth-token", loginRes.data.token);
          this.props.history.push("/doctor-dashboard");
        } catch (err) {
          if(err.response.data.error_type === 'password'){
            this.setState(prevState => {
              let errors = Object.assign({}, prevState.errors);  
              errors.password = err.response.data.errors;
              errors.email = '';                                       
              return { errors };   
            })
          }

          else if(err.response.data.error_type === 'email'){
            this.setState(prevState => {
              let errors = Object.assign({}, prevState.errors);  
              errors.email = err.response.data.errors;   
              errors.password = '';                 
              return { errors };
            })
          }
        }
      }
  };

  render() {
    const { classes } = this.props;
    const { errors } = this.state;

    return (
      <React.Fragment>
        <Navbar/>
        <CssBaseline />
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockIcon />
            </Avatar>
            <Typography variant="h5">Sign in - Doctor</Typography>
            <MuiThemeProvider theme={formLabelsTheme}>
            <form onSubmit={this.handleSubmit} noValidate>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="email">Email Address</InputLabel>
                <Input
                  onChange={this.handleInputChange}
                  id="email"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  error={!!errors.email}
                />
                <span className={classes.errorText}>{errors.email}</span>
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input
                  onChange={this.handleInputChange}
                  name="password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  error={!!errors.password}
                />
                <span className={classes.errorText}>{errors.password}</span>
              </FormControl>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Log In
              </Button>
            </form>
            </MuiThemeProvider>
            <Typography className={classes.footer} variant="body1">
              <NavLink to="/log-transition" className={classes.link}>
                  {'Don\'t have an account? Sign up here.'}
              </NavLink>
            </Typography>
          </Paper>
        </main>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(LoginPageDoctor);
