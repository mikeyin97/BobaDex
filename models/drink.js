const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DrinkSchema = new Schema({
  name: {
    type: String,
    required: [true, 'The drink name field is required']
  },
  store: {
    type: String,
    required: [true, 'The store name field is required']
  },
  location: {
    type: String,
    required: [false]
  },
  price: {
    type: Number,
    required: [false]
  },
  rating: {
    type: Number,
    required: [true],
    validate: {
      validator : Number.isInteger,
      message   : 'The rating is not an integer value'
    }
  }
})

const Drink = mongoose.model('drink', DrinkSchema);

module.exports = Drink;