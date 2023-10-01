const mongoose = require('mongoose');

const dbConnection = async() => {
    try{
        await mongoose.connect(process.env.DB_CON);
        console.log("Database Online");
    }catch (error){
        console.log(error);
        throw new Error("Error trying to connect to the database");
    }
}

module.exports = {
    dbConnection
}