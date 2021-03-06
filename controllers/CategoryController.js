const Category = require("../models/Category")
const { validationResult } = require("express-validator")

exports.addCategory = async (req, res) => {
    const { categoryName, description } = req.body;

    const validationErr = validationResult(req)
    if (validationErr?.errors?.length > 0) {
        return res.status(400).json({ errors: validationErr.array() })
    }
    const existCategory = await Category.findOne({ categoryName })
    if (existCategory) {
        return res.status(400).json({ errors: [{message: "Category already exists"}] })
    }

    const category = new Category({
        categoryName,
        description
    });

    const addedCategory = await category.save({new: true})
    res.status(200).send(`${addedCategory} was added`)
}

exports.getCategory = async (req, res) => {
    try {
        const category = await Category.findById({_id: req.params.id})
        res.status(200).json(category)
    } catch (err) {
        return res.status(500).json({errors: [{messsage: err.message }]})
    }
}
exports.updateCategory = async (req, res) => {
    try {
        const validationErr = validationResult(req)
        if(validationErr?.errors?.length > 0){
            return res.status(400).json({errors: validationErr.array()})
        }
        const updatedCategory = await Category.findOneAndUpdate({_id: req.params.id}, {...req.body, status: "Updated", updatedDate: Date.now()}, {new: true, runValidators: true})
        res.status(200).json(updatedCategory)
    } catch (err) {
        return res.status(500).json({errors: [{message: err.message}]})
        
    }
}
exports.deleteCategory = async (req, res) => {
    try {
        const deletedCategory = await Category.findOneAndUpdate(
            {_id: req.params.id},
            {
                status: "deleted",
                deletedDate: Date.now()
            },
            {
                new: true
            }
        )
        res.status(200).json(deletedCategory)
    } catch (err) {
        return res.status(500).json({errors: [{message: err.message}]})
        
    }
}
exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.find({}).where("status", /[^deleted]/).select("-status")
        res.status(200).json(categories)
    } catch (err) {
        return res.status(500).json({errors: [{message: err.message}]})
    }
}

exports.destroyCategory = async (req, res) =>{
    try {
        await Category.deleteOne({_id: req.params.id})
        res.status(200).send("Data was deleted")
    } catch (err) {
        return res.status(500).json({errors: [{message: err.message}]})
    }
}