import React, { Component, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
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
import UserContext from '../context/userContext';
import ValidateLogin from '../validation/validateLogin';
import Navbar from '../components/Navbar';

const formLabelsTheme = createMuiTheme({
  overrides: {
    MuiFormLabel: {
      asterisk: {
        color: '#db3131',
        '&$error': {
          color: '#db3131'
        },
      }
    }
  }
})

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
    boxShadow: theme.shadows[5]
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  submit: {
    marginTop: theme.spacing(3)
  },
  link: {
    textDecoration: 'none'
  },
  footer: {
    marginTop: theme.spacing(2)
  },
  errorText: {
    color: '#D50000',
    marginTop: '5px'
  }
});

class LoginPageUser extends Component {
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
    const loginUser = { email, password };

    //client side error check
    const { errors, isValid } = ValidateLogin(loginUser);
    console.log(errors, isValid);
    //return login validation errors
    if (!isValid) {
      this.setState({errors: errors})
    }
        else {

        try {
          const loginRes = await axios.post(
            "http://localhost:5000/users/login",
            loginUser
          );
          
          this.setState({
            token: loginRes.data.token,
            user: loginRes.data.user,
          });
          localStorage.setItem("auth-token", loginRes.data.token);
          this.props.history.push("/");
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
    console.log(this.state)

    return (
      <React.Fragment>
        <Navbar/>
        <CssBaseline />
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockIcon />
            </Avatar>
            <Typography variant="h5">Sign in - User</Typography>
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

export default withStyles(styles)(LoginPageUser);
