import React, { useState, useEffect } from 'react';
import GoogleLogin from 'react-google-login';
import axios from 'axios';
import { useStyles } from './styles';
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
    axios.get(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/users/verify&email=${google.profileObj.email}`).then((userExist) => {
      if (!userExist.data) {
        axios.post(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/users/create`, null, { params: {
          name: google.profileObj.name,
          email: google.profileObj.email,
          google_id: google.googleId,
          google_access_token: google.accessToken,
          google_token_id: google.tokenId,
        }}).then((success) => {
          console.log(success);
        });
      } else {
        console.log('User already registered.');
        console.log(google);
      }
    });
  }
}

const Login = (props) => {
  const classes = useStyles(props);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/users/all`).then((response) => {
      setUsers(response.data);
    });
  }, []);

  console.log(users);

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
                buttonText="Sign in with Google" 
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
