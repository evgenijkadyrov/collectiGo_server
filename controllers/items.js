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
        const {
            name, tags, custom_string1_name,
            custom_string2_name,
            custom_string3_name
        } = req.body;
        const collectionId = req.params.id
        const userId = req.user.id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }
        const newItemData = {
            name: name,
            createdBy: user.name,
            tags: tags,
            collection_id: collectionId,
            custom_string1_name: custom_string1_name || null,
            custom_string2_name: custom_string2_name || null,
            custom_string3_name: custom_string3_name || null,
            custom_string1_state: !!custom_string1_name,
            custom_string2_state: !!custom_string2_name,
            custom_string3_state: !!custom_string3_name,

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
const deleteItem = async (req, res) => {
    try {
        const itemId = req.params.id;

        const deletedItem = await Item.findByIdAndDelete(itemId);

        if (!deletedItem) {
            return res.status(404).json({message: 'Item not found'});
        }


        res.status(200).json({message: 'Item deleted successfully'});
    } catch (err) {
        console.error('Error deleting item:', err);
        res.status(500).json({message: 'Failed to delete item'});
    }
};
const updateItem = async (req, res) => {
    try {

        const {
            name, tags, custom_string1_name,
            custom_string2_name,
            custom_string3_name
        } = req.body;
        const itemId = req.params.id

        const newItemData = {
            name: name,
            tags: tags,
            custom_string1_name: custom_string1_name || null,
            custom_string2_name: custom_string2_name || null,
            custom_string3_name: custom_string3_name || null,
            custom_string1_state: !!custom_string1_name,
            custom_string2_state: !!custom_string2_name,
            custom_string3_state: !!custom_string3_name,

        };
        const newItem = await Item.findByIdAndUpdate(itemId, newItemData, {new: true});
        if (!newItem) {
            return res.status(404).json({message: 'Item not found'});
        }


        await newItem.save();
        res.status(201).json({
            message: 'Item updated successfully',
            item: newItem
        });
    } catch (err) {
        console.error('Error update item:', err);
        res.status(500).json({message: 'Failed to update item'});
    }
};
module.exports = {createItem, fetchItems, deleteItem, updateItem}