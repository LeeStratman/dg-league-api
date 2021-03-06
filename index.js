const connectDB = require("./utils/db");
const express = require("express");
const cors = require("cors");
const auth = require("./routes/auth");
const users = require("./routes/users");
const leagues = require("./routes/leagues");
const courses = require("./routes/courses");
const events = require("./routes/events");
const errorHandler = require("./middlewares/errorHandler");
const { protect } = require("./middlewares/auth");

const app = express();

connectDB();

app.use(express.json());
app.use(cors());
app.use("/api/auth", auth);
app.use("/api/users", protect, users);
app.use("/api/leagues", protect, leagues);
app.use("/api/events", protect, events);
app.use("/api/courses", courses);
app.use(errorHandler);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});
