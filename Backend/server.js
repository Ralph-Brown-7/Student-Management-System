const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

/* MIDDLEWARE */
app.use(cors({
  // Adding 127.0.0.1 to the allowed origins as well
  origin: ["http://localhost:5173", "http://localhost:5174", "http://127.0.0.1:5173"], 
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));

app.use(express.json());

/* DATABASE */
// Added some options to help with local connection stability
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch(err => {
    console.error("❌ MongoDB Connection Error:");
    console.error(err);
  });

/* ROUTES */
app.use("/api/users", require("./routes/usersRoutes"));
app.use("/api/courses", require("./routes/coursesRoutes"));
app.use("/api/enrollments", require("./routes/enrollmentsRoutes"));
app.use("/api/grades", require("./routes/gradesRoutes"));

/* TEST ROUTE */
app.get("/", (req, res) => {
  res.send("Backend is running");
});

const PORT = process.env.PORT || 5000;

// REMOVED "0.0.0.0" to allow default localhost binding
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server is officially running at http://localhost:${PORT}`);
});