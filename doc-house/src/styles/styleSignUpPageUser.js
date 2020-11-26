export const styles = theme => ({
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
      transform: 'translate(0%, 10%)',
      padding: theme.spacing(6),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: theme.spacing(50),
      backgroundColor: 'theme.palette.background.paper',
      boxShadow: theme.shadows[6],
      marginBottom: '50px',
    },
    avatar: {
      margin: theme.spacing(),
      backgroundColor: theme.palette.secondary.main
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
      color: '#D50000',
      marginTop: '5px'
    },
    successText: {
      color: '#32971E',
      marginTop: '10px',
      textDecoration: 'none'
    }
  });