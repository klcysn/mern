const express = require("express")
require("dotenv").config()
const dbConnect = require("./models/dbConnect")
const router = require("./routers/router")


const app = express()
const port = process.env.port || 5000

app.listen(port, ()=>{
    console.log("I am listen")
})

dbConnect()

app.use(express.json())
app.use("/api", router)