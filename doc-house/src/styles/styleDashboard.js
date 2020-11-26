export const styles = (theme) => ({
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
      marginRight: theme.spacing(1),
      "&:disabled": {
        backgroundColor: "#8c9eff"
      }
    },
    glassIcon: {
        marginLeft: theme.spacing(1),
        color: theme.palette.warning.light,
        fontSize: '1.8rem',
      },
    doneIcon: {
        marginLeft: theme.spacing(1),
        color: theme.palette.success.dark,
        fontSize: '1.8rem',
      },
    clearIcon: {
        marginLeft: theme.spacing(1),
        color: theme.palette.error.dark,
        fontSize: '1.8rem',
      },
    modalButton: {
      marginTop: theme.spacing(2)
    },
    paper: {
      padding: theme.spacing(1),
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