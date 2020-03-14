import React, {useState} from 'react';


import { useParams, useLocation, useHistory, useRouteMatch, Route, Link as RouterLink, Switch, BrowserRouter as Router } from "react-router-dom";
import { makeStyles, withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import axios from 'axios';
import cookie from 'react-cookies';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
}));


function Login(props) {

  const classes = useStyles();
  const history = useHistory();
  const [error, setError] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const login = () => {

      //alert(email);
      //alert(password);

      axios({
        method: 'post',
        url: 'https://polar-castle-88358.herokuapp.com/login',
        data: JSON.stringify({email: email, password: password}),
        headers: {'Content-Type': 'application/json' }
        })
        .then(function (response) {
            //handle success

            cookie.save('user_id', response.data.user_id, { path: '/' })
            cookie.save('email', email, { path: '/' })

            console.log(JSON.stringify(response.data));

            history.push("/charities");
            window.location.href = "/charities";
            
        })
        .catch(function (response) {
            //handle error
            //alert(response);
            console.log(response);
            setError("Sorry there was an error");
        });


      //history.push("/payment");

  }

  const onEmailChange = (e) => {

      setEmail(e.target.value);

  }

  const onPasswordChange = (e) => {

      setPassword(e.target.value);

  }

  return (
    <>
        <br/>
        {error}
        <br/>
        <br/>
        <TextField onChange={onEmailChange} label="Email"/>
        <br/>
        <TextField onChange={onPasswordChange} label="Password"/>
        <br/>
        <Button onClick={login}>Login</Button>  
      </>
  );
}

export default Login;
