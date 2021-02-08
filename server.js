const express = require('express')
const config = require('config')
const color = require('colors')
const app = express()

require("./startup/db")();
require("./startup/config")();
require("./startup/routes")(app);

const PORT = process.env.PORT || config.get("port")

app.listen(PORT, console.log(`Server running on port ${PORT}`.yellow.bold))