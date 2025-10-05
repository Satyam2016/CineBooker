const express = require("express");
const cors = require("cors");
const db  = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const cinemaRoutes = require("./routes/cinemaRoutes");
const screenRoutes = require("./routes/screenRoutes");
const movieRoutes = require("./routes/movieRoutes");
const showRoutes = require("./routes/showRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const adminRoutes = require("./routes/adminRoutes");



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

app.use("/api/auth", authRoutes);
app.use("/api/cinemas", cinemaRoutes);
app.use("/api/screens", screenRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/shows", showRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/admin", adminRoutes);


const startServer = async () => {
  try {
    await db.query("SELECT 1"); 
    console.log("---> MySQL Database Connected Successfully!");
    
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (err) {
    console.error("---> MySQL Connection Failed:", err.message);
    process.exit(1); 
  }
};

startServer();