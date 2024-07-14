const mongoose = require("mongoose")
const express = require("express")
const cors = require("cors")
require("dotenv").config()

mongoose.connect(process.env.MONGO_URL)
const app = express()
app.use(cors())
app.use(express.json())

app.use(("*"), (req, res) => {
    res.status(404).json({ message: "Resoures not found" })
})

app.use((req, res, err, next) => {
    res.status(500).json({ message: "Server Error", error: err.message })
})
mongoose.connection.once("open", () => {
    console.log("MONGO CONECTED")
    app.listen(process.env.PORT, console.log("SERVER RUNNING"))
})
