const { Collection} = require('../models/collection')
const moment = require("moment-timezone");


const getCollections = async (req, res) => {
    try {
        const collections = await Collection.find().sort({ createdAt: -1 })
        res.status(200).json(collections)
    } catch (err) {
        res.status(500).json({message: "Failed to receive users"})
    }
}
const createCollection = async (req, res) => {
    try {
        const {title, category, picture} = req.body;
        const currentDateUTC = new Date()
        const currentDateBLR = moment(currentDateUTC).tz('Europe/Minsk').add(3, 'hours')
        const newCollection = await Collection.create({
            title: title,
            category: category,
            picture: picture,
            createdAt:currentDateBLR,

        });
        await newCollection.save();
        const userId = req.user.id;
        const user = await User.findById(userId);
        user?.collections.unshift(newCollection._id);

        await user?.save();
        res.status(201).json({
            message: 'Collection created successfully',
            collection: newCollection
        });
    } catch (err) {
        console.error('Error creating collection:', err);
        res.status(500).json({message: 'Failed to create collection'});
    }
};
const deleteCollection = async (req, res) => {
    try {
        const collectionId = req.params.id;

        const deletedCollection = await Collection.findByIdAndDelete(collectionId);

        if (!deletedCollection) {
            return res.status(404).json({ message: 'Collection not found' });
        }

        const userId = req.user.id;
        const user = await User.findById(userId);
        user.collections = user.collections.filter(collection => collection.toString() !== collectionId);
        await user.save();

        res.status(200).json({ message: 'Collection deleted successfully' });
    } catch (err) {
        console.error('Error deleting collection:', err);
        res.status(500).json({ message: 'Failed to delete collection' });
    }
};
module.exports = { getCollections, createCollection,deleteCollection}