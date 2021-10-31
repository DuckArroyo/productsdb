require('dotenv').config();
const express = require('express');
const routes = require('./routes');
const sequelize = require("./config/connection");
// import sequelize connection

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// sync sequelize models to the database, then turn on the server
sequelize.sync(PORT, ({ force: true }).then  => {
  console.log(`App listening on port ${PORT}!`);
  app.listen(PORT, () => console.log("Now serving em beets!"));
});