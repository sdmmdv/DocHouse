import React, {Component} from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Navbar from '../components/Navbar';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const styles = (theme) => ({
  layout: {
    position: 'static',
    display: 'block',
    transform: 'translate(30%, 100%)',
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    backgroundColor: theme.palette.background.paper,
    width: theme.spacing(100),
    [theme.breakpoints.up(800 + theme.spacing(3))]: {
        width: 800,
    }
  },
  appBar: {
    position: 'static',
    display: 'flex',
    backgroundColor: 'theme.palette.background.paper',
  },
  root: {
    flexGrow: 1,
  },
  button: {
    margin: theme.spacing(1)
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    marginTop: "2px",
    maxWidth: 1200,
    backgroundColor: 'theme.palette.background.paper',
    boxShadow: theme.shadows[5],
  }
});

class HomePage extends Component {
    state = {
        activeTabValue: 0,
        index: 0,
        requests: []
    }


    fetchRequests = async (paramTabValue) => {     
        let status = '';   
        switch(paramTabValue) {
          case 0:
            status = 'pending'; break;
          case 1:
            status = 'accepted'; break;
          case 2:
            status = 'rejected'; break;
        }

        try {
            const token = localStorage.getItem('auth-token');  
            const userRes = await axios.get("http://localhost:5000/users/current-user", {
              headers: { "x-auth-token": token },});
            const creator_id = userRes.data.id;

            const result = await axios.get("http://localhost:5000/requests/user-request", {
              headers: {"x-auth-token": token },
              params:  {"creator_id": creator_id, "status": status}
            });
                                    
            this.setState({requests: result.data});
          } catch (err) {
            console.log(err);
          }
    }

  

  handleChange = (event, value) => {
    this.setState({activeTabValue: value})
  };

  handleChangeIndex = (index) => {
    this.setState({index: index})
  };

  componentDidMount(){
    this.fetchRequests(this.state.activeTabValue);
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.activeTabValue !==
      prevState.activeTabValue
    ) {
      this.fetchRequests(this.state.activeTabValue)
    }
  }

  render(){
    console.log("I am rendering")
    const {classes} = this.props;
    const {activeTabValue, requests} = this.state;
    

    return (
        <React.Fragment>
        <Navbar/>
            <AppBar color="default" className={classes.appBar}>
                <Tabs
                value={activeTabValue}
                onChange={this.handleChange}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
                aria-label="full width tabs example"
                >
                <Tab label="Pending Requests" {...a11yProps(0)} />
                <Tab label="Accepted Requests" {...a11yProps(1)} />
                <Tab label="Rejected Requests" {...a11yProps(2)} />
                </Tabs>
            </AppBar>
            <TabPanel value={activeTabValue} index={0}>
                <div className={classes.root}>
                    <Paper className={classes.paper}>
                        <Grid container spacing={2}>
                        <Grid item xs={12} sm container>
                            <Grid item xs container direction="row" spacing={2}>
                              <Grid xs={3} item>
                                  <Typography variant="subtitle1">Subject</Typography>
                              </Grid>
                              <Grid xs={3} item>
                                  <Typography variant="subtitle1">Applicant</Typography>
                              </Grid>
                              <Grid xs={3} item>
                                  <Typography variant="subtitle1">Time</Typography>
                              </Grid>
                              <Grid xs={3} item>
                                  <Typography variant="subtitle1">Actions</Typography>
                              </Grid>
                            </Grid>
                        </Grid>
                        </Grid>
                    </Paper>
                    {requests.map(
                        request =>
                    <Paper key={request._id} className={classes.paper}>
                        <Grid container spacing={2}>
                        <Grid item xs={12} sm container>
                            <Grid item xs container direction="row" spacing={2}>
                            <Grid xs={3} item>
                                <Typography variant="subtitle1">{request.subject}</Typography>
                            </Grid>
                            <Grid xs={3} item>
                                <Typography variant="subtitle1">Name Surname</Typography>
                            </Grid>
                            <Grid xs={3} item>
                                <Typography variant="subtitle1">{request.time}</Typography>
                            </Grid>
                            <Grid xs={3} item >
                            <Button
                                variant="contained"
                                color="primary"
                                size="small"
                                className={classes.button}
                                startIcon={<VisibilityIcon />}
                              >
                                View
                          </Button>
                          <Button
                                variant="contained"
                                color="primary"
                                size="small"
                                className={classes.button}
                                startIcon={<DeleteIcon />}
                              >
                                Delete
                          </Button>
                            </Grid>
                            </Grid>
                        </Grid>
                        </Grid>
                    </Paper>
                    )}
                </div>
            </TabPanel>
            <TabPanel value={activeTabValue} index={1}>
            <div className={classes.root}>
                    <Paper className={classes.paper}>
                        <Grid container spacing={2}>
                        <Grid item xs={12} sm container>
                            <Grid item xs container direction="row" spacing={2}>
                            <Grid xs={3} item>
                                <Typography variant="subtitle1">Subject</Typography>
                            </Grid>
                            <Grid xs={3} item>
                                <Typography variant="subtitle1">Applicant</Typography>
                            </Grid>
                            <Grid xs={3} item>
                                <Typography variant="subtitle1">Time</Typography>
                            </Grid>
                            <Grid xs={3} item>
                                <Typography variant="subtitle1">Actions</Typography>
                            </Grid>
                            </Grid>
                        </Grid>
                        </Grid>
                    </Paper>
                    {requests.map(
                        request =>
                    <Paper key={request._id} className={classes.paper}>
                        <Grid container spacing={2}>
                        <Grid item xs={12} sm container>
                            <Grid item xs container direction="row" spacing={2}>
                            <Grid xs={3} item>
                                <Typography variant="subtitle1">{request.subject}</Typography>
                            </Grid>
                            <Grid xs={3} item>
                                <Typography variant="subtitle1">Name Surname</Typography>
                            </Grid>
                            <Grid xs={3} item>
                                <Typography variant="subtitle1">{request.time}</Typography>
                            </Grid>
                            <Grid xs={3} item>
                                <Button
                                variant="contained"
                                color="primary"
                                size="small"
                                className={classes.button}
                                startIcon={<VisibilityIcon />}
                              >
                                View
                          </Button>
                          <Button
                                variant="contained"
                                color="primary"
                                size="small"
                                className={classes.button}
                                startIcon={<DeleteIcon />}
                              >
                                Delete
                          </Button>
                            </Grid>
                            </Grid>
                        </Grid>
                        </Grid>
                    </Paper>
                    )}
                </div>
            </TabPanel>
            <TabPanel value={activeTabValue} index={2}>
            <div className={classes.root}>
                    <Paper className={classes.paper}>
                        <Grid container spacing={2}>
                        <Grid item xs={12} sm container>
                            <Grid item xs container direction="row" spacing={2}>
                            <Grid xs={3} item>
                                <Typography variant="subtitle1">Subject</Typography>
                            </Grid>
                            <Grid xs={3} item>
                                <Typography variant="subtitle1">Applicant</Typography>
                            </Grid>
                            <Grid xs={3} item>
                                <Typography variant="subtitle1">Time</Typography>
                            </Grid>
                            <Grid xs={3} item>
                              <Typography variant="subtitle1">Actions</Typography>
                            </Grid>
                            </Grid>
                        </Grid>
                        </Grid>
                    </Paper>
                    {requests.map(
                        request =>
                    <Paper key={request._id} className={classes.paper}>
                        <Grid container spacing={2}>
                        <Grid item xs={12} sm container>
                            <Grid item xs container direction="row" spacing={2}>
                            <Grid xs={3} item>
                                <Typography variant="subtitle1">{request.subject}</Typography>
                            </Grid>
                            <Grid xs={3} item>
                                <Typography variant="subtitle1">Name Surname</Typography>
                            </Grid>
                            <Grid xs={3} item>
                                <Typography variant="subtitle1">{request.time}</Typography>
                            </Grid>
                            <Grid xs={3} item>
                            <Button
                                variant="contained"
                                color="primary"
                                size="small"
                                className={classes.button}
                                startIcon={<VisibilityIcon />}
                              >
                                View
                          </Button>
                          <Button
                                variant="contained"
                                color="primary"
                                size="small"
                                className={classes.button}
                                startIcon={<DeleteIcon />}
                              >
                                Delete
                          </Button>
                            </Grid>
                            </Grid>
                        </Grid>
                        </Grid>
                    </Paper>
                    )}
                </div>
            </TabPanel>
        </React.Fragment>
    );
  }
}

export default withStyles(styles)(HomePage);
