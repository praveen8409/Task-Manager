const mongoose = require("mongoose");
require("dotenv").config();

const connectToMongoDB = async () => {
	try {
        
		await mongoose.connect(process.env.MONGODB_URL);
		console.log("Connected to MongoDB");
	} catch (error) {
		console.log("Error connecting to MongoDB", error.message);
	}
};

module.exports =  connectToMongoDB;
