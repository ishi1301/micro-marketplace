// const authRoutes = require("./routes/auth");
// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// require("dotenv").config();

// const app = express();

// app.use(cors());
// app.use(express.json());
// app.use("/auth", authRoutes);

// app.get("/", (req, res) => {
//   res.send("API is running...");
// });

// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log("MongoDB Connected"))
//   .catch((err) => console.log("MongoDB Error:", err));

const favoriteRoutes = require("./routes/favourites");
const productRoutes = require("./routes/products");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// import routes
const authRoutes = require("./routes/auth");

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// routes
app.use("/auth", authRoutes);

// test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/products", productRoutes);

app.use("/favourites", favoriteRoutes);

// connect database
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Error:", err));

// start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on port " + PORT));


