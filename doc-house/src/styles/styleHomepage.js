
export const styles = theme => ({
    container: {
      marginTop: '50px',
      display: 'flex',
      flexDirection: 'column',
      height: theme.spacing(50),
      backgroundColor: '#f5f6ff',
      left: '50%',
      outline: 'none',
      position: 'absolute',
      overflow: 'scroll',
      top: '50%',
      padding: theme.spacing(6),
      transform: 'translate(-50%, -50%)',
      width: '70%',
      boxShadow: theme.shadows[3],
      borderRadius: theme.spacing(2),
    },
    link: {
        textDecoration: 'none',
        color: '#3f51b5'
    },
});