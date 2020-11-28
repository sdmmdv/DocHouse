import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';

import ListItemIcon from '@material-ui/core/ListItemIcon';
import HomeIcon from '@material-ui/icons/Home';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import DeveloperBoardIcon from '@material-ui/icons/DeveloperBoard';
import PersonIcon from '@material-ui/icons/Person';
import ChatIcon from '@material-ui/icons/Chat';
import SearchIcon from '@material-ui/icons/Search';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import MenuIcon from '@material-ui/icons/Menu';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import axios from '../../axios';

import {styles} from '../../styles/styleNavbar';

class Navbar extends Component {    
    state = {
        left: false,
        anchorEl: null,
        token: undefined,
        user: undefined,
        type: undefined
    };


      logOut = () => {
        this.setState({
            token: undefined,
            user: undefined,
          });
        localStorage.setItem("auth-token", "");
      };

      checkAuth = () => {
            let token = localStorage.getItem("auth-token");
            if (token === null) {
            localStorage.setItem("auth-token", "");
            token = "";
            }
            this.setState({
                token: token
            });
        };

      checkUserType = async () => {
        let token = localStorage.getItem("auth-token");
        const tokenRes = await axios.post(
                  "/general/tokenIsValid",
                    null,
                  { headers: { "x-auth-token": token } }
        );
          this.setState({
            type: tokenRes.data.type
        });
      };
      

      toggleDrawer = open => () => {
        this.setState({
          left: open
        });
      };

      handleClick = (event) => {
        this.setState({ anchorEl: event.currentTarget });
      };
    
      handleClose = () => {
        this.setState({ anchorEl: null });
      };

      componentDidMount(){
        this.setState({ loading: true });
        this.checkAuth();
        this.checkUserType();
        setTimeout(() => {
            this.setState({ loading: false });
        }, 500); 
        // console.log('Component Did mount');
      }

  render() {
    const { left,type} = this.state;
    const { classes} = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
            >
            <div>
                <MenuIcon onClick={this.toggleDrawer(true)} />
                <Drawer open={left} onClose={this.toggleDrawer(false)}>
                <div
                    tabIndex={0}
                    role="button"
                    onClick={this.toggleDrawer(false)}
                    onKeyDown={this.toggleDrawer(false)}
                >
                    <div className={classes.list}>
                        <List>
                                <Link className={classes.list} to="/">
                                <ListItem button>
                                    <ListItemIcon>
                                      <HomeIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Home" />
                                </ListItem>
                                </Link>
                                {type === 'user' && 
                                <Link className={classes.list} to="/user-dashboard">
                                <ListItem button>
                                    <ListItemIcon>
                                      <DeveloperBoardIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Dashboard"  />
                                </ListItem>
                                </Link>}

                                {type === 'doctor' &&
                                <Link className={classes.list} to="/doctor-dashboard">
                                <ListItem button>
                                    <ListItemIcon>
                                      <DeveloperBoardIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Dashboard"  />
                                </ListItem>
                                </Link>}

                                {type === 'user' && 
                                <Link className={classes.list} to="/user-profile">
                                <ListItem button>
                                    <ListItemIcon>
                                      <PersonIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Profile"  />
                                </ListItem>
                                </Link>}

                                {type === 'doctor' &&
                                <Link className={classes.list} to="/doctor-profile">
                                <ListItem button>
                                    <ListItemIcon>
                                      <PersonIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Profile"  />
                                </ListItem>
                                </Link>}

                                {(type === 'doctor' || type === 'user') &&
                                <Link className={classes.list} to="/chat">
                                <ListItem button>
                                    <ListItemIcon>
                                      <ChatIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Chat"  />
                                </ListItem>
                                </Link>}

                                {type === 'user' && 
                                <Link className={classes.list} to="/search-doctor">
                                <ListItem button>
                                    <ListItemIcon>
                                      <SearchIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Search Doctor"  />
                                </ListItem>
                                </Link>}
                                

                                {type !== 'user' && type !== 'doctor' &&
                                <Link className={classes.list} to="/log-transition">
                                <ListItem button>
                                    <ListItemIcon>
                                      <ExitToAppIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Login"  />
                                </ListItem>
                                </Link>
                                }
                                {(type === 'user' || type === 'doctor') &&
                                <Link className={classes.list} to="/log-transition" onClick={this.logOut}>
                                <ListItem button>
                                    <ListItemIcon>
                                      <ArrowBackIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Logout"  />
                                </ListItem>
                                </Link>}
                        </List>
                    </div>
                </div>
                </Drawer>
            </div>
            </IconButton>
            <Typography
              className={classes.flex}
              variant="h5"
              color="inherit"
            >
              <Link className={classes.logo} to="/">
                Dochouse
              </Link>
            </Typography>
            <div>
                    {this.state.token 
                      ?
                        (<Button 
                        className={classes.userButton}
                        href="/log-transition"
                        onClick={this.logOut}
                        >
                        Logout
                        </Button>)
                      :
                        (<Button 
                        className={classes.userButton}
                        href="/log-transition"
                        >
                        Login
                        </Button>)}
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(styles)(Navbar);
