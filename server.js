const express = require("express");
require("express-async-errors");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");

//database connection
require("./mongo");

//Model
require("./model/Post");
require("./model/Comment");

//Middleware
app.use(bodyParser.json())
    .use(morgan())
//Routes
app.use("/posts",require("./routes/posts"));

//Not Found Routes
app.use((req,res,next) => {
    req.status = 404;
    const error = new Error("Routes not found");
    next(error);
});

//Error Handler
if(app.get("env") === "production") {
    app.use((error,req,res,next) => {
        res.status(req.status || 500).send({
            message: error.message
        })
    })
}
app.use((error,req,res,next) => {
    res.status(req.status || 500).send({
        message: error.message,
        stack: error.stack
    })
})

app.listen(3001,function(){
    console.log("Server is running on port 3001")
})
