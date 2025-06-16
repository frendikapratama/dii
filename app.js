const express = require("express");
const bodyParser = require("body-parser");
const scheduleRoutes = require("./routes/scheduleRoutes");
const authRoutes = require("./routes/authRoutes");
const verifyToken = require("./middleware/auth");

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.use("/auth", authRoutes);

app.use("/schedules", verifyToken, scheduleRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
