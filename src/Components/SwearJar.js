import React, {useEffect, useState} from 'react';


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
import StripeCheckout from 'react-stripe-checkout';


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


function Donate(props) {

  const classes = useStyles();
  const history = useHistory();
  const [donation, setDonation] = useState();

  useEffect(() => {

      //alert(cookie.load('userId'));

  })


  const login = () => {

      history.push("/payment");

  }

  const donate = () => {


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

    axios({
        method: 'post',
        url: 'https://polar-castle-88358.herokuapp.com/donate',
        data: JSON.stringify({user_id: cookie.load("user_id"), token: token, donation: donation}),
        headers: {'Content-Type': 'application/json' }
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

  return (
    <>
      <p>
        Swear jar.<Link component={RouterLink} to="/login">
          With prop forwarding
        </Link>
        <br/>
        <p>
        <b>${donation}.00</b>
        <br/>
        <br/>
        <br/>
       <img src={process.env.PUBLIC_URL + "/jar.jpeg"} height="50%" width="50%"/>
        <br/>
        <Button onClick={donate}>$1.00</Button>
        </p>
        <br/>
        <br/>
        <StripeCheckout
          token={onToken}
          stripeKey="pk_test_kEWOEP6W5Sqz9Xv2B3yzqtFJ00NWnpei9Q"
          amount={donation * 100}
          allowRememberMe={false}
          email="info@vidhub.co"
        />
        add a right side grid for tip
       </p>    
     </>
  );
}

export default Donate;
