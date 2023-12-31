const express = require('express')
const router = express.Router()
const {getCities, getCity, deleteCity, postCity, patchCity} = require('../controllers/citiesController')
const { postItinerary, getItineraries, deleteItinerary, getItineraryById, updateItineraryById, getItinerariesByCityName} = require('../controllers/itineraryController')
const {signIn, signUp, signOut} = require('../controllers/userController');


module.exports = router

router.get("/cities", getCities)
router.get("/city/:id" , getCity)
router.post("/city" , postCity)
router.delete("/city/:id" , deleteCity)
router.patch('/city/:id', patchCity)

router.post("/itinerary", postItinerary);
router.delete("/itinerary/:id" , deleteItinerary)
router.get("/itinerary/:id" , getItineraryById)
router.patch("/itinerary/:id" , updateItineraryById)
router.get("/itineraries", getItineraries)
router.get("/itineraries/bycity/:cityName" , getItinerariesByCityName)

router.post('/signup', signUp);
router.post('/signin', signIn);
router.get('/signout', signOut);

module.exports = router
