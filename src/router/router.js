const express = require('express')
const router = express.Router()
const {getCities, getCity, deleteCity, postCity, patchCity} = require('../controllers/citiesController')


router.get("/cities", getCities)
router.get("/city/:id" , getCity)
router.post("/city" , postCity)
router.delete("/city/:id" , deleteCity)
router.patch('/city/:id', patchCity);

module.exports = router
