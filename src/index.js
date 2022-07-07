require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const taskRouter = require("./routers/task-router");
const userRouter = require("./routers/user-router");
const port = process.env.PORT || 3000;
const app = express();
const errorMiddleware = require("./middleware/error");

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);
app.use(errorMiddleware);

const start = async () => {
    try {
        await mongoose.connect(process.env.DB_CONNECTION);
        app.listen(port, () => console.log(`Server started on PORT = ${port}`));
    } catch (err) {
        console.log(err);
    }
};
start();
