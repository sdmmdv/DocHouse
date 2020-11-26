export const styles = theme => ({
    divider: {
        borderTop: '3px solid #4caf50',
        width: '80%'
      },
    dividerReview: {
      borderTop: '3px solid #3f51b5',
      width: '100%'
    },
      list: {
        flex: theme.spacing(1),
        width: 800,
        backgroundColor: theme.palette.background.paper,
      },
      expansion: {
        width: '80%',
        boxShadow: theme.shadows[5],
      },
      inline: {
        display: 'inline',
      },
      text: {
        maxWidth: "80%",
      },
  
      container: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        outline: 'none',
        padding: theme.spacing(6),
        margin: 'auto',
      },
    layout: {
      width: 'auto',
      display: 'block',
      marginRight: theme.spacing(3),
    },
    paper: {
      position: 'relative',
      padding: theme.spacing(4),
      margin: 'auto',
      flexDirection: 'column',
      backgroundColor: 'theme.palette.background.paper',
      boxShadow: theme.shadows[5]
    },
    paymentPaper : {
      position: 'relative',
      padding: theme.spacing(3),
      backgroundColor: 'theme.palette.background.paper',
      boxShadow: theme.shadows[3],
      display: "flex",
      alignItems: "baseline"
    },
    modalButton: {
      marginTop: theme.spacing(2)
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
    formContainer: {
      alignItems: 'center',
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center'
    },
    submit: {
      marginTop: theme.spacing(3)
    },
    alert: {
      color: theme.palette.success.main,
      fontSize: '2.2rem',
      "& .MuiAlert-icon": {
        fontSize: '3rem'
      }
    },
    link: {
      textDecoration: 'none',
      color: theme.palette.success.main
    },
    icons: {
      paddingBottom: '0.2em'
    },
    buttons: {
        '& > *': {
          margin: theme.spacing(2),
        }
    },
    footer: {
      marginTop: theme.spacing(2)
    },
    avatar: {
      margin: theme.spacing(5),
      height: theme.spacing(25),
      width: theme.spacing(25),
    },
    errorText: {
      color: '#D50000',
      marginTop: '5px'
    },
  });