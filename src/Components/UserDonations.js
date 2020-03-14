import React, {useState, useEffect} from 'react';


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


function UserDonations(props) {

  const classes = useStyles();
  const history = useHistory();
  const [error, setError] = useState();
  const [userDonations, setUserDonations] = useState([]);
  const [charities, setCharities] = useState([{charity_id: 1, charity_name: "Red Cross", selected: false}, {charity_id: 2, charity_name: "Humane Society", selected: false}]);
  
  useEffect(() => {



      axios({
        method: 'post',
        url: 'https://polar-castle-88358.herokuapp.com/user_donations',
        data: JSON.stringify({user_id: cookie.load("user_id")}),
        headers: {'Content-Type': 'application/json' }
        })
        .then(function (response) {
            //handle success

            //cookie.save('user_id', response.data.user_id, { path: '/' })

            //alert(JSON.stringify(response.data.donations));

            //props.history.push("/charities");

            setUserDonations(response.data.donations);
            
        })
        .catch(function (response) {
            //handle error
            console.log(response);
            setError("Sorry there was an error");
        });

      //history.push("/payment");
  })

  const getCharityName = (chosenCharity) => {

      //alert(charity);

      let index = charities.findIndex((charity) => charity.charity_id == chosenCharity);

      return charities[index].charity_name;

  }

  return (
    <>
      <p>
        <br/>
        {userDonations.map(donation => 
            <>
              {getCharityName(donation.charity)}
              <br/>
              {donation.donation}
              <br/>
              <br/>

            </>
        )}
        <br/>
        <br/>
        You have made {userDonations.length} donations.
      </p>    
      </>
  );
}

export default UserDonations;
