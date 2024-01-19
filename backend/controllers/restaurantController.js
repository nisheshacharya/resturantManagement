// controllers/restaurantController.js
const Restaurant = require('../models/restaurant');

// Create a new restaurant
exports.createRestaurant = async (req, res) => {

  const { name, phone, foods, notes } = req.body;

  const restaurant = new Restaurant(name, phone, foods, notes);

  try {
    const insertedId = await restaurant.save();
    res.status(201).json({ message: 'Restaurant created successfully', _id: insertedId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get restaurant by ID
exports.getRestaurantById = async (req, res) => {
  const { restaurantId } = req.params;


  try {
    const restaurant = await Restaurant.findById(restaurantId);

    if (!restaurant) {
      return res.status(404).json({ success: true, message: 'Restaurant not found' });
    }



    res.status(200).json(restaurant);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// List all restaurants
exports.listRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.findAll();

    if (!restaurants || restaurants.length === 0) {
      return res.status(404).json({ message: 'No restaurants found' });
    }

    res.status(200).json(restaurants);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Add a food item to a restaurant
exports.addFood = async (req, res) => {
  const { restaurantId } = req.params;
  const { name, origin, price, date, image } = req.body;
  try {
    const newFood = { name, origin, price, date, image };
    const result = await Restaurant.addFood(restaurantId, newFood);

    if (result.modifiedCount === 0) {
      return res.status(404).json({ success: true, message: 'Restaurant not found' });
    }

    res.status(200).json({ success: true, message: 'Food item added successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};


exports.addToCart = async (req, res) => {
  const { restaurantId } = req.params;
  const { name, origin, price, date, image } = req.body;
  try {
    const newFood = { name, origin, price, date, image };
    const result = await Restaurant.addToCart(restaurantId, newFood);

    if (result.modifiedCount === 0) {
      return res.status(404).json({ success: true, message: 'Restaurant not found' });
    }

    res.status(200).json({ success: true, message: 'Item added in the cart' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};


exports.addNote = async (req, res) => {
  const { restaurantId } = req.params;
  const newNote = req.body;

  try {

    const result = await Restaurant.addNote(restaurantId, newNote);

    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    res.status(200).json({ success: true, message: 'Note added successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update a food item
exports.updateFood = async (req, res) => {
  const { restaurantId, foodId } = req.params;
  const updatedFood = req.body; // Make sure the request body contains the updated food data

  try {
    const result = await Restaurant.updateFood(restaurantId, foodId, updatedFood);

    if (result.modifiedCount === 1) {
      res.status(200).json({ success: true, message: 'Food item updated successfully' });
    } else {
      res.status(404).json({ success: false, message: 'Food item not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};


exports.deleteFood = async (req, res) => {
  const { restaurantId, foodId } = req.params;
  try {
    const result = await Restaurant.deleteFood(restaurantId, foodId);

    if (result.modifiedCount === 1) {
      res.status(200).json({ success: true, message: 'Food deleted successfully' });
    } else {
      res.status(404).json({ message: 'Food  not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};


exports.checkOut = async (req, res) => {
  const { restaurantId, foodId } = req.params;
  try {
    const result = await Restaurant.checkOut(restaurantId, foodId);

    if (result.modifiedCount === 1) {
      res.status(200).json({ success: true, message: 'Food deleted successfully' });
    } else {
      res.status(404).json({ message: 'Food  not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

exports.updateNote = async (req, res) => {
  const { restaurantId, foodId } = req.params;
  const updatedNote = req.body; // Make sure the request body contains the updated food data

  try {
    const result = await Restaurant.updateNote(restaurantId, foodId, updatedNote);

    if (result.modifiedCount === 1) {
      res.status(200).json({ message: 'Note updated successfully' });
    } else {
      res.status(404).json({ message: 'Note not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};





