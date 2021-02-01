import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

// import @material-ui
import Grid from '@material-ui/core/Grid';

class BrowseDishType extends Component {
  componentDidMount() {
    // this.props.dispatch({
    //   type: 'GET_BY_DISH_TYPES',
    // });
    console.log(this.props.store);
  }

  handleClickDishType = (id) => (event) => {
    console.log('Dish Type Dispatch', id);
    this.props.dispatch({
      type: 'GET_BY_DISH_TYPES',
    });
    this.props.history.push(`/typeofdish/${id}`);
  };

  render() {
    console.log('in render', this.props.store.theDishTypes);
    let dishList;
    if (this.props.store.theDishTypes === undefined) {
      dishList = <li key="1">Loading...</li>;
    } else {
      dishList = this.props.store.theDishTypes.map((item, index) => {
        return (
          <li key={index}>
            <h3 onClick={this.handleClickDishType(item.id)} item>
              {item.dish_types}
            </h3>
          </li>
        );
      });
    }
    return (
      <div>
        <h2 className="browseByTitle">Browse by Type of Dish</h2>
        <Grid container spacing={1} direction="row" justify="center">
          <Grid item>
            <ul style={{ listStyleType: 'none' }}>{dishList}</ul>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(BrowseDishType);
