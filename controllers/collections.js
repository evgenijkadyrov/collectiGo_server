const { Collection} = require('../models/collection')
const {User} = require('../models/user');
const moment = require("moment-timezone");


const getCollections = async (req, res) => {
    try {
        const collections = await Collection.find().sort({ createdAt: -1 })
        res.status(200).json(collections)
    } catch (err) {
        res.status(500).json({message: "Failed to receive collections"})
    }
}
const createCollection = async (req, res) => {
    try {
        const {title, category, picture,custom_string1_name,custom_string2_name,custom_string3_name,custom_string1_state,custom_string2_state,custom_string3_state} = req.body;
        const currentDateUTC = new Date()
        const currentDateBLR = moment(currentDateUTC).tz('Europe/Minsk')
        const newCollectionData = {
            title: title,
            category: category,
            picture: picture,
            createdAt: currentDateBLR,
        };

        newCollectionData[custom_string1_state] = custom_string1_name;
        newCollectionData[custom_string2_state] = custom_string2_name;
        newCollectionData[custom_string3_state] = custom_string3_name;

        const newCollection = await Collection.create(newCollectionData);
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
        // const userId = req.user.id;
        // const user = await User.findById(userId);
        // console.log(user)
        // user.collections = user.collections.filter(collection => collection.toString() !== collectionId);
        // console.log(user.collections)
        // await user.save();

        res.status(200).json({ message: 'Collection deleted successfully' });
    } catch (err) {
        console.error('Error deleting collection:', err);
        res.status(500).json({ message: 'Failed to delete collection' });
    }
};
const updateCollection = async (req, res) => {
    try {
        const collectionId = req.params.id;
        const { title, category, picture } = req.body;
        const currentDateUTC = new Date();
        const currentDateBLR = moment(currentDateUTC).tz('Europe/Minsk');

        const updatedCollection = await Collection.findByIdAndUpdate(
            collectionId,
            {
                title: title,
                category: category,
                picture: picture,
                createdAt: currentDateBLR,
            },
            { new: true }
        );

        if (!updatedCollection) {
            return res.status(404).json({ message: 'Collection not found' });
        }

        res.status(200).json({
            message: 'Collection updated successfully',
            collection: updatedCollection,
        });
    } catch (err) {
        console.error('Error updating collection:', err);
        res.status(500).json({ message: 'Failed to update collection' });
    }
};
module.exports = { getCollections, createCollection,deleteCollection,updateCollection}