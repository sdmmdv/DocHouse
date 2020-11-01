import React, { Component } from 'react';
import { Grid, Cell, Icon} from 'react-mdl';
import axios from 'axios';
import '../App.css';
import Navbar from './Navbar';
import Loading from './Loading';
import { withStyles } from '@material-ui/core/styles';
import LinkIcon from '@material-ui/icons/Link';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import FormControlLabel from '@material-ui/core/FormControlLabel';



const styles = theme => ({
  divider: {
    borderTop: '3px solid  #4caf50',
    width: '50%'
  },
  topHeader: {
    paddingTop: '2em'
  },
  editButton: {
    margin: theme.spacing(1),
    position: 'absolute',
    // left: '1vw',
    // top: '50vh'
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
  paper: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    height: 140,
    justifyContent: 'center',
    width: '33.3%'
  },
  modalPaper: {
    position: 'absolute',
    width: theme.spacing(50),
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.spacing(2),
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
    top: '50%',
    left: '50%',
    outline: 'none',
    transform: 'translate(-50%, -50%)'
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
            
        console.log(tokenRes.data);
        if (tokenRes.data.isValid) {
          const doctorRes = await axios.get("http://localhost:5000/doctors/current-doctor", {
            headers: { "x-auth-token": token },
          });
          this.setState({
            token: token,
            doctor: doctorRes.data,
            speciality: doctorRes.data.speciality,
            bio: doctorRes.data.bio,
            address: doctorRes.data.address,
            phone_number: doctorRes.data.phone_number,
            web: doctorRes.data.web,
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
      const {doctor,token,speciality, bio, address, phone_number, web} = this.state;
      const updates = {
        speciality,
        bio,
        address, 
        phone_number,
        web
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
    console.log(this.state);
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
        <Grid >
          <Cell col={6}>
            <div style={{textAlign: 'center'}}>
              <img className="container-div"
                src={require('../assets/avatarDoctor.png')}
                alt="avatar"
                style={{height: '200px', margin: 'auto'}}
                 />
            </div>
            {doctor ? 
                    (<div >
                        <Button
                            variant="contained"
                            className={classes.editButton}
                            onClick={this.handleModalOpen}
                            >
                            Edit Profile
                        </Button>
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
                            <p>{doctor.address}</p>
                        <hr className={classes.divider}/>
                        <h5>Web <Icon name="language"/></h5>
                            <p>{doctor.web}</p>
                    </div>) : <Loading/>}
          </Cell>
          {/* <Cell className="button_placeholder" col={8}>
          </Cell> */}
        </Grid>
      </div>
    )
  }
}

export default withStyles(styles)(DoctorProfile);