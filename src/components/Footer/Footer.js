import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import mapStoreToProps from '../../redux/mapStoreToProps';

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

const Footer = (props) => {
  let adminDataLink = {
    path: '',
    text: '',
  };

  if (props.store.user.access_level === 0) {
    adminDataLink.path = '/admin';
    adminDataLink.text = '| Admin';
  }
  return (
    <div className="nav-btm">
      <Grid container spacing={1} direction="row" justify="center">
        <Link item className="btm-nav-link" to="/about">
          About |
        </Link>
        <Link item className="btm-nav-link" to="/registration">
          Register{' '}
        </Link>
        <Link
          item
          className="nav-link"
          to={adminDataLink.path}
          onClick={() => props.dispatch({ type: 'GET_ACCESS' })}
        >
          {/* Show this link if they are logged in or not,
          but call this link 'Home' if they are logged in,
          and call this link 'Login / Register' if they are not */}
          {adminDataLink.text}
        </Link>
      </Grid>
    </div>
  );
};

export default connect(mapStoreToProps)(Footer);
