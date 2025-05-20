const express = require("express");
const mongoose = require("mongoose");
const app = express();

const signup = require("./routes/signup");
const login = require("./routes/login");
const firebaseAuth = require("./routes/firebaseAuth"); // Add Firebase auth routes

const cors = require("cors");
require("dotenv").config();

app.use(cors());
app.use(express.json());

// Register routes
app.use("/api/auth", signup);
app.use("/api/auth", login);
app.use("/api/auth", firebaseAuth); // Register Firebase auth routes

// Add a simple route to verify the server is working
app.get("/", (req, res) => {
  res.send("API is running");
});

// Debugging route to display all registered routes
app.get("/api/routes", (req, res) => {
  const routes = [];
  app._router.stack.forEach((middleware) => {
    if (middleware.route) {
      // Route directly on the app
      routes.push({
        path: middleware.route.path,
        methods: Object.keys(middleware.route.methods),
      });
    } else if (middleware.name === "router") {
      // Router middleware
      middleware.handle.stack.forEach((handler) => {
        if (handler.route) {
          const path = handler.route.path;
          const basePath = middleware.regexp
            .toString()
            .replace("/^\\", "")
            .replace("\\/?(?=\\/|$)/i", "")
            .replace(/\\\//g, "/");

          routes.push({
            path: basePath + path,
            methods: Object.keys(handler.route.methods),
          });
        }
      });
    }
  });

  res.json(routes);
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ mongodb is connected");
  })
  .catch((err) => {
    console.log("the error be :-> ", err);
  });

const PORT = process.env.PORT || 5002;

app.listen(PORT, () => {
  console.log(`The server is running on http://localhost:${PORT}`);
});