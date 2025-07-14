//import dependencies

//express is a fast and minimal web framework for Node.js used to create server-side applications and APIs.
const express=require("express");

//mongoose is an Object Data Modeling (ODM) library for MongoDB, simplifying database interactions.
const mongoose=require("mongoose");

//cors enables Cross-Origin Resource Sharing, allowing frontend applications to communicate with the backend across different domains.
const cors=require("cors");

//dotenv loads environment variables from a .env file, keeping sensitive data secure.
const dotenv=require("dotenv")


//configuring the express app:
dotenv.config();
const app=express();

//setting up middleware
app.use(cors()); //Allows API access from different origins.

app.use(express.json()); //Parses incoming JSON requests.

//connecting to middleware
const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connected");
    }catch(err){
        console.error("MongoDB Connection Failed: ",err);
        process.exit(1);
    }
};
connectDB();

//defining routes
const tasksRoutes=require("./routes/tasks");
app.use("/api/tasks",tasksRoutes);

//start the server
const PORT=process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});

