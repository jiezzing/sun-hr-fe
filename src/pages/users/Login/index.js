import React, { useState } from 'react';
import GoogleLogin from 'react-google-login';
import axios from 'axios';
import { useStyles } from './styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { 
  Avatar, 
  CssBaseline,
  Grid,
  Typography,
  Container,
  Box
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';

const AlertMessage = props => {
  return (
    <div>
      <Box pt={3}>
        <div>
          <Alert severity="error" icon={false} variant="filled">{props.text}</Alert>
        </div>
      </Box>
    </div>
  );
}

const Login = () => {
  const classes = useStyles();
  const [text, setText] = useState('');
  const [invalid, setInvalid] = useState(false);

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
          }}).then((response) => {
            console.log(response.status);
          });
        } else {
          if (userExist.data.status) {
            setText(userExist.data.message);
            setInvalid(true);
          }
        }
      });
    }
  }
  
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
            { invalid && <AlertMessage text={text} /> }
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export default Login;
