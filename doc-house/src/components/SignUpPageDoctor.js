import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Avatar from '@material-ui/core/Avatar';
import LockIcon from '@material-ui/icons/LockOutlined';
import validateSignupDoctor from '../validation/validateSignUpDoctor';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import axios from 'axios';
import Navbar from '../components/Navbar';



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
    transform: 'translate(0%, 10%)',
    padding: theme.spacing(6),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: theme.spacing(50),
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[6],
  },
  avatar: {
    margin: theme.spacing(),
    backgroundColor: theme.palette.success.main
  },
  submit: {
    marginTop: theme.spacing(3)
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.success.main
  },
  footer: {
    marginTop: theme.spacing(2)
  },
  errorText: {
    color: '#4caf50',
    marginTop: '5px'
  },
  successText: {
    color: '#ff9800',
    marginTop: '10px',
    textDecoration: 'none'
  }
});

class SignUpPageDoctor extends Component {
  state = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    passwordConfirm: '',
    errors: {},
    successPage: false
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState(() => ({ [name]: value }));
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { first_name, last_name, phone_number, email, password, passwordConfirm } = this.state;
    const doctor = {
      first_name,
      last_name,
      phone_number,
      email,
      password,
      passwordConfirm
    };

    //client side error check
    const { errors, isValid } = validateSignupDoctor(doctor);
    //return login validation errors
    if (!isValid) {
      this.setState({errors: errors})
    }

    else {

      try {
        await axios.post(
          "http://localhost:5000/doctors/signup", doctor
        );
        this.setState({
          errors: {},
          successPage: true
        })
      } catch (err) {
          console.log(err.response.data.errors);
          this.setState({errors : {}});
          this.setState(prevState => {
            let errors = Object.assign({}, prevState.errors);  
            errors.email = err.response.data.errors;                                    
            return { errors };   
          })
      }
    }
  };

  render() {
    const { classes } = this.props;
    const { errors, successPage } = this.state;

    return (
      <React.Fragment>
        <Navbar/>
        <CssBaseline />
        <main className={classes.layout}>
          <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
              <LockIcon />
            </Avatar>
            <Typography variant="h5">Sign Up - Doctor</Typography>
            {successPage && (
              <NavLink to="/login" className={classes.successText}>
                Successfull registration! Click here to log in.
              </NavLink>
            )}
            <MuiThemeProvider theme={formLabelsTheme}>
            <form onSubmit={this.handleSubmit} noValidate>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="name">First Name</InputLabel>
                <Input
                  onChange={this.handleInputChange}
                  id="first_name"
                  name="first_name"
                  autoComplete="name"
                  autoFocus
                  error={!!errors.first_name}
                />
                <span className={classes.errorText}>{errors.first_name}</span>
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="name">Last Name</InputLabel>
                <Input
                  onChange={this.handleInputChange}
                  id="last_name"
                  name="last_name"
                  autoComplete="name"
                  error={!!errors.last_name}
                />
                <span className={classes.errorText}>{errors.last_name}</span>
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="phone_number">Phone Number</InputLabel>
                <Input
                  onChange={this.handleInputChange}
                  id="phone_number"
                  name="phone_number"
                  autoComplete="phone_number"
                  error={!!errors.phone_number}
                />
                <span className={classes.errorText}>{errors.phone_number}</span>
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="email">E-mail Address</InputLabel>
                <Input
                  onChange={this.handleInputChange}
                  id="email"
                  name="email"
                  autoComplete="email"
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
                  error={!!errors.password} //not defined - > false
                />
                <span className={classes.errorText}>{errors.password}</span>
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password">Confirm Password</InputLabel>
                <Input
                  onChange={this.handleInputChange}
                  name="passwordConfirm"
                  type="password"
                  id="passwordConfirm"
                  autoComplete="current-password-confirm"
                  error={!!errors.passwordConfirm} //not defined - > false
                />
                <span className={classes.errorText}>
                  {errors.passwordConfirm || errors.error}
                </span>
              </FormControl>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Register
              </Button>
            </form>
            </MuiThemeProvider>
            <Typography className={classes.footer} variant="body1">
              <NavLink to="/log-transition" className={classes.link}>
                {'Already have an account? Log in here. '}
              </NavLink>
            </Typography>
          </Paper>
        </main>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(SignUpPageDoctor);
