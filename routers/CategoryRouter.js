const express = require("express")
const router = express.Router()
const CategoryController = require("../controllers/CategoryController")
const validations = require("../middleware/validationMiddleware")

router.post("/addCategory", validations.categoryValidation, CategoryController.addCategory)

router.get("/getCategory/:id", CategoryController.getCategory)

router.post("/update", validations.categoryValidation, CategoryController.updateCategory)

router.get("/deleteCategory", CategoryController.deleteCategory)

router.get("/destroyCategory", CategoryController.destroyCategory)

router.get("/", CategoryController.getCategories)

module.exports = router