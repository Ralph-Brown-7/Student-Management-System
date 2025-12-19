const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

/* MIDDLEWARE */
app.use(cors({
  origin: "http://localhost:5173", // Vite frontend
  credentials: true,
}));
app.use(express.json());

/* DATABASE */
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

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
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
