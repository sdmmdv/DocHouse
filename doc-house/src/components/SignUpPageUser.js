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
import validateSignupUser from '../validation/validateSignupUser';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { Alert, AlertTitle } from '@material-ui/lab';
import axios from 'axios';
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
    transform: 'translate(0%, 10%)',
    padding: theme.spacing(6),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: theme.spacing(50),
    backgroundColor: 'theme.palette.background.paper',
    boxShadow: theme.shadows[6],
  },
  avatar: {
    margin: theme.spacing(),
    backgroundColor: theme.palette.secondary.main
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
    color: '#D50000',
    marginTop: '5px'
  },
  successText: {
    color: '#32971E',
    marginTop: '10px',
    textDecoration: 'none'
  }
});

class SignUpPageUser extends Component {
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
    const { first_name, last_name, email, password, passwordConfirm } = this.state;
    const user = {
      first_name,
      last_name,
      email,
      password,
      passwordConfirm
    };

    //client side error check
    const { errors, isValid } = validateSignupUser(user);
    //return login validation errors
    if (!isValid) {
      this.setState({errors: errors})
    }

    else {

      try {
        await axios.post(
          "http://localhost:5000/users/signup", user
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
            <Typography variant="h5">Sign Up - User</Typography>
            {successPage && (
              <Alert severity="success" className={classes.successText}>
                <AlertTitle className={classes.link}>Successfull registration!</AlertTitle>
                    <NavLink to="/log-transition" className={classes.link}>
                      {'Click here to log in.'}
                    </NavLink>
              </Alert>
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

export default withStyles(styles)(SignUpPageUser);
