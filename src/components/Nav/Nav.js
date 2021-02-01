import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import mapStoreToProps from '../../redux/mapStoreToProps';

// Import @material-UI
import Grid from '@material-ui/core/Grid';

const Nav = (props) => {
  let loginLinkData = {
    path: '/login',
    text: 'Login ',
  };

  if (props.store.user.id != null && props.store.user.access_level !== 2) {
    loginLinkData.path = '/add-new';
    loginLinkData.text = 'Add Recipe |';
  } else if (
    props.store.user.id != null &&
    props.store.user.access_level === 2
  ) {
    loginLinkData.path = '/home';
    loginLinkData.text = 'Account Pending |';
  }

  return (
    <div className="nav">
      {/* <Link to="/home">
        <h2 className="nav-title">Prime Solo Project</h2>
      </Link> */}
      {/* <Button variant="contained" color="primary">
        LOGIN
      </Button> */}
      <div className="nav-center">
        <Grid container spacing={1} direction="row" justify="center">
          {/* <div item style={{ margin: '0px 40px 0px 40px' }}>
            {' '}
          </div> */}
          <Link
            onClick={() => props.dispatch({ type: 'GET_RANDOM_DETAILS' })}
            item
            className="nav-link"
            to="/home"
          >
            Home |
          </Link>
          <Link item className="nav-link" to="/all">
            All |
          </Link>
          <Link item className="nav-link" to="/creator">
            Creator |
          </Link>
          <Link item className="nav-link" to="/dishtype">
            Dish Type |
          </Link>
          <Link item className="nav-link" to={loginLinkData.path}>
            {/* Show this link if they are logged in or not,
          but call this link 'Home' if they are logged in,
          and call this link 'Login / Register' if they are not */}
            {loginLinkData.text}
          </Link>
          {/* Show the link to the info page and the logout button if the user is logged in */}
          {props.store.user.id && (
            <>
              <LogOutButton item className="nav-link" />
            </>
          )}
          {/* Always show this link since the about page is not protected */}
          {/* <Link className="nav-link" to="/about">
              About
            </Link> */}
        </Grid>
      </div>
    </div>
  );
};

export default connect(mapStoreToProps)(Nav);
