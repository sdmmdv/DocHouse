import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from  '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Rating from "@material-ui/lab/Rating";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import StarBorderIcon from "@material-ui/icons/StarBorder";
import Box from "@material-ui/core/Box";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

const useStyles = makeStyles(theme => ({
  list: {
    flex: theme.spacing(1),
    width: 800,
    backgroundColor: theme.palette.background.paper,
  },
  expansion: {
    width: 600
  },
  inline: {
    display: 'inline',
  },
  large: {
    width: theme.spacing(6),
    height: theme.spacing(6),
  },
}));

export default function AlignItemsList() {
  const classes = useStyles();

  return (
    <React.Fragment>
          <ExpansionPanel className={classes.expansion}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>Reviews</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
        <List className={classes.list}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="user" className={classes.large} src={require('../assets/avatarDoctor.png')} />
        </ListItemAvatar>
        <ListItemText
          primary="Ali Connors"
          secondary={
            <React.Fragment>
              <Box component="fieldset"  margin="auto" borderColor="transparent">
                          <Rating
                            readOnly
                            size="small"
                            name="rating"
                            defaultValue={2.0}
                            precision={0.5}
                            emptyIcon={<StarBorderIcon fontSize="inherit" />}
                          />
                </Box>
                              <Typography component="span" variant="body2" className={classes.inline}>
                                    " — I'll be in your neighborhood doing errands this"
                              </Typography>
                              
             
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </List>
        </ExpansionPanelDetails>
      </ExpansionPanel>

    </React.Fragment>
  );
}
