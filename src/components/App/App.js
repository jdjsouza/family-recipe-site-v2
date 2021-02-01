import React, { Component } from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import { connect } from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import AboutPage from '../AboutPage/AboutPage';
import InfoPage from '../InfoPage/InfoPage';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import BrowseCreator from '../BrowseCreator/BrowseCreator';
import DishType from '../DishType/DishType';
import AllBy from '../AllBy/AllBy';
import ByDishType from '../ByDishType/ByDishType';
import Details from '../Details/Details';
import AddRecipe from '../AddRecipe/AddRecipe';
import AdminPage from '../AdminPage/AdminPage';

import './App.css';
import AllRecipes from '../AllRecipes/AllRecipes';

class App extends Component {
  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_USER' });
    this.props.dispatch({ type: 'GET_CREATORS' });
    this.props.dispatch({ type: 'GET_DISH_TYPES' });
  }

  render() {
    return (
      <Router>
        <div className="mainContent">
          <Nav />
          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
            <Redirect exact from="/" to="/home" />

            <Route
              // with authRedirect:
              // - if logged in, redirects to "/user"
              // - else shows LandingPage at "/home"
              exact
              path="/home"
              component={LandingPage}
            />

            {/* Visiting localhost:3000/about will show the about page. */}
            <Route
              // shows AboutPage at all times (logged in or not)
              exact
              path="/about"
              component={AboutPage}
            />
            <Route
              // route to all recipes
              exact
              path="/all"
              component={AllRecipes}
            />

            <Route
              // route to browse by creator
              exact
              path="/creator"
              component={BrowseCreator}
            />

            <Route
              // route to browse by creator
              exact
              path="/creator_dishes/:id"
              component={AllBy}
            />

            <Route
              // route to browse dishes by type
              exact
              path="/details/:id"
              component={Details}
            />

            <Route
              // route to browse by dish type
              exact
              path="/dishtype"
              component={DishType}
            />

            <Route
              // route to browse by dish type
              exact
              path="/add-new"
              component={AddRecipe}
            />

            <Route
              // route to browse dishes by type
              exact
              path="/typeofdish/:id"
              component={ByDishType}
            />

            <ProtectedRoute
              // logged in shows InfoPage else shows LoginPage
              exact
              path="/info"
              component={InfoPage}
            />

            <ProtectedRoute
              // logged in shows InfoPage else shows LoginPage
              exact
              path="/admin"
              component={AdminPage}
            />

            {/* When a value is supplied for the authRedirect prop the user will
            be redirected to the path supplied when logged in, otherwise they will
            be taken to the component and path supplied. */}
            <ProtectedRoute
              // with authRedirect:
              // - if logged in, redirects to "/user"
              // - else shows LoginPage at /login
              exact
              path="/login"
              component={LoginPage}
              authRedirect="/home"
            />
            <ProtectedRoute
              // with authRedirect:
              // - if logged in, redirects to "/user"
              // - else shows RegisterPage at "/registration"
              exact
              path="/registration"
              component={RegisterPage}
              authRedirect="/home"
            />

            {/* If none of the other routes matched, we will show a 404. */}
            <Route render={() => <h1>404</h1>} />
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default connect()(App);
