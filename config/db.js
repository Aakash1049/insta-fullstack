const mongoose = require("mongoose")
mongoose.set('strictQuery', false);
const db = process.env.MONGO_URI;
console.log(db)
const connectDatabase =async()=>{
    try {

        await mongoose.connect(db);
        console.log('MongoDB is Connected...')
    } catch (err) {
        console.error(err.message);
        console.log('Check Your ENV VAR')
        process.exit(1)
    }
}
module.exports = connectDatabase;