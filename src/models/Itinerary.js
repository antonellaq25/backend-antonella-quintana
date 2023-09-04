const mongoose = require('mongoose');


const itinerarySchema = new mongoose.Schema({ 
    itinerary_name: String,
    itinerary_picture: String,
    owner_name: String,
    owner_picture: String,
    price: Number,
    like: Number,
    tag: String,
    duration: Number,
    city: { type: mongoose.Schema.Types.ObjectId, ref: 'City' },
    
  });
  
  const Itinerary = mongoose.model('Itinerary', itinerarySchema);

module.exports = Itinerary;