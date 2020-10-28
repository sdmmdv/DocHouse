import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Navbar from '../components/Navbar';
import Paper from '@material-ui/core/Paper';

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
          <Typography>{children}</Typography>
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

const useStyles = makeStyles((theme) => ({
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
}));

function HomePage(){
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <React.Fragment>
      <Navbar/>
      <div className={classes.layout}>
        <AppBar color="default" className={classes.appBar}>
            <Tabs
            value={value}
            onChange={handleChange}
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
        <SwipeableViews className={classes.appBar}
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={value}
            onChangeIndex={handleChangeIndex}
        >
            <TabPanel value={value} index={0} dir={theme.direction}>
                <Paper>
                    <Typography variant="body1">Your appointment has been registered.</Typography>
                </Paper>
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
                Accepted Requests
            </TabPanel>
            <TabPanel value={value} index={2} dir={theme.direction}>
                Rejected Requests
            </TabPanel>
        </SwipeableViews>
       </div>
    </React.Fragment>
  );
}

export default HomePage;