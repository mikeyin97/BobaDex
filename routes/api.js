const express = require ('express');
const router = express.Router();
const Drink = require('../models/drink');

router.get('/drinks', (req, res, next) => {
  Drink.find({})
    .then(data => res.json(data))
    .catch(next)
}); 

router.post('/drinks', (req, res, next) => {
  if(req.body.name && req.body.store && req.body.rating){
    Drink.create(req.body)
      .then(data => res.json(data))
      .catch(next)
  }else {
    res.json({
      error: "The input field is missing values"
    })
  }
});

router.delete('/items/:id', (req, res, next) => {
  Drink.findOneAndDelete({"_id": req.params.id})
    .then(data => res.json(data))
    .catch(next)
})

router.get('/quicksearch', (req, res, next) => {
  let query;
  let keywords;
  
  keywords = req.query.query.replace(' ', "|");
  keywordsQuery = ".*" + keywords + ".*";

  query = {$or:
    [
      {name: {$regex : keywordsQuery}},
      {store: {$regex : keywordsQuery}},
      {location: {$regex : keywordsQuery}},
    ]
  };
  
  Drink.find(query)
  .then(data => res.json(data))
  .catch(next)
})


router.get('/search', (req, res, next) => {
  let name;
  let store;
  let location;

  let query;

  query = {}

  if (req.query.name) {
    name = req.query.name;
    nameQuery = ".*" + name.slice(1, -1) + ".*";
    query["name"] = {$regex : nameQuery};
  }

  if (req.query.store) {
    store = req.query.store;
    storeQuery = ".*" + store.slice(1, -1) + ".*";
    query["store"] = {$regex : storeQuery};
  }

  if (req.query.location) {
    location = req.query.location;
    locationQuery = ".*" + location.slice(1, -1) + ".*";
    query["location"] = {$regex : locationQuery};
  }

  if (req.query.maxPrice) {
    query["price"] = {}
    query["price"]["$lte"] = req.query.maxPrice;
  }

  if (req.query.minPrice) {
    if (!(query["price"])) {
      query["price"] = {}
    }
    query["price"]["$gte"] = req.query.minPrice;
  }

  if (req.query.maxRating) {
    query["rating"] = {}
    query["rating"]["$lte"] = req.query.maxRating;
  }

  if (req.query.minRating) {
    if (!(query["rating"])) {
      query["rating"] = {}
    }
    query["rating"]["$gte"] = req.query.minRating;
  }


  Drink.find(query)
    .then(data => res.json(data))
    .catch(next)
})

module.exports = router;