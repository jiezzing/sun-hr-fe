import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useStyles } from './styles';
import { Alert } from '@material-ui/lab';
import { 
  Avatar, 
  CssBaseline,
  Grid,
  Typography,
  Container,
  Box
} from '@material-ui/core';
import { setCookie } from '../../../cookies';
import GoogleLogin from 'react-google-login';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { verifyEmail, registerUser } from '../../../actions/UserActions';

const AlertMessage = props => {
  return (
    <>
      <Box pt={3}>
        <div>
          <Alert severity="error" icon={false} variant="filled">{props.text}</Alert>
        </div>
      </Box>
    </>
  );
}

const Login = () => {
  const classes = useStyles();
  const [text, setText] = useState('');
  const [invalid, setInvalid] = useState(false);
  const history = useHistory();

  const responseGoogle = (google) => {
    if (google) {
      verifyEmail(google.profileObj.email).then((response) => {
        const { data, status, message } = response;

        if (status === 'INVALID_EMAIL') {
          setText(message);
          setInvalid(true);

          return false;
        }

        // register user
        if (!data && status === 'OK') {
          let params = {
            name: google.profileObj.name,
            email: google.profileObj.email,
            google_id: google.googleId,
            google_access_token: google.accessToken,
            google_token_id: google.tokenId
          };

          registerUser(params).then(() => {
            setCookie(data.google_access_token);
          })
        } else {
          if (status === 'OK') {
            setCookie(data.google_access_token);
          }
        }

        history.push('/user/attendance');
      })
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
