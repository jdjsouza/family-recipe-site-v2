import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

// import @material-ui
import Grid from '@material-ui/core/Grid';

// byUser is the store
class AllRecipes extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'GET_ALL',
    });
    console.log(this.props.store.AllRecipes);
    console.log(this.props.store.theCreators);
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
    // let creator;
    // for (let i = 0; i < this.props.store.theCreators.length; i++) {
    //   if (this.props.store.theCreators[i].id == this.props.match.params.id) {
    //     creator = this.props.store.theCreators[i].first_name;
    //     console.log(creator);
    //   }
    // }
    let recipeList;
    if (this.props.store.allRecipes === undefined) {
      recipeList = (
        <li style={{ textAlign: 'center' }} key="1">
          Loading...
        </li>
      );
    } else {
      recipeList = this.props.store.allRecipes.map((item, index) => {
        let recipeImage = (
          <div className="small-food-image-placeholder small-food-image"></div>
        );
        if (this.props.store.allRecipes[index].picture != '') {
          recipeImage = (
            <img
              item
              className="small-food-image"
              src={this.props.store.allRecipes[index].picture}
              alt={this.props.store.allRecipes[index].recipe_name}
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
        <h2 style={{ textAlign: 'center' }}>All Recipes</h2>
        <Grid container spacing={1} direction="row" justify="center">
          <Grid item>
            <ul style={{ listStyleType: 'none' }}>{recipeList}</ul>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(AllRecipes);
