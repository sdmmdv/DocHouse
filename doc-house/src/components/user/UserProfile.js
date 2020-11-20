import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import '../../Profile.css';
import Navbar from '../general/Navbar';
import Loading from '../general/Loading';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import LanguageIcon from '@material-ui/icons/Language';
import BusinessIcon from '@material-ui/icons/Business';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import {Avatar} from '@material-ui/core';


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
    borderTop: '3px solid #3f51b5',
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
    borderRadius: theme.spacing(2),
    padding: theme.spacing(4),
    top: '50%',
    left: '50%',
    outline: 'none',
    transform: 'translate(-50%, -50%)'
  },

});


class UserProfile extends Component {
  state = {
    user: undefined,
    bio: '',
    address: '',
    web: '',
    token: undefined,
    modalOpen: false,
    loading:  true
  };

  checkUser = async () => {
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
        if (tokenRes.data) {
          const userRes = await axios.get("http://localhost:5000/users/current-user", {
            headers: { "x-auth-token": token },
          });
          this.setState({
            token: token,
            user: userRes.data,
            bio: userRes.data.bio,
            address: userRes.data.address,
            web: userRes.data.web,
          });
        }
    }

    componentDidMount(){
      this.setState({ loading: true });
      this.checkUser();
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
      const {user,token, bio, address, web} = this.state;
      const updates = {
        bio,
        address, 
        web
      };

      try {
        axios.patch(`http://localhost:5000/users/${user.id}`, updates, {headers: {"x-auth-token": token}})
        .then(() => {
          window.location.reload();
        })
      } catch (error) {
        console.log(error);
      }
    };



  render() {
    const {classes} = this.props;
    const {user, modalOpen} = this.state;
    // console.log(this.state);
    return(
      <div>
        <Navbar/>
        {user && <Modal
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
          open={modalOpen}
          onClose={this.handleModalClose}
          // disableBackdropClick
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
                defaultValue= {user.address}
                id="address"
                label="Address"
                margin="normal"
                name="address"
                onChange={this.handleChange}
                placeholder="Enter your home address."
              />
              <TextField
                fullWidth
                className={classes.textField}
                defaultValue= {user.web}
                id="web"
                label="Web"
                margin="normal"
                name="web"
                onChange={this.handleChange}
                placeholder="Enter your Web, Blog etc."
              />
              <TextField
                fullWidth
                multiline
                className={classes.textField}
                defaultValue={user.bio}
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

         

            {user ? 
                    (<div className={classes.container}>
                        <Avatar src={require('../../assets/avatar.png')} className={classes.avatar}/>
                        <div className={classes.buttons}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={this.handleModalOpen}
                            >
                            Edit Profile 
                            </Button>
                        </div>
                        <Typography variant="h3" className={classes.text}>{user.first_name} {user.last_name}</Typography>
                            <hr className={classes.divider}/>
                        <Typography variant="h5" gutterBottom ><AccountBoxIcon className={classes.icons}/> Bio</Typography>
                        <Typography variant="body1" className={classes.text}>{user.bio}</Typography>
                            <hr className={classes.divider}/>
                        <Typography variant="h5" gutterBottom><MailOutlineIcon className={classes.icons}/> Email</Typography>
                        <Typography variant="body1" className={classes.text}>{user.email}</Typography>
                            <hr className={classes.divider}/>
                        <Typography variant="h5" gutterBottom><BusinessIcon className={classes.icons}/> Address</Typography>
                        <Typography variant="body1" className={classes.text}>{user.address}</Typography>
                            <hr className={classes.divider}/>
                        <Typography variant="h5" gutterBottom><LanguageIcon className={classes.icons}/> Web</Typography>
                        <Typography variant="body1" className={classes.text}>{user.web}</Typography>
                    </div>) : <Loading/>}
      </div>
    )
  }
}

export default withStyles(styles)(UserProfile);