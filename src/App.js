import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

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
import Checkbox from '@material-ui/core/Checkbox';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import StripeCheckout from 'react-stripe-checkout';

import axios from 'axios';

import Login from "./Components/Login";
import Signup from "./Components/Signup";
import SwearJar from "./Components/SwearJar";
import UserDonations from "./Components/UserDonations";

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
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));


function App(props) {

  const classes = useStyles();
  const [donation, setDonation] = useState(0);
  const [charityChoice, setCharityChoice] = useState(1);
  //const [charity_choice_checked, setCharityChoiceChecked] = useState([]);
  const [charities, setCharities] = useState([{charity_id: 1, charity_name: "Red Cross", selected: false}, {charity_id: 2, charity_name: "Humane Society", selected: false}]);
  //const [value, setValue] = React.useState(0);


  const login = () => {

      //history.push("/stripe");

  }

  const donate = () => {

    //alert(donation);

    //if((donation + 10) == 20){

    //  alert("$" + donation + ".00 has been donated to " + charities[charityChoice-1].charity_name);

    //}

    setDonation(donation + 1);

  }

  //checboxes
  const onCharityChange = (e) => {

    let temp_charities = [...charities];

    //alert(charities[e.target.value - 1].selected);
    temp_charities[e.target.value - 1].selected = true;
    //alert(charities[e.target.value - 1].selected);


    setCharities(temp_charities);
    setCharityChoice(e.target.value);

  }

  //radios
  const handleChange = (e) => {

      //alert(e.target.value);

      setCharityChoice(e.target.value);

  }


  //4242424242424242
  //123
  //03/15/2020
  const onToken = (token) => {
    //alert(JSON.stringify(token));
    /*fetch('http://localhost:3000/donate', {
      method: 'POST',
      data: JSON.stringify({"token": token}),
    }).then(response => {
      response.json().then(data => {
        alert(`We are in business, ${data.email}`);
      });
    });*/

    //cookie.load("user_id");

    var config = {
        headers: {'Access-Control-Allow-Origin': '*'}
    };

    axios({
        method: 'post',
        url: 'http://polar-castle-88358.herokuapp.com/donate',
        data: JSON.stringify({user_id: cookie.load("user_id"), charityChoice: charityChoice, donation: donation, token: token}),
        headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        })
        .then(function (response) {
            //handle success

            //cookie.save('user_id', response.data.user_id, { path: '/' })

            console.log(JSON.stringify(response.data));
        })
        .catch(function (response) {
            //handle error
            console.log(response);
            //setError("Sorry there was an error");
        });
  }

  const logout = () => {

    cookie.save('user_id', "", { path: '/' })
    cookie.save('email', "", { path: '/' })

    //history.push("/charities");
    window.location.href = "/login";

  }

  return (
      <Router>
        <div className="App">
          <AppBar position="static" style={{ margin: 0, position: "fixed" }} title={<img src={process.env.PUBLIC_URL + "/swear-with-name.png"}/>}>
            <Toolbar>
              <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                <MenuIcon />
              </IconButton>
              <img src={process.env.PUBLIC_URL + "/swear-with-name.png"} height="40" width="40"/>
              <Typography variant="h6" className={classes.title}>
                Swear Jar
              </Typography>
              <Typography>
                {cookie.load("email")}
              </Typography>
              <Button style={{color: "white"}} onClick={logout}>Logout</Button>
            </Toolbar>
          </AppBar>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <Grid container spacing={1}>
            <Grid item md={3} alignItems="flex-start" justify="">
              <Grid
                container
                spacing={0}
                direction="column"
                alignItems="flex-start"
                justify=""
                style={{ minHeight: '100vh', paddingLeft: "10vh" }}>
                <br/>
                <br/>
                <br/>
                <Link component={RouterLink} to="/login">
                  Login
                </Link>
                <br/>
                <Link component={RouterLink} to="/signup">
                  Signup
                </Link>
                <br/>
                <Link component={RouterLink} to="/payment">
                  Payment Method
                </Link>
                <br/>
                <Link component={RouterLink} to="/charities">
                  Charities
                </Link>
                <br/>
                <Link component={RouterLink} to="/jar">
                  Swear Jar
                </Link>
                <Link component={RouterLink} to="/user_donations">
                  User Donations
                </Link>
              </Grid>
            </Grid>
            <Grid item md={9}>
              <Grid
                container
                spacing={0}
                direction="column"
                alignItems="flex-start"
                justify=""
                style={{ minHeight: '100vh', paddingLeft: "1vh" }}>
               <Switch>
                  <Route exact path="/">
                      <p>
                  
                        Welcome to the Swear Jar
                      </p>    
                  </Route>
                  <Route exact path="/login">
                      <p>
                       <Login/>
                      </p>    
                  </Route>
                  <Route exact path="/signup" component={Signup}></Route>
                  <Route exact path="/payment">
                        <StripeCheckout
                          token={onToken}
                          stripeKey="pk_test_kEWOEP6W5Sqz9Xv2B3yzqtFJ00NWnpei9Q"
                          amount={1000000}
                          allowRememberMe={false}
                          email="info@vidhub.co"
                        />
                        <br/>
                        <br/>
                        <br/>
                        <TextField label="Credit Card Number" defaultValue="Card Number"/>
                        <br/>
                        <TextField label="Expiry Date" defaultValue="Expiry Date"/>
                        <br/>
                        <br/>
                        <Button onClick={login}>Save</Button>
                  </Route>
                  <Route exact path="/charities">
                      <br/>
                      <FormControl component="fieldset" className={classes.formControl}>
                        <FormLabel component="legend">Organizations</FormLabel>
                        <RadioGroup aria-label="gender" name="organization" value={charityChoice} onChange={handleChange}>
                          {charities.map(charity => 
                            <FormControlLabel value={"" + charity.charity_id} control={<Radio />} label={charity.charity_name} />
                          )}
                        </RadioGroup>
                      </FormControl>
                  </Route>
                  <Route exact path="/jar">
                      <p>
                        <b>${donation}.00</b>
                        <br/>
                        <br/>
                        <br/>
                       <img src={process.env.PUBLIC_URL + "/jar.jpeg"} height="50%" width="50%"/>
                        <br/>
                        <Button onClick={donate}> Add $1.00</Button>
                        <br/>
                        <br/>
                        <StripeCheckout
                          token={onToken}
                          stripeKey="pk_test_kEWOEP6W5Sqz9Xv2B3yzqtFJ00NWnpei9Q"
                          amount={donation * 100}
                          allowRememberMe={false}
                          email="info@vidhub.co"
                        />
                      </p>
                      <br/>
                  </Route>            
                  <Route exact path="/user_donations" component={UserDonations}></Route>            
                </Switch>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </Router>
  );
}

export default App;
