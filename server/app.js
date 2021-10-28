require('dotenv').config()

const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
const cors = require('cors')

const apiRoutes = require("./routes");

const { PORT} = process.env;

const startServer = async () => {
  const app = express();

  app.use(cors())
  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  app.get("/", (req, res, next) => {
    res.send("Server is running... ")
  })

  app.use("/api",apiRoutes)

  // catch 404 and forward to error handler
  app.use(function (req, res, next) {
    next(createError(404));
  });

  // error handler
  app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });

  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
  })
}

try{
  startServer()
}catch(error){
  console.log("Server is not running due to error",error)
}
