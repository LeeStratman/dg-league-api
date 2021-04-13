const connectDB = require("./utils/db");
const express = require("express");
const cors = require("cors");
const app = express();
const users = require("./routes/users");
const courses = require("./routes/courses");
const rounds = require("./routes/rounds");

connectDB();

app.use(express.json());
app.use(cors());
app.use("/api/users", users);
app.use("/api/courses", courses);
app.use("/api/rounds", rounds);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});
