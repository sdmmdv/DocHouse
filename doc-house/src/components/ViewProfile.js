import React, { Component} from 'react';
import { Grid, Cell, Icon} from 'react-mdl';
import axios from 'axios';
import '../App.css';
import Navbar from './Navbar';
import { NavLink } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import SearchIcon from '@material-ui/icons/Search';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import amber from '@material-ui/core/colors/amber';
import lime from '@material-ui/core/colors/lime';
import ButtonBase from '@material-ui/core/ButtonBase';
import Loading from './Loading';
import TextField from '@material-ui/core/TextField';
import ValidateRequest from '../validation/validateRequest';
import validateRequest from '../validation/validateRequest';
import moment from 'moment';
import { Alert, AlertTitle } from '@material-ui/lab';



const formLabelsTheme = createMuiTheme({
    palette: {
      error: {
        main: '#4caf50',
      },
        primary: amber,
        secondary: lime,
  }
})

const styles = theme => ({
    divider: {
        borderTop: '3px solid #4caf50',
        width: '50%'
      },
      topHeader: {
        paddingTop: '2em'
      },
  container: {
    display: 'flex',
    marginTop: '20px',
    marginBottom: '20px',
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 800,
    flexDirection: 'column',
    backgroundColor: 'theme.palette.background.paper',
    boxShadow: theme.shadows[5],
    transform: 'translate(0%, 250%)',
  },

  notFound: {
    marginTop: '100px',
    marginBottom: '50px',
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: theme.spacing(2),
    maxWidth: 800,
    transform: 'translate(0%, 250%)',
    boxShadow: theme.shadows[3],
    backgroundColor: 'theme.palette.background.paper'
  },
  img: {
    width: 128,
    height: 128,
  },
  layout: {
    width: 'auto',
    display: 'block',
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
  },
  paper: {
    position: 'relative',
    padding: theme.spacing(4),
    flexDirection: 'column',
    backgroundColor: 'theme.palette.background.paper',
    boxShadow: theme.shadows[5]
  },
  submit: {
    marginTop: theme.spacing(3)
  },
  alert: {
    color: theme.palette.success.main,
    fontSize: '2.2rem',
    "& .MuiAlert-icon": {
      fontSize: '3rem'
    }
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
});


class ViewProfile extends Component {
  state = {
    doctor: undefined,
    errors: {},
    subject: '',
    explanation: '',
    time: '2021-01-01T11:30',
    loading:  true,
    submitted: false
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState(() => ({ [name]: value }));
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    try{
        const { subject, explanation, time } = this.state;
        const token = localStorage.getItem('auth-token');
        const userRes = await axios.get("http://localhost:5000/users/current-user", {
          headers: { "x-auth-token": token },
        });
        console.log(this.state);
        console.log(userRes.data);
        const creator_id = userRes.data.id;
        const receiver_id = this.props.location.pathname.split('/').pop();
        const creator_name = userRes.data.first_name + ' ' + userRes.data.last_name;
        const receiver_name = this.state.doctor.first_name + ' ' + this.state.doctor.last_name;
        const display_time = moment(time).format('DD MMM YYYY, hh:mm a')
        const request = {creator_id, receiver_id, creator_name, receiver_name, subject, explanation, display_time};
        //client side Request check
        const { errors, isValid } = validateRequest(request);
        if (!isValid) {
          this.setState({errors: errors})
        }

        else {
          await axios.post(
            "http://localhost:5000/requests/create-request", request,
            {headers: { "x-auth-token": token },
          }).then((res) => {
            console.log("RESPONSE ==== : ", res);
          }); 
          this.setState({submitted: true});
        }
      } catch (err) {
        console.log(err);
      }
  };

  setDoctorProfile = async () => {
    try {
        const token = localStorage.getItem('auth-token');  
        const doctorId = this.props.location.pathname.split('/').pop();
        const result_doctor = await axios.get(`http://localhost:5000/doctors/${doctorId}`,
                                    {headers: {"x-auth-token": token}});
                                
        // console.log(result_doctor);
        this.setState({doctor: result_doctor.data});
      } catch (err) {
        console.log(err);
      }
  }

    componentDidMount(){
      this.setState({ loading: true });
      this.setDoctorProfile();
      setTimeout(() => {
          this.setState({ loading: false });
      }, 500); 
    }

  render() {
    const {classes} = this.props;
    const {errors, doctor, submitted} = this.state;
    console.log(this.state);
    return(
      <div>
        <Navbar/>
        {doctor ? 
        (<Grid >
          <Cell col={6}>
            <div style={{textAlign: 'center'}}>
              <img className="container-div"
                src={require('../assets/avatarDoctor.png')}
                alt="avatar"
                style={{height: '200px', margin: 'auto'}}
                 />
            </div>
                    <div >
                        <h2 className={classes.topHeader}>Dr. {doctor.first_name} {doctor.last_name}</h2>
                        <h3 >{doctor.speciality}</h3>
                        <h5 >Bio <Icon name="portrait"/></h5>
                        <hr className={classes.divider}/>
                          <p>{doctor.bio}</p>
                        <hr className={classes.divider}/>
                        <h5>Phone <Icon name="phone"/></h5>
                            <p>{doctor.phone_number}</p>
                        <hr className={classes.divider}/>
                        <h5>Email <Icon name="email"/></h5>
                            <p>{doctor.email}</p>
                        <hr className={classes.divider}/>
                        <h5>Address <Icon name="home"/></h5>
                            <p>1 Hacker Way Menlo Park, 94025</p>
                        <hr className={classes.divider}/>
                        <h5>Web <Icon name="language"/></h5>
                            <p>somewebsite.com</p>
                    </div>
          </Cell>
          <Cell col={6}>
            {submitted ? 
                      (<Alert severity="success" className={classes.alert}>
                          <AlertTitle className={classes.alert}>Success!</AlertTitle>
                          <Typography variant="body1">Your appointment has been registered.</Typography>
                          <Typography className={classes.footer} variant="body1">
                            <NavLink to="/" className={classes.link}>
                              {'Go back to homepage'}
                            </NavLink>
                          </Typography>
                      </Alert>)
              :
                (<main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography variant="h5">Make an appointment request</Typography>
                    <MuiThemeProvider theme={formLabelsTheme}>
                    <form onSubmit={this.handleSubmit} noValidate>

                    <FormControl margin="normal" fullWidth>
                        <TextField 
                            label="What is the type of your visit?" 
                            variant="outlined"
                            name="subject"
                            onChange={this.handleInputChange}
                            error={!!errors.subject}
                            />
                          <span className={classes.errorText}>{errors.subject}</span>
                    </FormControl>
                    <FormControl margin="normal" fullWidth>
                    <TextField
                        id="filled-multiline-static"
                        label="Explain details of your health problem."
                        multiline
                        rows={4}
                        variant="outlined"
                        name="explanation"
                        onChange={this.handleInputChange}
                        error={!!errors.explanation}
                        />
                        <span className={classes.errorText}>{errors.explanation}</span>
                    </FormControl>
                    <FormControl margin="normal" fullWidth>
                        <TextField
                            id="datetime-local"
                            label="Select appointment time."
                            type="datetime-local"
                            defaultValue="2021-01-01T11:30"
                            InputLabelProps={{
                            shrink: true,
                            }}
                            name="time"
                            onChange={this.handleInputChange}
                            error={!!errors.time}
                        />
                        <span className={classes.errorText}>{errors.time}</span>
                    </FormControl>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Book
                    </Button>
                    </form>
                    </MuiThemeProvider>
                </Paper>
                </main>)}
          </Cell>
        </Grid>)  : (<Loading/>)}
      </div>
    )
  }
}

export default withStyles(styles)(ViewProfile);