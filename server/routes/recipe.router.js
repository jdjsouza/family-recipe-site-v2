const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

// GET is for a random recipe to be displayed on the homepage
// URL: /api/recipe/random

router.get('/random', (req, res) => {
  const queryText = `SELECT id FROM "recipes" ORDER BY RANDOM() LIMIT 1;`;
  pool
    .query(queryText)
    .then((result) => {
      const randomID = Number(result.rows[0].id);
      console.log(randomID);
      const queryText = `SELECT "recipes".*, "user".first_name, array_agg("ingredients".ingredient || ' ' || "ingredients".quantity || ' ' || "units".unit) as "ingredients"
      FROM "recipes", "ingredients", "units", "ingredients_units", "user"
      WHERE "recipes".id = $1 AND "ingredients".recipe_id = $1 AND "units".id = "ingredients_units".units_id
      AND "ingredients_units".ingredients_id = "ingredients".id AND "user".id = "recipes".user_id
      GROUP BY "recipes".id, "user".first_name;`;
      pool
        .query(queryText, [randomID])
        .then((result) => {
          console.log(result.rows);
          res.send(result.rows[0]);
        })
        .catch((err) => {
          console.log('Error getting random recipe details', err);
          res.sendStatus(500);
        });
    })
    .catch((err) => {
      console.log('Error getting random recipe ID', err);
      res.sendStatus(500);
    });
});

// GET all users who have submitted a recipe
// URL: /api/recipe/user

router.get('/user', (req, res) => {
  const queryText = `SELECT "user".first_name, "user".id FROM "user"
  WHERE EXISTS 
  (SELECT "recipes".user_id from "recipes" where "recipes".user_id = "user".id)`;
  pool
    .query(queryText)
    .then((result) => {
      console.log(result.rows);
      res.send(result.rows);
    })
    .catch((err) => {
      console.log('Error getting creators', err);
      res.sendStatus(500);
    });
});

// GET all recipes (name, pic, brief_desc) created by a specific creator
// URL: /api/recipe/user/:id

router.get('/user/:id', (req, res) => {
  const queryText = `SELECT id, recipe_name, picture, brief_description FROM recipes
  WHERE "user_id" = $1
  ORDER BY "recipe_name" ASC;`;
  pool
    .query(queryText, [req.params.id])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log('Error getting creator recipes', err);
      res.sendStatus(500);
    });
});

// Get all Dish Types that have recipes associated with them for browsing
// URL: /api/recipe/dish/

router.get('/dish', (req, res) => {
  const queryText = `SELECT "type_of_dish".dish_types, "type_of_dish".id FROM "type_of_dish"
  WHERE EXISTS 
  (SELECT "recipe_dish".dish_id from "recipe_dish" where "recipe_dish".dish_id = "type_of_dish".id) ORDER BY "type_of_dish".id ASC;`;
  pool
    .query(queryText)
    .then((result) => {
      console.log('in dish', result.rows);
      res.send(result.rows);
    })
    .catch((err) => {
      console.log('Error getting creator recipes', err);
      res.sendStatus(500);
    });
});

// Get all recipes (name, pic, brief_desc) with a specific dish type
// URL: /api/recipe/dish/:id

router.get('/dish/:id', (req, res) => {
  console.log('req params', req.params);
  const queryText = `SELECT "recipes".id, "recipes".recipe_name, "recipes".picture, "recipes".brief_description, "recipe_dish".dish_id 
  FROM recipes, recipe_dish
  WHERE "recipe_dish".recipe_id = "recipes".id AND "recipe_dish".dish_id = $1
  ORDER BY "recipe_name" ASC;`;
  pool
    .query(queryText, [req.params.id])
    .then((result) => {
      console.log(result);
      res.send(result.rows);
    })
    .catch((err) => {
      console.log('Error getting specific dish recipes', err);
      res.sendStatus(500);
    });
});

// GET all the units and unit ID's from the units table
// URL: /api/recipe/units

router.get('/units', (req, res) => {
  console.log('units', req.params);
  const queryText = `SELECT * from "units";`;
  pool
    .query(queryText)
    .then((result) => {
      console.log(result);
      res.send(result.rows);
    })
    .catch((err) => {
      console.log('Error getting units', err);
      res.sendStatus(500);
    });
});

// GET all of the dish_types and ID's from the type_of_dish table
// URL: /api/recipe/dish-types

router.get('/dish-types', (req, res) => {
  console.log('units', req.params);
  const queryText = `SELECT * from "type_of_dish";`;
  pool
    .query(queryText)
    .then((result) => {
      console.log(result);
      res.send(result.rows);
    })
    .catch((err) => {
      console.log('Error getting units', err);
      res.sendStatus(500);
    });
});

// Get all recipes (name, pic, brief_desc) with an ingredient specified in the search bar

router.get('/', (req, res) => {
  const queryText = 'SELECT * FROM recipes ORDER BY "recipe_name" ASC;';
  pool
    .query(queryText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log('Error getting specific dish recipes', err);
      res.sendStatus(500);
    });
});

// This will be used to pull all the info for the details page
// the call ID will be passed from multiple pages: browse by creator, browse by specific dish type, search results
// URL: /api/recipe/details/:id

router.get('/details/:id', (req, res) => {
  const queryText = `SELECT "recipes".*, array_agg("ingredients".ingredient || ' ' || "ingredients".quantity || ' ' || "units".unit) as "ingredients"
  FROM "recipes", "ingredients", "units", "ingredients_units" 
  WHERE "recipes".id = $1 AND "ingredients".recipe_id = $1 AND "units".id = "ingredients_units".units_id
  AND "ingredients_units".ingredients_id = "ingredients".id
  GROUP BY "recipes".id;`;
  pool
    .query(queryText, [req.params.id])
    .then((result) => {
      res.send(result.rows[0]);
    })
    .catch((err) => {
      console.log('Error getting recipe details', err);
      res.sendStatus(500);
    });
});

// POST recipe will send info to multiple tables
// URL: /api/recipe/

router.post('/', rejectUnauthenticated, (req, res) => {
  if (req.user.access_level === 2) {
    res.sendStatus(403);
    return;
  }
  try {
    console.log(req.body);
    // RETURNING "id" will give us back the id of the created recipe
    const insertRecipeQuery = `
  INSERT INTO "recipes" ("recipe_name", "picture", "prep_time", "cook_time", 
  "brief_description", "instructions", "user_id")
  VALUES ($1, $2, $3, $4, $5, $6, $7)
  RETURNING "id";`;

    // FIRST QUERY MAKES RECIPE
    pool
      .query(insertRecipeQuery, [
        req.body.recipe_name,
        req.body.picture,
        parseInt(req.body.prep_time),
        parseInt(req.body.cook_time),
        req.body.brief_description,
        req.body.instructions,
        req.body.user_id,
      ])
      .then((result) => {
        const createdRecipeId = result.rows[0].id; // Need the ID from the table for the previous query
        const allDishRelationships = []; // putting .query in the array
        for (let i = 0; i < req.body.dish_id.length; i++) {
          // iterate through the thing I need to insert multiple times
          console.log('New Recipe Id:', result.rows[0].id); //ID IS HERE!

          // Depending on how you make your junction table, this insert COULD change.
          const insertRecipeDishQuery = `
      INSERT INTO "recipe_dish" ("recipe_id", "dish_id")
      VALUES  ($1, $2);
      `;
          // SECOND QUERY MAKES RECIPE TO DISH TYPE RELATION IN JUNCTION TABLE
          allDishRelationships.push(
            // pushing pool.query into this array for the Promise.all
            pool.query(insertRecipeDishQuery, [
              createdRecipeId,
              parseInt(req.body.dish_id[i]),
            ])
          );
        }

        let allIngredients = []; // another array for another loop
        for (let i = 0; i < req.body.materials.length; i++) {
          console.log('Third Query New Recipe Id:', result.rows[0].id); //ID IS HERE!

          const insertRecipeDishQuery = `
        INSERT INTO "ingredients" ("recipe_id", "ingredient", "quantity")
        VALUES  ($1, $2, $3)
        RETURNING "id";`;

          // THIRD QUERY ADDS INGREDIENTS TO INGREDIENT TABLE
          allIngredients.push(
            // pushing pool.query into this array for the Promise.all
            pool.query(insertRecipeDishQuery, [
              createdRecipeId,
              req.body.materials[i].ingredient,
              parseInt(req.body.materials[i].quantity),
            ])
          );
        }
        Promise.all(allDishRelationships); // 0, 1, 2 all are back, and move on to .then
        // demands all promises be returned for the pool.queries in the array we made allDishRelationships
        Promise.all(allIngredients) // .then .catch
          .then((resultList) => {
            let ingredientUnit = [];
            console.log('end third query', resultList, resultList.length);

            for (let i = 0; i < resultList.length; i++) {
              console.log('Fourth Query New Recipe Id:', result.rows[0].id); //ID IS HERE!
              const createdIngredientId = resultList[i].rows[0].id;
              const insertUnitQuery = `
              INSERT INTO "ingredients_units" ("units_id", "ingredients_id")
              VALUES  ($1, $2);`;

              ingredientUnit.push(
                pool.query(insertUnitQuery, [
                  parseInt(req.body.materials[i].unit_id),
                  createdIngredientId,
                ])
              );
            }
            console.log('Fourth Query For Loop', ingredientUnit);
            Promise.all(ingredientUnit).then((result) => {
              res.sendStatus(201);
            });
          });
      });
  } catch (err) {
    console.log('first query post', err);
    res.sendStatus(500);
  }
});

// Need PUT route, require authentication logged in user must match creator username
// URL: /api/recipe/

// DELETE RECIPE ROUTE needed - ADMIN Only Function
// URL: /api/recipe/

module.exports = router;
