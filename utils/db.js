const mongoose = require("mongoose");
const config = require("config");

function connectDB() {
  mongoose
    .connect(config.get("mongoURI"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    .then(() => console.log("Connected to database..."))
    .catch((err) => {
      console.log(`Could not connect to database. ERROR: ${err}`);
      process.exit(1);
    });
}

module.exports = connectDB;
