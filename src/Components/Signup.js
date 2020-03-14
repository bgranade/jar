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


function Signup(props) {

  const classes = useStyles();
  const history = useHistory();
  const [error, setError] = useState(); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")


  const signup = () => {

      //console.log(JSON.stringify(props));
      //"senior engineer"

      axios({
        method: 'post',
        url: 'https://polar-castle-88358.herokuapp.com/signup',
        data: JSON.stringify({email: email, password: password}),
        headers: {'Content-Type': 'application/json' }
        })
        .then(function (response) {
            //handle success

            cookie.save('user_id', response.data.user_id, { path: '/' })
            cookie.save('email', email, { path: '/' })

            console.log(JSON.stringify(response.data));

            //setError("");

            //history.push("/charities");
            window.location.href = "/charities";

        })
        .catch(function (response) {
            //handle error
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
      <p>
        <br/>
        {error}
        <br/>
        <TextField onChange={onEmailChange} label="Username"/>
        <br/>
        <TextField onChange={onPasswordChange} label="Password"/>
        <br/>
        <Button value="onclick" onClick={signup}>Signup</Button>
      </p>    
      </>
  );
}

export default Signup;
