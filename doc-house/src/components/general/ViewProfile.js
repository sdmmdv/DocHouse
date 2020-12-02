import React, { Component} from 'react';
import { Grid, Cell} from 'react-mdl';
import axios from '../../axios';
import Navbar from './Navbar';
import { NavLink } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Loading from './Loading';
import TextField from '@material-ui/core/TextField';
import validateRequest from '../../validation/validateRequest';
import moment from 'moment';
import { Alert, AlertTitle } from '@material-ui/lab';
import Modal from '@material-ui/core/Modal';
import Rating from "@material-ui/lab/Rating";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import Box from "@material-ui/core/Box";
import LocalOfferIcon from '@material-ui/icons/LocalOffer';

import LanguageIcon from '@material-ui/icons/Language';
import BusinessIcon from '@material-ui/icons/Business';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import SchoolIcon from '@material-ui/icons/School';
import PhoneIcon from '@material-ui/icons/Phone';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core';
import {styles} from '../../styles/styleViewProfile';


//// FUnction to calculate the avreage
const average = (array) => (array.reduce((total,next) => (next !== null ? (total + next.rating) : 0), 0) / array.length).toFixed(2);


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
    submitted: false,
    status: '',
    showPayment: false
  };


  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState(() => ({ [name]: value }));
  };

  handleModalSubmit = async (e) => {
    e.preventDefault();
    try{
        const { subject, explanation, time } = this.state;
        const token = localStorage.getItem('auth-token');
        const userRes = await axios.get("/users/current-user", {
          headers: { "x-auth-token": token },
        });
        // console.log(this.state);
        // console.log(userRes.data);
        const creator_id = userRes.data.id;
        const receiver_id = this.props.location.pathname.split('/').pop();
        const creator_name = userRes.data.first_name + ' ' + userRes.data.last_name;
        const receiver_name = this.state.doctor.first_name + ' ' + this.state.doctor.last_name;
        const display_time = moment(time).format('DD MMM YYYY, hh:mm a');
        const app_fee = this.state.doctor.appointment_fee;
        const request = {creator_id, receiver_id, creator_name, receiver_name, subject, explanation, display_time, app_fee};
        //client side Request check
        const { errors, isValid } = validateRequest(request);
        if (!isValid) {
          this.setState({errors: errors})
        }

        else {
                  await axios.post(
                    "/requests/create-request", request,
                    {headers: { "x-auth-token": token },
                  }).then((res) => {
                    // console.log("RESPONSE ==== : ", res);
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
      const userRes = await axios.get("/users/current-user", {
        headers: { "x-auth-token": token },
      });
      const author = userRes.data.first_name + ' ' + userRes.data.last_name;
      const {doctor, opinion, rating} = this.state;
      const review = {author,opinion,rating};
      // console.log(doctor);
      try {
        axios.patch(`/general/post-review/${doctor._id}`, review, {headers: {"x-auth-token": token}})
        .then(() => {
          window.location.reload();
        })        
      } catch (error) {
        console.log(error);
      }
  }

  handleMessage = async (e) => {
    try {
      const {doctor} = this.state;
      const token = localStorage.getItem('auth-token');
      const userRes = await axios.get("/users/current-user", {
        headers: { "x-auth-token": token },
      });
      const user_name = userRes.data.first_name + ' ' + userRes.data.last_name;
      const doctor_name = doctor.first_name + ' ' + doctor.last_name;
      const user_id = userRes.data.id;
      const doctor_id = doctor._id;
      const members = [{"user_id": user_id, "user_name": user_name},{"user_id" : doctor_id, "user_name" : doctor_name}];
      const result = await axios.post("/chat/rooms/new",{members});
      console.log(result);
      if(result){
         this.props.history.push(`/chat/rooms/${result.data._id}`);
      }
    } catch (error) {
      console.log(error)
    }
  }

  setDoctorProfile = async () => {
    try {
        const token = localStorage.getItem('auth-token');  
        const doctorId = this.props.location.pathname.split('/').pop();
        const result_doctor = await axios.get(`/doctors/${doctorId}`,
                                    {headers: {"x-auth-token": token}});
                                
        // console.log(result_doctor);
        this.setState({doctor: result_doctor.data});
      } catch (err) {
        // console.log(err);
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
    // console.log(this.state);
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
        (  <div>
                <div className={classes.container}>
                       <Avatar src={require('../../assets/avatarDoctor.png')} className={classes.avatar}/>
                       <Typography variant="h3" >Dr. {doctor.first_name} {doctor.last_name}</Typography>
                       <Typography variant="h5" ><SchoolIcon className={classes.icons}/> {doctor.speciality}</Typography>
                       <Typography variant="h5" ><StarBorderIcon className={classes.icons} /> {doctor.reviews.length ? average(doctor.reviews) : '0.0'} ({doctor.reviews.length} reviews)</Typography>
                       <div className={classes.buttons}>
                            <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={this.handleModalOpen}
                                        >
                                        Review Doctor
                            </Button>
                            <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={this.handleMessage}
                                        >
                                        Message Doctor
                            </Button>
                       </div>
                </div>       
        <Grid >
          <Cell col={6}>
                    <div >
                           <hr className={classes.divider}/>
                       <Typography variant="h5" gutterBottom ><AccountBoxIcon className={classes.icons}/> Bio</Typography>
                       <Typography variant="body1" className={classes.text}>{doctor.bio}</Typography>
                           <hr className={classes.divider}/>
                       <Typography variant="h5" gutterBottom ><PhoneIcon className={classes.icons}/> Phone</Typography>
                       <Typography variant="body1" className={classes.text}>{doctor.phone_number}</Typography>
                           <hr className={classes.divider}/>
                       <Typography variant="h5" gutterBottom><MailOutlineIcon className={classes.icons}/> Email</Typography>
                       <Typography variant="body1" className={classes.text}>{doctor.email}</Typography>
                           <hr className={classes.divider}/>
                       <Typography variant="h5" gutterBottom><BusinessIcon className={classes.icons}/> Address</Typography>
                       <Typography variant="body1" className={classes.text}>{doctor.address}</Typography>
                           <hr className={classes.divider}/>
                       <Typography variant="h5" gutterBottom><LanguageIcon className={classes.icons}/> Web</Typography>
                       <Typography variant="body1" className={classes.text}>{doctor.web}</Typography>
                           <hr className={classes.divider}/>

                       <React.Fragment>
                                  <Accordion className={classes.expansion}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                  <Typography variant="h5">Reviews</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                <List className={classes.list}>
                                {(doctor.reviews).map(                             
                                                    review =>
                              <div key={review._id}>
                              <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                  <Avatar alt="user" className={classes.large} src={require('../../assets/avatarDoctor.png')} />
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
                              <hr className={classes.dividerReview}/>
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
                            <NavLink to="/user-dashboard" className={classes.link}>
                              {'Go back to dashboard'}
                            </NavLink>
                          </Typography>
                      </Alert>)
              : 
                (<main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography variant="h5">Make an appointment request</Typography>
                    <form onSubmit={this.handleModalSubmit} noValidate>

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
                          <div className={classes.paymentPaper}>
                            <Typography variant="subtitle1">
                                <LocalOfferIcon/> 
                                  &nbsp;Appointment Fee:&nbsp;
                            </Typography>
                            <Typography variant="body1" style={{color: '#4caf50'}}>
                                &nbsp;{doctor.appointment_fee + '$'}
                            </Typography>
                          </div>
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
                </Paper>
                </main>)
                }
          </Cell>
        </Grid>
        </div> )  : (<Loading/>)}
      </div>
    )
  }
}

export default withStyles(styles)(ViewProfile);