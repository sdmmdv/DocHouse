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
import Navbar from './Navbar';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

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
    margin: theme.spacing(1),
    "&:disabled": {
      backgroundColor: "#8c9eff"
    }
  },
  closeButton: {
    marginTop: theme.spacing(3)
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    marginTop: "2px",
    maxWidth: 1200,
    backgroundColor: 'theme.palette.background.paper',
    boxShadow: theme.shadows[5],
  },
  modalPaper: {
    position: 'absolute',
    width: theme.spacing(65),
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
    borderRadius: theme.spacing(2),
    top: '50%',
    left: '50%',
    outline: 'none',
    transform: 'translate(-50%, -50%)'
  },
  title: {
    textAlign: "center",
  }
});

class UserDashboard extends Component {
    state = {
        activeTabValue: 0,
        index: 0,
        modalOpen: false,
        dialogOpen: false,
        target_id: '',
        modalInfo: {},
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

  handleModalOpen = (request) => {
    this.setState({ modalInfo: request, modalOpen: true });
  };

  handleModalClose = () => {
    this.setState({ modalOpen: false });
  };

  handleDialogOpen = (request) => {
    this.setState({ target_id: request._id, dialogOpen: true });
  };

  handleDialogClose = () => {
    this.setState({ dialogOpen: false });
  };

  handleDeleteRequest = async(e) => {
    e.preventDefault();
      const {target_id} = this.state;
      const creator_visibility = false;
    try {
      const token = localStorage.getItem('auth-token');  
      axios.patch(`http://localhost:5000/requests/hide_creator/${target_id}`, {creator_visibility}, {headers: {"x-auth-token": token}})
      .then(() => {
        window.location.reload();
      })
    } catch (error) {
      console.log(error)
    }
  }

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
    console.log(this.state.target_id);
    const {classes} = this.props;
    const {modalInfo, activeTabValue, requests, modalOpen, dialogOpen} = this.state;
    

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

            <Dialog
              open={dialogOpen}
              onClose={this.handleDialogClose}
              disableBackdropClick
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">{"Are you sure you want to delete this item?"}</DialogTitle>
              <DialogActions>
                <Button className={classes.button} variant="contained" onClick={this.handleDialogClose}>
                  Cancel
                </Button>
                <Button className={classes.button} color="primary" variant="contained" onClick={this.handleDeleteRequest} >
                  Confirm
                </Button>
              </DialogActions>
            </Dialog>

            {modalInfo && <Modal
          open={modalOpen}
          onClose={this.handleModalClose}
        >
          <div className={classes.modalPaper}>
              <div className={classes.title}>
                <Typography variant="h4" gutterBottom> Appointment </Typography>
              </div>
              <Typography variant="h6" >Subject</Typography>
              <Typography variant="body1" gutterBottom>
                  {modalInfo.subject}
              </Typography>


              <Typography variant="h6" >Doctor</Typography>
              <Typography variant="body1" gutterBottom>
                  {modalInfo.receiver_name}
              </Typography>

              <Typography variant="h6" >Appointment Time</Typography>
              <Typography variant="body1" gutterBottom>
                  {modalInfo.time}
              </Typography>

              <Typography variant="h6" >Explanation</Typography>
              <Typography variant="body1" gutterBottom>
                  {modalInfo.explanation}
              </Typography>
              <Button
                fullWidth
                color="primary"
                variant="contained"
                className={classes.closeButton}
                onClick={this.handleModalClose}
              >
                Close
              </Button>
          </div>
        </Modal> }
            <TabPanel value={activeTabValue} index={0}>
                <div className={classes.root}>
                    <Paper className={classes.paper}>
                        <Grid container spacing={2}>
                        <Grid item xs={12} sm container>
                            <Grid item xs container direction="row" spacing={2}>
                              <Grid xs={3} item>
                                  <Typography style={{fontWeight: "bold"}} variant="subtitle1">Subject</Typography>
                              </Grid>
                              <Grid xs={3} item>
                                  <Typography style={{fontWeight: "bold"}} variant="subtitle1">Applicant</Typography>
                              </Grid>
                              <Grid xs={3} item>
                                  <Typography style={{fontWeight: "bold"}} variant="subtitle1">Time</Typography>
                              </Grid>
                              <Grid xs={3} item>
                                  <Typography style={{fontWeight: "bold"}} variant="subtitle1">Actions</Typography>
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
                                <Typography variant="subtitle1">{request.receiver_name}</Typography>
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
                                onClick={() => this.handleModalOpen(request)}
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
                                disabled
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
                                <Typography style={{fontWeight: "bold"}} variant="subtitle1">Subject</Typography>
                            </Grid>
                            <Grid xs={3} item>
                                <Typography style={{fontWeight: "bold"}} variant="subtitle1">Applicant</Typography>
                            </Grid>
                            <Grid xs={3} item>
                                <Typography style={{fontWeight: "bold"}} variant="subtitle1">Time</Typography>
                            </Grid>
                            <Grid xs={3} item>
                                <Typography style={{fontWeight: "bold"}} variant="subtitle1">Actions</Typography>
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
                                <Typography variant="subtitle1">{request.receiver_name}</Typography>
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
                                onClick={() => this.handleModalOpen(request)}
                              >
                                View
                          </Button>
                          <Button
                                variant="contained"
                                color="primary"
                                size="small"
                                className={classes.button}
                                startIcon={<DeleteIcon />}
                                onClick={() => this.handleDialogOpen(request)}
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
                                <Typography style={{fontWeight: "bold"}} variant="subtitle1">Subject</Typography>
                            </Grid>
                            <Grid xs={3} item>
                                <Typography style={{fontWeight: "bold"}} variant="subtitle1">Applicant</Typography>
                            </Grid>
                            <Grid xs={3} item>
                                <Typography style={{fontWeight: "bold"}} variant="subtitle1">Time</Typography>
                            </Grid>
                            <Grid xs={3} item>
                              <Typography style={{fontWeight: "bold"}} variant="subtitle1">Actions</Typography>
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
                                <Typography variant="subtitle1">{request.receiver_name}</Typography>
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
                                onClick={() => this.handleModalOpen(request)}
                              >
                                View
                          </Button>
                          <Button
                                variant="contained"
                                color="primary"
                                size="small"
                                className={classes.button}
                                startIcon={<DeleteIcon />}
                                onClick={this.handleDialogOpen}
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

export default withStyles(styles)(UserDashboard);
