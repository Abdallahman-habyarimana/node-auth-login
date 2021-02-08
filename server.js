const express = require('express')
const config = require('config')
const app = express()

require("./startup/db")();
require("./startup/config")();

const PORT = process.env.PORT || config.get("port")

app.listen(PORT, console.log(`Server running on port ${PORT}`.yellow.bold))