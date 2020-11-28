import React, {Component} from 'react';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Navbar from '../general/Navbar';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import axios from '../../axios';
import Modal from '@material-ui/core/Modal';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import {styles} from '../../styles/styleDashboard';
import {TabPanel, a11yProps } from '../general/TabPanel';
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import Loading from '../general/Loading';
import Payment from '../general/Payment';
import MuiAlert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Collapse from '@material-ui/core/Collapse';





function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


class UserDashboard extends Component {
    state = {
        loading:  true,
        activeTabValue: 0,
        index: 0,
        modalOpen: false,
        dialogOpen: false,
        alert: {
          severity: 'success',
          text: 'default',
          alertOpen: false
        },
        target_id: '',
        payment_status: '',
        modalInfo: {},
        requests: {}
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
          default:
            status = 'pending';
        }

        try {
            const token = localStorage.getItem('auth-token');  
            const userRes = await axios.get("/users/current-user", {
              headers: { "x-auth-token": token },});
            const creator_id = userRes.data.id;

            const result = await axios.get("/requests/user-request", {
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

  handleAlertOpen = (severity, text) => {
    this.setState({alert: { ...this.state.alert, alertOpen: true, text: text, severity: severity} });
  };

  handleAlertClose = () => {
    this.setState({alert: { ...this.state.alert, alertOpen: false}});
  };

  handleDeleteRequest = async(e) => {
    e.preventDefault();
      const {target_id} = this.state;
      const creator_visibility = false;
    try {
      const token = localStorage.getItem('auth-token');  
      axios.patch(`/requests/hide_creator/${target_id}`, {creator_visibility}, {headers: {"x-auth-token": token}})
      .then(() => {
        window.location.reload();
      })
    } catch (error) {
      console.log(error)
    }
  }

  handlePaymentStatus = async (status) => {
    this.setState({payment_status: status}); 
    // console.log("in payment status");
    const {modalInfo, payment_status} = this.state;
    let text = "";
    let severity = "";
    if (payment_status === "success") {
      text = "Payment was successful!";
      severity = "success";
    } else {
        text = "Something went wrong!";
        severity = "warning";
    }
    this.handleAlertOpen(severity, text);

      try {
        const token = localStorage.getItem('auth-token');  
        axios.patch(`/requests/update-payment-status/${modalInfo._id}`, {payment_status}, {headers: {"x-auth-token": token}})
      } catch (error) {
        console.log(error)
      }
  }

  componentDidMount(){
    // console.log("component Did Mount")
    setTimeout(() => {
     this.fetchRequests(this.state.activeTabValue);
    }, 500); 
    this.setState({loading: false});
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log("component Did Update")
    if (
      this.state.activeTabValue !== prevState.activeTabValue
      || this.state.payment_status !== prevState.payment_status
    ) {
      this.setState({ requests: {},retrieved: false});
      setTimeout(() => {
        this.fetchRequests(this.state.activeTabValue);
      }, 500); 
      this.setState({ loading: false});
    }
  }


  render(){
    const {classes} = this.props;
    const {modalInfo, activeTabValue, requests, modalOpen, dialogOpen, alert} = this.state;
    // console.log(this.state);
    

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

                    <Collapse in={alert.alertOpen}>     
                          <Alert severity={alert.severity} action={
                                <IconButton
                                  aria-label="close"
                                  color="inherit"
                                  size="small"
                                  onClick={this.handleAlertClose}
                                >
                                  <CloseIcon fontSize="inherit" />
                                </IconButton>
                              }>
                              {alert.text}
                          </Alert>
                    </Collapse>
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
              <Typography variant="h6" >Payment</Typography>
              <Typography variant="body1" gutterBottom>
                  Appointment fee: {!modalInfo.appointment_fee ? 'Free of charge' : modalInfo.appointment_fee + ' $'}
              </Typography>
              <Typography variant="body1">
                  Status: 
                  {modalInfo.fee_status === 'success' && ' Paid'}
                  {modalInfo.fee_status === 'unsettled' && ' Unsettled'}
              </Typography>
              <Typography variant="h6" >Explanation</Typography>
              <Typography variant="body1" gutterBottom>
                  {modalInfo.explanation}
              </Typography>
              <div onClick={this.handleModalClose}>
                {modalInfo.appointment_fee > 0 && modalInfo.fee_status !== 'success' && <Payment fee = {modalInfo.appointment_fee} parentCallback={this.handlePaymentStatus}/>}
              </div>
              <Button
                fullWidth
                color="primary"
                variant="contained"
                className={classes.modalButton}
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
                            <Grid item xs container direction="row" spacing={2} styles={{margin: "auto"}}>
                              <Grid xs={3} item>
                                  <Typography style={{fontWeight: "bold"}} variant="subtitle1">Subject</Typography>
                              </Grid>
                              <Grid xs={3} item >
                                  <Typography style={{fontWeight: "bold"}} variant="subtitle1">Applicant</Typography>
                              </Grid>
                              <Grid xs={3} item>
                                  <Typography style={{fontWeight: "bold"}} variant="subtitle1">Time</Typography>
                              </Grid>
                              <Grid xs={1} item>
                                  <Typography style={{fontWeight: "bold"}} variant="subtitle1">Status</Typography>
                              </Grid>
                            <Grid xs={2} item>
                                <Typography style={{fontWeight: "bold"}} variant="subtitle1">Actions</Typography>
                            </Grid>
                            </Grid>
                        </Grid>
                        </Grid>
                    </Paper>
                    {requests.length >= 0 ? (requests.map(
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
                            <Grid xs={1} item>
                                <HourglassEmptyIcon className={classes.glassIcon}/>
                            </Grid>
                            <Grid xs={2} item >
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
                    )) : (<Loading/>)}
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
                            <Grid xs={1} item>
                                <Typography style={{fontWeight: "bold"}} variant="subtitle1">Status</Typography>
                            </Grid>
                            <Grid xs={2} item>
                                <Typography style={{fontWeight: "bold"}} variant="subtitle1">Actions</Typography>
                            </Grid>
                            </Grid>
                        </Grid>
                        </Grid>
                    </Paper>
                    {requests.length >= 0 ? (requests.map(
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
                            <Grid xs={1} item>
                                <DoneIcon className={classes.doneIcon}/>
                            </Grid>
                            <Grid xs={2} item>
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
                    )) : (<Loading/>)}
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
                            <Grid xs={1} item>
                              <Typography style={{fontWeight: "bold"}} variant="subtitle1">Status</Typography>
                            </Grid>
                            <Grid xs={2} item>
                              <Typography style={{fontWeight: "bold"}} variant="subtitle1">Actions</Typography>
                            </Grid>
                            </Grid>
                        </Grid>
                        </Grid>
                    </Paper>
                    {requests.length >= 0 ? (requests.map(
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
                            <Grid xs={1} item>
                                <ClearIcon className={classes.clearIcon}/>
                            </Grid>
                            <Grid xs={2} item>
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
                    )) : (<Loading/>)}
                </div>
            </TabPanel>
        </React.Fragment>
    );
  }
}

export default withStyles(styles)(UserDashboard);
