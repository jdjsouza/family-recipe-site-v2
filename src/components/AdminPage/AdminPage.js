import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

// Material-UI Imports
import { Grid, Checkbox, FormControlLabel, Button } from '@material-ui/core';

class AdminPage extends Component {
  componentDidMount() {
    this.props.dispatch({ type: 'GET_ACCESS' });
  }

  handleDelete = (event) => {
    this.props.dispatch({
      type: 'DELETE_USER',
      payload: event.currentTarget.value,
    });
    this.props.dispatch({ type: 'GET_ACCESS' });
    console.log('DELETE', event.currentTarget.value);
  };

  handleApprove = (event) => {
    this.props.dispatch({
      type: 'APPROVE_USER',
      payload: event.currentTarget.value,
    });
    this.props.dispatch({ type: 'GET_ACCESS' });
    console.log('APPROVE', event.currentTarget.value);
  };

  render() {
    let userList;
    if (this.props.store.user.access_level != 0) {
      userList = (
        <h2 style={{ textAlign: 'center' }}>
          You are not authorized to view this area.
        </h2>
      );
    } else {
      if (this.props.store.theAccess === undefined) {
        userList = <li key={0}>Loading...</li>;
      } else {
        userList = this.props.store.theAccess.map((item, index) => {
          if (this.props.store.theAccess[index].access_level == 2) {
            return (
              <li style={{ marginBottom: '15px' }} key={index}>
                UN: {item.username} First: {item.first_name} Last:{' '}
                {item.last_name} Email: {item.email}{' '}
                <Button
                  value={item.id}
                  size="small"
                  variant="contained"
                  onClick={this.handleDelete}
                >
                  DELETE
                </Button>{' '}
                <Button
                  value={item.id}
                  size="small"
                  variant="contained"
                  onClick={this.handleApprove}
                >
                  APPROVE
                </Button>
              </li>
            );
          }
        });
      }
    }
    return (
      <div>
        <h2 style={{ textAlign: 'center' }}>Admin Page</h2>
        <div className="new-users">
          <ul style={{ listStyleType: 'none' }}>{userList}</ul>
        </div>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(AdminPage);
