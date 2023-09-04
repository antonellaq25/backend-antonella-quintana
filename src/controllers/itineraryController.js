const Itinerary = require('../models/Itinerary');
const City = require('../models/City');

const getItineraries = async (req, res) => {
    try {
        const itineraries = await Itinerary.find();
        res.status(200).json(itineraries);
    } catch (error) {
        console.error('Error at obtaining the cities:', error);
        res.status(500).json({ error: 'Error at obtaining the cities' });
    }
};

const getItineraryById = async (req, res) => {
    try {
      const itinerary = await Itinerary.findById(req.params.id);
      if (!itinerary) {
        return res.status(404).json({ error: 'Itinerario no encontrado' });
      }
      res.status(200).json(itinerary);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener el itinerario' });
    }
  };

const postItinerary = async (req, res) => {
    try {
        const {itinerary_name, itinerary_picture, owner_name, owner_picture, price,like,tag, duration,city } = req.body;
        const itinerary= new Itinerary({ itinerary_name, itinerary_picture, owner_name, owner_picture, price,like,tag, duration,city });
        await itinerary.save();
        res.status(201).json(itinerary);
    } catch (error) {
        console.error('Error at creating itinerary:', error);
        res.status(500).json({ error: 'Error at creating a itinerary' });
    }
};
  
const deleteItinerary = async (req, res) => {
    const itineraryId = req.params.id;

    try {
        const deletedItinerary = await Itinerary.findByIdAndDelete(itineraryId);
        if (!deletedItinerary) {
            return res.status(404).json({ error: 'City not found' });
        }
        res.status(200).json({ message: 'City successfully deleted' });
    } catch (error) {
        console.error('Error at deleting a city:', error);
        res.status(500).json({ error: 'Error at deleting a city' });
    }
};

const updateItineraryById = async (req, res) => {
    try {
      const updatedItinerary = await Itinerary.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updatedItinerary) {
        return res.status(404).json({ error: 'Itinerario no encontrado' });
      }
      res.status(200).json(updatedItinerary);
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar el itinerario' });
    }
  };

  const getItinerariesByCityName = async (req, res) => {
    const cityName = req.params.cityName;
  
    try {
      const city = await City.findOne({ name: cityName });
  
      if (!city) {
        return res.status(404).json({ error: 'Ciudad no encontrada' });
      }
  
      const itineraries = await Itinerary.find({ 'city': city._id });
  
      res.status(200).json(itineraries);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los itinerarios por nombre de ciudad' });
    }
  };

module.exports ={
    postItinerary, getItineraries, deleteItinerary, getItineraryById ,updateItineraryById, getItinerariesByCityName
}