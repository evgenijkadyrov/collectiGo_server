const { Collection} = require('../models/collection')


const getCollections = async (req, res) => {
    try {
        const collections = await Collection.find()
        res.status(200).json(collections)
    } catch (err) {
        res.status(500).json({message: "Failed to receive users"})
    }
}
const createCollection = async (req, res) => {
    debugger
    try {

        const {title, category, picture} = req.body;
        const newCollection = await Collection.create({
            title: title,
            category: category,
            picture: picture,
        });

        await newCollection.save();
        debugger
        const userId = req.user.id;
        const user = await User.findById(userId);
        console.log(user)
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
module.exports = { getCollections, createCollection}