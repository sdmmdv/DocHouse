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
import validateSignupDoctor from '../../validation/validateSignUpDoctor';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import axios from '../../axios';
import Navbar from '../general/Navbar';
import Specs from '../../assets/specialities';
import { Alert, AlertTitle } from '@material-ui/lab';
import {styles} from '../../styles/styleSignUpPageDoctor';



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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

class SignUpPageDoctor extends Component {
  state = {
    first_name: '',
    last_name: '',
    email: '',
    speciality: '',
    address: '',
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
    const { first_name, last_name, phone_number, email,speciality, address, password, passwordConfirm } = this.state;
    const doctor = {
      first_name,
      last_name,
      phone_number,
      email,
      speciality,
      address,
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
          "/doctors/signup", doctor
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
                    <InputLabel id="demo-mutiple-name-label">Speciality</InputLabel>
                    <Select 
                    labelId="demo-mutiple-name-label"
                    id="demo-mutiple-name"
                    name="speciality"
                    onChange={this.handleInputChange}
                    value={this.state.speciality}
                    error={!!errors.speciality}
                    MenuProps={MenuProps}
                    >
                    {Specs.map((spec) => (
                        <MenuItem key={spec} value={spec}>
                        {spec}
                        </MenuItem>
                    ))}
                    </Select>
                    <span className={classes.errorText}>{errors.speciality}</span>
                </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="address">Work Address</InputLabel>
                <Input
                  onChange={this.handleInputChange}
                  id="address"
                  name="address"
                  autoComplete="address"
                  error={!!errors.address}
                />
                <span className={classes.errorText}>{errors.address}</span>
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
