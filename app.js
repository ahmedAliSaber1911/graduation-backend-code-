// contain express file
const path = require("path");
const express = require("express");
const morgan = require("morgan");
const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");
const reviewsRouter = require("./routes/reviewRouter");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorControlllers");
const viewRouter = require("./routes/viewRoutes");
const GovernorRouter=require('./routes/GovernorRouters')
var cors = require('cors')

require('dotenv').config();
// express is function
const app = express();
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// Serving static files
app.use(express.static(path.join(__dirname, "public")));
app.use('/api/v1/TravelPackages',PackageRouter)
app.use('/api/v1/Governor',GovernorRouter)
// 1) first middlewares

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(cors())
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

// ## middleware must contain three  argument
app.use((req, res, next) => {
  console.log("hello from the middleware 😍");
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  console.log("hello from date 😍", req.requestTime);

  next();
});


app.get("/recommend/:userId", async (req, res) => {
  const userId = req.params.userId;
  const recommendations = await recommend(userId);
  res.json(recommendations);
});
////////////////////////////////////////////////////////////////////////////

//2) ROUTE HANDLERS

// ROUTES

app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/reviews", reviewsRouter);

module.exports = app;
