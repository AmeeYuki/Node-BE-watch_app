const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
var logger = require("morgan");
require("dotenv").config();
const setupSwagger = require("./swagger/swagger"); // Import swagger setup

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(logger("dev"));

// MongoDB Connection
const mongoURI =
  process.env.MONGO_URI || "mongodb://localhost:27017/SDN301m-BE-Assignment";
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection successfully");
});

// Swagger setup
setupSwagger(app); // Thiết lập Swagger

// Define routes
const todoRouter = require("./routes/todo.routes");
const brandRouter = require("./routes/brand.routes");
const commentRouter = require("./routes/comment.routes");
const memberRouter = require("./routes/member.routes");
const watchRouter = require("./routes/watch.routes");
app.use("/todos", todoRouter);
app.use("/members", memberRouter);
app.use("/brands", brandRouter);
app.use("/comments", commentRouter);
app.use("/watches", watchRouter);

// Start server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
