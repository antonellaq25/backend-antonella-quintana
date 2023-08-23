const City = require('../models/City');




const getCities = async (req, res) => {
    try {
        const cities = await City.find();
        res.status(200).json(cities);
    } catch (error) {
        console.error('Error at obtaining the cities:', error);
        res.status(500).json({ error: 'Error at obtaining the cities' });
    }
};

const getCity = async (req, res) => {
    const cityId = req.params.id;

    try {
        const city = await City.findById(cityId);
        if (!city) {
            return res.status(404).json({ error: 'City not found' });
        }
        res.status(200).json(city);
    } catch (error) {
        console.error('Error at obtaining the cities:', error);
        res.status(500).json({ error: 'Error at trying to get the city' });
    }
};

const deleteCity = async (req, res) => {
    const cityId = req.params.id;

    try {
        const deletedCity = await City.findByIdAndDelete(cityId);
        if (!deletedCity) {
            return res.status(404).json({ error: 'City not found' });
        }
        res.status(200).json({ message: 'City successfully deleted' });
    } catch (error) {
        console.error('Error at deleting a city:', error);
        res.status(500).json({ error: 'Error at deleting a city' });
    }
};

const postCity = async (req, res) => {
    try {
        const { name, country, photo } = req.body;
        const city = new City({ name, country, photo });
        await city.save();
        res.status(201).json(city);
    } catch (error) {
        console.error('Error at creating a city:', error);
        res.status(500).json({ error: 'Error at creating a city' });
    }
};

const patchCity = async (req, res) => {
    const cityId = req.params.id;
    const updates = req.body;

    try {
        const updatedCity = await City.findByIdAndUpdate(cityId, updates, { new: true });
        if (!updatedCity) {
            return res.status(404).json({ error: 'City not found' });
        }
        res.status(200).json(updatedCity);
    } catch (error) {
        console.error('Error at updating a city:', error);
        res.status(500).json({ error: 'Error at updating a city' });
    }
};
module.exports ={
    getCities, getCity, deleteCity, postCity, patchCity
}