import React, {Component} from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { styles } from '../../styles/styleNotFound';
import Navbar from './Navbar';


class NotFound extends Component {
  render() { 
    const {classes} = this.props;
    return ( 
        <div>
            <Navbar/>
            <main className={classes.layout}>
            <Paper className={classes.container}>
                <Typography variant="h1">404</Typography>
                <Typography variant="h4">Page Not Found</Typography>
                <Typography variant="subtitle1">
                    The page you are looking for was not found.
                </Typography>
            </Paper>
            </main>
        </div>
     );
  }
}

export default withStyles(styles)(NotFound);
