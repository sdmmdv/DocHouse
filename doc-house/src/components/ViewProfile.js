import React, { Component} from 'react';
import { Grid, Cell, Icon} from 'react-mdl';
import axios from 'axios';
import '../Profile.css';
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
import Modal from '@material-ui/core/Modal';
import Rating from "@material-ui/lab/Rating";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import Box from "@material-ui/core/Box";


import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core';

const StyledRating = withStyles({
  iconFilled: {
    color: "#ff6d75"
  },
  iconHover: {
    color: "#ff3d47"
  }
})(Rating);

  //// FUnction to calculate the avreage
  const average = (array) => (array.reduce((total,next) => (next !== null ? (total + next.rating) : 0), 0) / array.length).toFixed(2);



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
      list: {
        flex: theme.spacing(1),
        width: 800,
        backgroundColor: theme.palette.background.paper,
      },
      expansion: {
        width: 600,
        boxShadow: theme.shadows[5],
      },
      inline: {
        display: 'inline',
      },
      large: {
        width: theme.spacing(6),
        height: theme.spacing(6),
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
  modalButton: {
    marginTop: theme.spacing(2)
  },
  modalPaper: {
    position: 'absolute',
    width: theme.spacing(65),
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
    borderRadius: theme.spacing(2),
    top: '50%',
    left: '50%',
    outline: 'none',
    transform: 'translate(-50%, -50%)'
  },
  formContainer: {
    alignItems: 'center',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  img: {
    width: 64,
    height: 64,
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
  editButton: {
    margin: theme.spacing(1),
    position: 'absolute',
    // left: '1vw',
    // top: '50vh'
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
    modalOpen: false,
    opinion: '',
    rating: 0,
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

  handleReviewSubmit = async (e) => {
      e.preventDefault();
      const token = localStorage.getItem('auth-token');
      const userRes = await axios.get("http://localhost:5000/users/current-user", {
        headers: { "x-auth-token": token },
      });
      const author = userRes.data.first_name + ' ' + userRes.data.last_name;
      const {doctor, opinion, rating} = this.state;
      const review = {author,opinion,rating};
      console.log(doctor);
      try {
        axios.patch(`http://localhost:5000/general/post-review/${doctor._id}`, review, {headers: {"x-auth-token": token}})
        .then(() => {
          window.location.reload();
        })        
      } catch (error) {
        console.log(error);
      }
  }

  handleMessage = async (e) => {
    // "members" : [
//     {"user_id" : "id1", "user_name" : "username1"},
//     {"user_id" : "id2", "user_name" : "username2"}
// ]
    try {
      const {doctor} = this.state;
      const token = localStorage.getItem('auth-token');
      const userRes = await axios.get("http://localhost:5000/users/current-user", {
        headers: { "x-auth-token": token },
      });
      const user_name = userRes.data.first_name + ' ' + userRes.data.last_name;
      const doctor_name = doctor.first_name + ' ' + doctor.last_name;
      const user_id = userRes.data.id;
      const doctor_id = doctor._id;
      const members = [{"user_id": user_id, "user_name": user_name},{"user_id" : doctor_id, "user_name" : doctor_name}];
      const room_id = await axios.post("http://localhost:5000/chat/rooms/new",{members});
      if(room_id){
         this.props.history.push(`/chat/rooms/${room_id}`);
      }
    } catch (error) {
      console.log(error)
    }
  }

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

  handleModalOpen = () => {
    this.setState({ modalOpen: true});
  };

  handleModalClose = () => {
    this.setState({ modalOpen: false });
  };



    componentDidMount(){
      this.setState({ loading: true });
      this.setDoctorProfile();
      setTimeout(() => {
          this.setState({ loading: false });
      }, 500); 
    }

  render() {
    const {classes} = this.props;
    const {errors, doctor, submitted, modalOpen} = this.state;
    console.log(this.state);
    return(
      <div>
        <Navbar/>
        <Modal
                  aria-labelledby="modal-title"
                  aria-describedby="modal-description"
                  open={modalOpen}
                  onClose={this.handleModalClose}
                  disableBackdropClick
                >
                  <div className={classes.modalPaper}>
                    <form
                      className={classes.formContainer}
                      autoComplete="off"
                      onSubmit={this.handleReviewSubmit}
                    >
                      <Typography
                        variant="title"
                        id="modal-title"
                        className={classes.spacing}
                      >
                        Evaluate the doctor's service
                      </Typography>
                      <Box component="fieldset"  margin="auto" borderColor="transparent">
                          <Rating
                            size="large"
                            name="rating"
                            precision={0.5}
                            onChange={this.handleInputChange}
                            emptyIcon={<StarBorderIcon fontSize="inherit" />}
                          />
                      </Box>
                      <TextField
                        fullWidth
                        multiline
                        className={classes.textField}
                        id="opinion"
                        label="Your Opinion"
                        margin="normal"
                        name="opinion"
                        onChange={this.handleInputChange}
                        placeholder="Share your own experience about the doctor."
                      />
                      <Button
                        fullWidth
                        color="primary"
                        className={classes.modalButton}
                        type="submit"
                        variant="contained"
                      >
                        Post
                      </Button>
                      <Button
                        fullWidth
                        className={classes.modalButton}
                        variant="contained"
                        onClick={this.handleModalClose}
                      >
                        Cancel
                      </Button>
                    </form>
                  </div>
                </Modal>
        {doctor ? 
        (<Grid >
          <Cell col={6}>
            <div style={{textAlign: 'center'}}>
              <img className="container-div"
                src={require('../assets/avatarDoctor.png')}
                alt="avatar"
                style={{height: '200px'}}
                 />
            </div>
             <Button
                        variant="contained"
                        // className={classes.editButton}
                        onClick={this.handleModalOpen}
                        >
                        Review Doctor
             </Button>
             <Button
                        variant="contained"
                        // className={classes.editButton}
                        onClick={this.handleMessage}
                        >
                        Message Doctor
             </Button>
                    <div >
                        <h2 className={classes.topHeader}>Dr. {doctor.first_name} {doctor.last_name}</h2>
                        <h3 >{doctor.speciality}</h3>
                        <h4 > <StarBorderIcon fontSize="inherit" /> {doctor.reviews.length ? average(doctor.reviews) : '0.0'} ({doctor.reviews.length} reviews)</h4>
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
                            <hr className={classes.divider}/>
                            <React.Fragment>
                                  <Accordion className={classes.expansion}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                  <Typography variant="h5" className={classes.heading}>Reviews</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                <List className={classes.list}>
                                {(doctor.reviews).map(                             
                                                    review =>
                              <div key={review._id}>
                              <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                  <Avatar alt="user" className={classes.large} src={require('../assets/avatarDoctor.png')} />
                                </ListItemAvatar>
                                <ListItemText
                                  primary={review.author}
                                  secondary={
                                    <React.Fragment>
                                      <Box component="fieldset"  margin="auto" borderColor="transparent">
                                                  <Rating
                                                    readOnly
                                                    size="small"
                                                    name="rating"
                                                    value={review.rating}
                                                    precision={0.5}
                                                    emptyIcon={<StarBorderIcon fontSize="inherit" />}
                                                  />
                                        </Box>
                                                      <Typography component="span" variant="body2" className={classes.inline}>
                                                            {review.opinion}
                                                      </Typography>
                                                      
                                    
                                    </React.Fragment>
                                  }
                                />
                              </ListItem>
                              <hr className={classes.divider}/>
                              </div>)}
                            </List>
                                </AccordionDetails>
                              </Accordion>
                          </React.Fragment>
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