const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();

const authenticateRouter = require("./routes/authenticate");
const movieRouter = require("./routes/movie");
const directorRouter = require("./routes/director");
const registerRouter = require("./routes/register");
const indexRouter = require("./routes/index");

//middlevare verifyToken
const verifyToken = require("./middleware/verify-token");
const app = express();
app.use(cors());

//db connection
const db = require("./helper/db");
db();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/authenticate", authenticateRouter);
app.use("/api", verifyToken);
app.use("/api/movies", movieRouter);
app.use("/api/directors", directorRouter);
app.use("/register", registerRouter);
app.use("/", indexRouter);
// app.use((err,req,res,nedxt)=>{
//   res.status(err.status),
//   res.render('error',        hata yönetimi yap
//   {mesage:err.mesage,
//     error.status:err.status})
// })
// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  //res.render('error');
  res.json({ error: { message: err.message, code: err.code } });
});

module.exports = app;
