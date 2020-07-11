const express = require("express");
const connectDB = require('./config/db')
const path = require('path');

const app = express();


const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

connectDB()

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/api/users", require("./routes/users"));
app.use("/api/comment", require("./routes/comment"));
app.use("/api/like", require("./routes/like"));
app.use("/api/favorite", require("./routes/favorite"));


app.use("/uploads", express.static("uploads"));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server Running at ${PORT}`);
});
