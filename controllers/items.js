const {User} = require("../models/user");
const {Item} = require("../models/item");

const fetchItems = async (req, res) => {
    try {
        const collectionId = req.params.id
        const items = await Item.find({collection_id: collectionId})
        res.status(200).json({message: 'Items getting success', items})
    } catch (err) {
        res.status(500).json({message: "Failed to receive collections"})
    }
}
const createItem = async (req, res) => {
    try {
        const {name, tags} = req.body;
        const collectionId = req.params.id
        const userId = req.user.id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }
        const newItemData = {
            name: name,
            author: user.name,
            tags: tags,
            collection_id: collectionId
        };
        const newItem = await Item.create(newItemData);
        await newItem.save();
        res.status(201).json({
            message: 'Item created successfully',
            item: newItem
        });
    } catch (err) {
        console.error('Error creating item:', err);
        res.status(500).json({message: 'Failed to create item'});
    }
};
module.exports = {createItem, getItems: fetchItems}