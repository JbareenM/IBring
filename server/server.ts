const express = require("express");
const app = express();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const userRouter = require("./Routes/userRoutes");
const listRouter = require("./Routes/listRoutes");

app.use(express.static("../client/build"));
app.use(express.json());
app.use(cookieParser());

require('dotenv').config();

mongoose.connect(`mongodb+srv://${process.env.MONGODB_EMAIL}:${process.env.MONGODB_PASS}@cluster0.sqzq0.mongodb.net/test`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("connected to DB!");
});

app.use("/user", userRouter);
app.use("/meeting", listRouter);
const path = require('path');

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', "client", 'build', 'index.html'));
})

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server running on port ${port} 🔥`));