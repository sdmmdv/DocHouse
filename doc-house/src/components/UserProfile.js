import React, { Component } from 'react';
import { Grid, Cell, Icon} from 'react-mdl';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import '../App.css';
import Navbar from './Navbar';
import Loading from './Loading';
import { withStyles } from '@material-ui/core/styles';
import LinkIcon from '@material-ui/icons/Link';


const styles = {
  divider: {
    borderTop: '3px solid #3f51b5',
    width: '50%'
  },
  topHeader: {
    paddingTop: '2em'
  }
};


class UserProfile extends Component {
  state = {
    user: undefined,
    token: undefined,
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

  render() {
    const {classes} = this.props;
    const {user} = this.state;
    console.log(user);
    return(
      <div>
        <Navbar/>
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
                        <h2 className={classes.topHeader}>{user.first_name} {user.last_name}</h2>
                        <h5 >Bio <Icon name="portrait"/></h5>
                        <hr className={classes.divider}/>
                          <p>{user.bio}</p>
                            {/* <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
                                the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of
                                type and scrambled it to make a type specimen book. It has survived not only five centuries, but
                                also the leap into electronic typesetting, remaining essentially unchanged.</p> */}
                        <hr className={classes.divider}/>
                        <h5>Phone <Icon name="phone"/></h5>
                            <p>+59023434423</p>
                        <hr className={classes.divider}/>
                        <h5>Email <Icon name="email"/></h5>
                            <p>{user.email}</p>
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

export default withStyles(styles)(UserProfile);