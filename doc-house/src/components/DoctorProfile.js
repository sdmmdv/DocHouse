import React, { Component } from 'react';
import { Grid, Cell, Icon} from 'react-mdl';
import axios from 'axios';
import '../App.css';
import Navbar from './Navbar';
import Loading from './Loading';
import { withStyles } from '@material-ui/core/styles';
import LinkIcon from '@material-ui/icons/Link';


const styles = {
  divider: {
    borderTop: '3px solid #4caf50',
    width: '50%'
  },
  topHeader: {
    paddingTop: '2em'
  }
};


class DoctorProfile extends Component {
  state = {
    doctor: undefined,
    token: undefined,
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

  render() {
    const {classes} = this.props;
    const {doctor} = this.state;
    console.log(this.state);
    return(
      <div>
        <Navbar/>
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
                        <h2 className={classes.topHeader}>Dr. {doctor.first_name} {doctor.last_name}</h2>
                        <h3 >{doctor.speciality}</h3>
                        <h5 >Bio <Icon name="portrait"/></h5>
                        <hr className={classes.divider}/>
                          <p>{doctor.bio}</p>
                            {/* <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
                                the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of
                                type and scrambled it to make a type specimen book. It has survived not only five centuries, but
                                also the leap into electronic typesetting, remaining essentially unchanged.</p> */}
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