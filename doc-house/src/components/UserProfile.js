import React, { Component } from 'react';
import { Grid, Cell, Icon} from 'react-mdl';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import '../App.css';
import Navbar from './Navbar';
import Loading from './Loading';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';


const styles = theme => ({
  divider: {
    borderTop: '3px solid #3f51b5',
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

         
        <Grid >
          <Cell col={6}>
            <div style={{textAlign: 'center'}}>
              <img className="container-div"
                src={require('../assets/avatar.png')}
                alt="avatar"
                style={{height: '200px', margin: 'auto'}}
                 />
            </div>
            {user ? 
                    (<div >
                        <Button
                        variant="contained"
                        className={classes.editButton}
                        onClick={this.handleModalOpen}
                        >
                        Edit Profile
                        </Button>

                        <h2 className={classes.topHeader}>{user.first_name} {user.last_name}</h2>
                        <hr className={classes.divider}/>
                        <h5 >Bio <Icon name="portrait"/></h5>
                          <p>{user.bio}</p>
                        <hr className={classes.divider}/>
                        <h5>Email <Icon name="email"/></h5>
                            <p>{user.email}</p>
                        <hr className={classes.divider}/>
                        <h5>Address <Icon name="home"/></h5>
                            <p>{user.address}</p>
                        <hr className={classes.divider}/>
                        <h5>Web <Icon name="language"/></h5>
                            <p>{user.web}</p>
                    </div>) : <Loading/>}
          </Cell>
          {/* <Cell className="button_placeholder" col={8}>
          </Cell> */}
        </Grid>
      </div>
    )
  }
}

export default withStyles(styles)(UserProfile);