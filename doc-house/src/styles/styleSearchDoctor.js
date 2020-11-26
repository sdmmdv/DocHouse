export const styles = theme => ({
    container: {
      display: 'flex',
      marginTop: '20px',
      marginBottom: '20px',
      padding: theme.spacing(2),
      margin: 'auto',
      maxWidth: 800,
      flexDirection: 'column',
      backgroundColor: 'theme.palette.background.paper',
      boxShadow: theme.shadows[5],
      transform: 'translate(0%, 250%)',
    },
  
    notFound: {
      marginTop: '100px',
      marginBottom: '50px',
      margin: 'auto',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: theme.spacing(2),
      maxWidth: 800,
      transform: 'translate(0%, 250%)',
      boxShadow: theme.shadows[3],
      backgroundColor: 'theme.palette.background.paper'
    },
    img: {
      width: 128,
      height: 128,
    },
    layout: {
      width: 'auto',
      display: 'block',
      marginLeft: theme.spacing(3),
      marginRight: theme.spacing(3),
      [theme.breakpoints.up(400 + theme.spacing(6))]: {
        width: 400,
        marginLeft: 'auto',
        marginRight: 'auto'
      }
    },
    paper: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -65%)',
      padding: theme.spacing(4),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: theme.spacing(50),
      backgroundColor: 'theme.palette.background.paper',
      boxShadow: theme.shadows[5]
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.warning.main
    },
    submit: {
      marginTop: theme.spacing(3)
    },
    link: {
      textDecoration: 'none',
      color: theme.palette.success.main
    },
    footer: {
      marginTop: theme.spacing(2)
    },
    errorText: {
      color: '#4caf50',
      marginTop: '5px'
    }
  });