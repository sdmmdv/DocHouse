import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Navbar from './Navbar';
import { NavLink } from 'react-router-dom';
import {styles} from '../../styles/styleHomepage';


class HomePage extends Component {
    render() { 
        const {classes} = this.props;
        return ( 
            <div>
                <Navbar/>
                <Paper className={classes.container}>
                    <Typography variant="h2" gutterBottom>DocHouse Medical Appointment service</Typography>
                    <Typography variant="h4" gutterBottom>About us</Typography>
                    <Typography variant="subtitle1" gutterBottom>
                        DocHouse is a medical appointment platform providing services between
                        patients and professional doctors of distinct medical fields. After long queue times,
                        crowdy hospitals, unscheduling patient registration and several other problems, we decided
                        to build appointment portal which will make your medical sessions extremely easy and pleasant.
                        We opened our doors for the professional doctors who aspire to schedule efficiently, 
                        and extend their medical services beyond the millions of users. To enjoy our services and
                        explore many features we provide, you need to <NavLink className={classes.link} to="/log-transition"> sign up 
                        </NavLink> into Dochouse portal.               
                    </Typography>
                    <Typography variant="h4" gutterBottom>Services</Typography>
                    <Typography variant="subtitle1" gutterBottom>
                       With just registering to our services, you may consult with qualifed doctors corresponding
                       your health issues, as well as review doctors after the medical experience. You may edit your profiles and make written communication with doctors.
                       As a doctor you can react to patients requests, and edit your portofilio to gain a ground
                       among other professional doctors.
                    </Typography>
                    <Typography variant="h4" gutterBottom>Contact us</Typography>
                    <Typography variant="subtitle1" gutterBottom>
                        Our support team:
                        <a className={classes.link} href="mailto:sadimamedov7@gmail.com"> sadimamedov7@gmail.com</a><br/>
                        Phone number:
                        <a className={classes.link} href="/"> +36 70 307 42 82 </a><br/>
                        Other products:
                        <a className={classes.link} href="https://github.com/MoneiBall"> Products </a><br/>
                    </Typography>
                </Paper>
            </div>
         );
    }
}
 
export default withStyles(styles)(HomePage);