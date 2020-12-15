const {check} = require("express-validator")

exports.categoryValidation = [
    check("categoryName", "Please enter a name minimum 2 chars and max 20 chars").isLength({min:2, max: 20}),
    check("description", "Please enter a name minimum 10 chars and max 200 chars").isLength({min:10, max: 200}),
]