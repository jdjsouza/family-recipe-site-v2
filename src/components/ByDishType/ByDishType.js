import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

// import @material-ui
import Grid from '@material-ui/core/Grid';

// theDishes is the store
class ByDishType extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'GET_BY_DISH_TYPES',
      payload: this.props.match.params.id,
    });
    console.log(this.props.store.theDishes);
    console.log(this.props.match.params.id);
  }

  handleClickRecipe = (id) => (event) => {
    console.log(id);
    this.props.dispatch({
      type: 'GET_RECIPE_DETAILS',
      payload: id,
    });
    this.props.history.push(`/details/${id}`);
  };

  render() {
    let dish;
    for (let i = 0; i < this.props.store.theDishTypes.length; i++) {
      if (this.props.store.theDishTypes[i].id == this.props.match.params.id) {
        dish = this.props.store.theDishTypes[i].dish_types;
        console.log(dish);
      }
    }
    let recipeList;
    if (this.props.store.theDishes === undefined) {
      recipeList = (
        <li style={{ textAlign: 'center' }} key="1">
          Loading...
        </li>
      );
    } else {
      recipeList = this.props.store.theDishes.map((item, index) => {
        let recipeImage = (
          <div className="small-food-image-placeholder small-food-image"></div>
        );
        if (this.props.store.theDishes[index].picture != '') {
          recipeImage = (
            <img
              item
              className="small-food-image"
              src={this.props.store.theDishes[index].picture}
              alt={this.props.store.theDishes[index].recipe_name}
            />
          );
        }
        return (
          <li item style={{ textAlign: 'center' }} key={index}>
            <h3 onClick={this.handleClickRecipe(item.id)} item>
              <Grid container spacing={2} alignItems="center">
                <Grid item>{recipeImage}</Grid>
                <Grid item>{item.recipe_name}</Grid>
              </Grid>
            </h3>
          </li>
        );
      });
    }
    return (
      <div>
        <h2 style={{ textAlign: 'center' }}>All {dish} dishes</h2>
        <Grid container spacing={1} direction="row" justify="center">
          <Grid item>
            <ul style={{ listStyleType: 'none' }}>{recipeList}</ul>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(ByDishType);
