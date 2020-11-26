export const styles = theme => ({
    container: {
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      outline: 'none',
      padding: theme.spacing(6),
      margin: 'auto',
    },
    link: {
      textDecoration: 'none',
      color: '#3f51b5'
    },
    divider: {
      borderTop: '3px solid #3f51b5',
      width: '60%',
      margin: theme.spacing(2)
    },
    saveButton: {
      margin: theme.spacing(1)
    },
    formContainer: {
      alignItems: 'center',
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center'
    },
    buttons: {
      alignItems: 'center',
      marginBottom: theme.spacing(3)
    },
    icons: {
      paddingBottom: '0.2em'
    },
    text: {
      maxWidth: "60%",
    },
    avatar: {
      margin: theme.spacing(5),
      height: theme.spacing(25),
      width: theme.spacing(25),
    },
    modalPaper: {
      position: 'absolute',
      width: theme.spacing(50),
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      borderRadius: theme.spacing(2),
      padding: theme.spacing(4),
      top: '50%',
      left: '50%',
      outline: 'none',
      transform: 'translate(-50%, -50%)'
    },
  
  });