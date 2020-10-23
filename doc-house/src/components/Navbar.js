import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';

import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import MenuIcon from '@material-ui/icons/Menu';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import axios from 'axios';

  const styles = {
    link: {
        outline: 'none',
        color: '#000',
        textDecoration: 'none'
      },
      menuButton: {
        color: '#fff',
        fontSize: '18px',
        marginRight: '-15px',
        textTransform: 'none'
      },
    list: {
        width: 250,
        color: '#000',
        textDecoration: 'none'
      },
      fullList: {
        width: 'auto'
      },
  flex: {
    flexGrow: 1
  },
  logo: {
    color: '#fff',
    textDecoration: 'none'
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  root: {
    flexGrow: 1
  },
  userButton: {
    color: '#fff'
  }
};

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
                  "http://localhost:5000/general/tokenIsValid",
                    null,
                  { headers: { "x-auth-token": token } }
        );
          this.setState({
            type: tokenRes.data.type
        });
      };

        // synchronized authentication make component render delay!
        // ************************************************
        // checkAuth = async () => {
        //     console.log('In checkAuth');
        //     let token = localStorage.getItem("auth-token");
        //     if (token === null) {
        //     localStorage.setItem("auth-token", "");
        //     token = "";
        //     }
        // const tokenRes = await axios.post(
        //   "http://localhost:5000/users/tokenIsValid",
        //   null,
        //   { headers: { "x-auth-token": token } }
        // );
        // if (tokenRes.data) {
        //   const userRes = await axios.get("http://localhost:5000/users/", {
        //     headers: { "x-auth-token": token },
        //   });
        //   this.setState({
        //     token: token,
        //     user: userRes.data,
        //   });
        // }
        //*******************************************************
      

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
    const { classes, logoutUser, user} = this.props;
    const { anchorEl } = this.state;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
            >
              {/* <NavbarLeftMenu user={user} /> */}
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
                            {/* <FolderListItems user={'user'} /> */}
                                <Link className={classes.list} to="/">
                                <ListItem button>
                                    <ListItemText primary="Home"/>
                                </ListItem>
                                </Link>
                                {type === 'user' && 
                                <Link className={classes.list} to="/user-profile">
                                <ListItem button>
                                    <ListItemText primary="Profile"/>
                                </ListItem>
                                </Link> }

                                {type === 'doctor' &&
                                <Link className={classes.list} to="/doctor-profile"> 
                                <ListItem button>
                                    <ListItemText primary="Profile"/>
                                </ListItem>
                                </Link>}

                                <Link className={classes.list} to="/contact">
                                <ListItem button>
                                    <ListItemText primary="Contact" />
                                </ListItem>
                                </Link>
                                <Link className={classes.list} to="/about">
                                <ListItem button>
                                    <ListItemText primary="About" />
                                </ListItem>
                                </Link>
                                <Link className={classes.list} to="/projects">
                                <ListItem button>
                                    <ListItemText primary="Projects" />
                                </ListItem>
                                </Link>
                                {type === 'user' && 
                                <Link className={classes.list} to="/search-doctor">
                                <ListItem button>
                                    <ListItemText primary="Search Doctor" />
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
              {/* <NavbarRightMenu logoutUser={logoutUser} user={user} /> */}
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

                    {/* <Button 
                    aria-owns={anchorEl ? 'right-menu' : null}
                    aria-haspopup="true"
                    className={classes.userButton}
                    onClick={this.handleClick}
                    >
                    user.name
                    </Button>
                    <Menu
                    id="right-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}
                    >
                    <Link className={classes.link} to={`/profile/${'user.userId'}`}>
                        <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                    </Link>
                    <Divider/>
                    <Link className={classes.link} to="/settings">
                        <MenuItem onClick={this.handleClose}>Settings</MenuItem>
                    </Link>
                    <Divider/>
                        <MenuItem onClick={logoutUser}>Logout</MenuItem>
                    </Menu> */}
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(styles)(Navbar);
