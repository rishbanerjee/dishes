
const Dish = require('../models/dishModel');
const Pusher = require('pusher');
require('dotenv').config();

const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.PUSHER_KEY,
    secret: process.env.PUSHER_SECRET,
    cluster: process.env.PUSHER_CLUSTER,
    useTLS: true
});
const getDishes = async (req, res) => {
    try {
        const dishes = await Dish.find();
        res.json(dishes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const togglePublish = async (req, res) => {
    try {
        console.log('Toggle Publish Request:', req.params.id);
        const dish = await Dish.findById(req.params.id);
        if (!dish) {
            console.error('Dish not found:', req.params.id);
            return res.status(404).json({ message: 'Dish not found' });
        }
        
        console.log('Found dish:', dish);

        dish.isPublished = !dish.isPublished;
        await dish.save();
        
        console.log('Updated dish:', dish);

        pusher.trigger('dishes', 'update', dish);
        console.log('Pusher event triggered:', dish);

        res.json(dish);
    } catch (error) {
        console.error('Error toggling publish:', error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getDishes, togglePublish };
