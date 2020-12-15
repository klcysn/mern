
const mongoose = require("mongoose")


const DB = async () =>{
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })
        console.log("successfully connected to DB")
    }catch(err){
        console.log("Error connecting DB", err)
    }
}

module.exports = DB;