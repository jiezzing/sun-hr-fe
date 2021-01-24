import React from 'react';
import GoogleLogin from 'react-google-login';
import { useStyles } from './styles';

// material-ui
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { 
  Avatar, 
  CssBaseline,
  Grid,
  Typography,
  Container
} from '@material-ui/core';

const responseGoogle = (google) => {
  if (google) {
    console.log(google);
    console.log(google.profileObj);
  }
}

const Login = (props) => {
  const classes = useStyles(props);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sun* Inc.
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container direction="column" alignItems="center">
            <Grid item xs>
              <GoogleLogin 
                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                buttonText="Sign-in using Google" 
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                fullWidth
                cookiePolicy={'single_host_origin'} />  
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export default Login;
