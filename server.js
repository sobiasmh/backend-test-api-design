const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const bodyParser = require("body-parser");

// FOR CORS
const cors = require("cors");
// set corsConfig if required
const corsConfig = {};

//config
// dotenv.config({
//   path: "",
// });
//Connect Database
mongoose.connect(process.env.MONGO_URI, {
  //dbName: "merntest",
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("Connected to db"));

app.use(express.json());
app.use(cors(corsConfig));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
//router
const userRouter = require("./routes/userRoute");
app.use("/", userRouter);
// mongoose.connect(
//   "mongodb+srv://sobiaa930:sobia12345@cluster0.zkf6bhi.mongodb.net/test"
// );
app.listen(5000, () => console.log("server started"));
