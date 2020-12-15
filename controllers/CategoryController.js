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
        return res.status(200).json(category)
    } catch (err) {
        return res.status(500).json({errors: [{messsage: err.message }]})
    }
}
exports.updateCategory = async (req, res) => {

}
exports.deleteCategory = async (req, res) => {

}
exports.getCategories = async (req, res) => {

}