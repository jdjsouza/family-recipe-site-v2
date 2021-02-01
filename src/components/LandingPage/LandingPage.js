import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

import './LandingPage.css';

// Import @material-UI
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

class LandingPage extends Component {
  componentDidMount() {
    this.props.dispatch({ type: 'GET_RANDOM_DETAILS' });
    console.log(this.props.store.randomDetails.ingredients);
  }
  render() {
    let ingredientList;
    if (this.props.store.randomDetails.ingredients === undefined) {
      ingredientList = <li key="1">Loading...</li>;
    } else {
      ingredientList = this.props.store.randomDetails.ingredients.map(
        (item, index) => {
          return <li key={index}>{item} </li>;
        }
      );
    }
    let updated = '';
    let posted;
    if (this.props.store.randomDetails.date_updated != null) {
      const date_updated = this.props.store.randomDetails.date_updated;
      const updatedYear = date_updated.substring(0, 4);
      const updatedMonth = date_updated.substring(5, 7);
      const updatedDay = date_updated.substring(8, 10);
      const updatedDate = updatedMonth + '/' + updatedDay + '/' + updatedYear;
      updated = `Updated: ${updatedDate}`;
    }
    if (this.props.store.randomDetails.date_posted != null) {
      const date_posted = this.props.store.randomDetails.date_posted;
      const postedYear = date_posted.substring(0, 4);
      const postedMonth = date_posted.substring(5, 7);
      const postedDay = date_posted.substring(8, 10);
      posted = postedMonth + '/' + postedDay + '/' + postedYear;
    }
    let image = (
      <div className="medium-food-image-placeholder medium-food-image"></div>
    );
    if (this.props.store.randomDetails.picture != '') {
      image = (
        <img
          className="food-image"
          src={this.props.store.randomDetails.picture}
          alt={this.props.store.randomDetails.recipe_name}
        />
      );
    }
    return (
      <div className="container">
        <Grid container spacing={1} direction="row" justify="center">
          <Grid item xs={12} style={{ textAlign: 'center' }}>
            <h2 className="recipe-title">
              {this.props.store.randomDetails.recipe_name}
            </h2>
          </Grid>
          <Grid item xs={12} style={{ textAlign: 'center' }}>
            <span>
              Creator: {this.props.store.randomDetails.first_name} Posted:{' '}
              {posted} {updated}
            </span>
          </Grid>
          <Grid item xs={8} align="center">
            {image}
          </Grid>
          <Grid item xs={7}>
            <Box>
              <p style={{ textAlign: 'center' }}>
                {this.props.store.randomDetails.brief_description}
              </p>
            </Box>
          </Grid>
          <Grid
            container
            item
            xs={12}
            spacing={4}
            direction="row"
            justify="center"
          >
            <Grid item>
              <Box pb={2} mb={2} borderBottom={1} pt={2} borderTop={1}>
                <div>Prep Time: {this.props.store.randomDetails.prep_time}</div>
                <div>Cook Time: {this.props.store.randomDetails.cook_time}</div>
              </Box>
              <Box mb={3}>
                <ul
                  style={{ listStyleType: 'none', margin: '0', padding: '0' }}
                >
                  {ingredientList}
                </ul>
              </Box>
            </Grid>
            <Grid item xs={12} sm={7}>
              <Box pt={2} borderTop={1}>
                <div
                  className="instructions"
                  style={{ whiteSpace: 'pre-wrap' }}
                >
                  {this.props.store.randomDetails.instructions}
                </div>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(LandingPage);
