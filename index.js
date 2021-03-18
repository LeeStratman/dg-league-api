const connectDB = require("./utils/db");
const express = require("express");
const cors = require("cors");
const app = express();

connectDB();

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});