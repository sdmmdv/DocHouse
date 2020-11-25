import React, { Component } from 'react';
import axios from 'axios';
import '../../Profile.css';
import Navbar from '../general/Navbar';
import Loading from '../general/Loading';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import LanguageIcon from '@material-ui/icons/Language';
import BusinessIcon from '@material-ui/icons/Business';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import SchoolIcon from '@material-ui/icons/School';
import {Avatar} from '@material-ui/core';
import PhoneIcon from '@material-ui/icons/Phone';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';



const styles = theme => ({
  container: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    outline: 'none',
    padding: theme.spacing(6),
    margin: 'auto',
  },
  link: {
    textDecoration: 'none',
    color: '#3f51b5'
  },
  divider: {
    borderTop: '3px solid  #4caf50',
    width: '60%',
    margin: theme.spacing(2)
  },
  saveButton: {
    margin: theme.spacing(1)
  },
  formContainer: {
    alignItems: 'center',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  buttons: {
    alignItems: 'center',
    marginBottom: theme.spacing(3)
  },
  icons: {
    paddingBottom: '0.2em'
  },
  text: {
    maxWidth: "60%",
  },
  avatar: {
    margin: theme.spacing(5),
    height: theme.spacing(25),
    width: theme.spacing(25),
  },
  modalPaper: {
    position: 'absolute',
    width: theme.spacing(50),
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
    top: '50%',
    left: '50%',
    outline: 'none',
    transform: 'translate(-50%, -50%)',
    maxHeight: '80vh',
    overflow: 'scroll'
  },
});


class DoctorProfile extends Component {
  state = {
    doctor: undefined,
    token: undefined,
    speciality: '',
    bio: '',
    address: '',
    phone_number: '',
    appointment_fee: 0,
    web: '',
    modalOpen: false,
    loading:  true
  };

  checkDoctor = async () => {
            let token = localStorage.getItem("auth-token");
            if (token === null) {
            localStorage.setItem("auth-token", "");
            token = "";
            }
        const tokenRes = await axios.post(
          "http://localhost:5000/general/tokenIsValid",
          null,
          { headers: { "x-auth-token": token } }
        );
            
        // console.log(tokenRes.data);
        if (tokenRes.data.isValid) {
          const doctorRes = await axios.get("http://localhost:5000/doctors/current-doctor", {
            headers: { "x-auth-token": token },
          });
          // console.log(doctorRes);
          this.setState({
            token: token,
            doctor: doctorRes.data,
            speciality: doctorRes.data.speciality,
            bio: doctorRes.data.bio,
            address: doctorRes.data.address,
            phone_number: doctorRes.data.phone_number,
            web: doctorRes.data.web,
            appointment_fee: doctorRes.data.appointment_fee,
          });
        }
    }

    componentDidMount(){
      this.setState({ loading: true });
      this.checkDoctor();
      setTimeout(() => {
          this.setState({ loading: false });
      }, 500); 
    }

    handleChange = (event) => {
      const { name, value } = event.target;
      this.setState(() => ({ [name]: value }));
    };

    handleModalOpen = () => {
      this.setState({ modalOpen: true });
    };
  
    handleModalClose = () => {
      this.setState({ modalOpen: false });
    };

    handleSubmit = async (e) => {
      e.preventDefault();
      const {doctor,token,speciality, bio, address, phone_number, web, appointment_fee} = this.state;
      const updates = {
        speciality,
        bio,
        address, 
        phone_number,
        web,
        appointment_fee
      };

      try {
        axios.patch(`http://localhost:5000/doctors/${doctor.id}`, updates, {headers: {"x-auth-token": token}})
        .then(() => {
          window.location.reload();
        })
      } catch (error) {
        console.log(error);
      }
    };

  render() {
    const {classes} = this.props;
    const {doctor, modalOpen} = this.state;
    // console.log(this.state);
    return(
      <div>
        <Navbar/>
        {doctor && <Modal
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
          open={modalOpen}
          onClose={this.handleModalClose}
        >
          <div className={classes.modalPaper}>
            <form
              className={classes.formContainer}
              autoComplete="off"
              onSubmit={this.handleSubmit}
            >
              <Typography
                variant="title"
                id="modal-title"
                className={classes.spacing}
              >
                Edit Profile
              </Typography>
              <TextField
                required
                fullWidth
                className={classes.textField}
                defaultValue= {doctor.speciality}
                id="speciality"
                label="Speciality"
                margin="normal"
                name="speciality"
                onChange={this.handleChange}
                placeholder="Enter your speciality."
              />
              <TextField
                required
                fullWidth
                className={classes.textField}
                defaultValue= {doctor.address}
                id="address"
                label="Address"
                margin="normal"
                name="address"
                onChange={this.handleChange}
                placeholder="Enter your home address."
              />
              <TextField
                required
                fullWidth
                className={classes.textField}
                defaultValue= {doctor.phone_number}
                id="phone_number"
                label="Phone number"
                margin="normal"
                name="phone_number"
                onChange={this.handleChange}
                placeholder="Enter your phone number."
              />
                <TextField
                  required
                  defaultValue= {doctor.appointment_fee}
                  fullWidth
                  id="appointment_fee"
                  label="Appointment fee ($)"
                  name="appointment_fee"
                  type="number"
                  margin="normal"
                  onChange={this.handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
               />
              <TextField
                required
                fullWidth
                className={classes.textField}
                defaultValue= {doctor.web}
                id="web"
                label="Web"
                margin="normal"
                name="web"
                onChange={this.handleChange}
                placeholder="Enter your Web, Blog etc."
              />
              <TextField
                required
                fullWidth
                multiline
                className={classes.textField}
                defaultValue={doctor.bio}
                id="bio"
                label="Bio"
                margin="normal"
                name="bio"
                onChange={this.handleChange}
                placeholder="Enter you Biography."
              />
              <Button
                fullWidth
                color="primary"
                className={classes.saveButton}
                type="submit"
                variant="contained"
              >
                Save
              </Button>
              <Button
                fullWidth
                className={classes.saveButton}
                variant="contained"
                onClick={this.handleModalClose}
              >
                Cancel
              </Button>
            </form>
          </div>
        </Modal> }

            {doctor ? 
                    (<div className={classes.container}>
                        <Avatar src={require('../../assets/avatarDoctor.png')} className={classes.avatar}/>
                        <div className={classes.buttons}>
                          <Button
                              variant="contained"
                              color="primary"
                              onClick={this.handleModalOpen}
                              >
                              Edit Profile
                          </Button>
                        </div>

                       <Typography variant="h3" className={classes.text}>Dr. {doctor.first_name} {doctor.last_name}</Typography>
                       <Typography variant="h5" className={classes.text}><SchoolIcon className={classes.icons}/> {doctor.speciality}</Typography>
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
                       <Typography variant="h5" gutterBottom ><LocalOfferIcon className={classes.icons}/> Appointment Fee</Typography>
                       <Typography variant="body1" className={classes.text}>{doctor.appointment_fee} $</Typography>
                    </div>) : <Loading/>}
              </div>
    )
  }
}

export default withStyles(styles)(DoctorProfile);