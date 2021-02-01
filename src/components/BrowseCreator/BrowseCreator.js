import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

// import @material-ui
import Grid from '@material-ui/core/Grid';

class BrowseCreator extends Component {
  componentDidMount() {
    // this.props.dispatch({
    //   type: 'GET_CREATORS',
    // });
    console.log(this.props.store.theCreators);
  }

  //   /api/recipe/user/:id
  handleClickCreator = (id) => (event) => {
    console.log(id);
    this.props.dispatch({
      type: 'GET_BY_USER',
    });
    this.props.history.push(`/creator_dishes/${id}`);
  };

  render() {
    console.log('in render', this.props.store.theCreators[0]);
    let creatorList;
    if (this.props.store.theCreators === undefined) {
      creatorList = <li key="1">Loading...</li>;
    } else {
      creatorList = this.props.store.theCreators.map((item, index) => {
        return (
          <li key={index}>
            <h3 onClick={this.handleClickCreator(item.id)} item>
              Recipes Created by {item.first_name}
            </h3>
          </li>
        );
      });
    }
    return (
      <div>
        <h2 className="browseByTitle">Browse by Recipe Creator</h2>
        <Grid container spacing={1} direction="row" justify="center">
          <Grid item>
            <ul style={{ listStyleType: 'none' }}>{creatorList}</ul>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(BrowseCreator);
