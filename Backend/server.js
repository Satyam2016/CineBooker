const express = require("express");
const cors = require("cors");
const { connectDB, sequelize } = require("./config/db");



const app = express();
const port = process.env.PORT ||  5000;


app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:3000"],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 


app.get("/", (req, res) => {
  res.send("Server started");
});


const startServer = async () => {
  await connectDB();
  app.listen(port, () => console.log(`---> Server running on port ${port}`));
};

startServer();