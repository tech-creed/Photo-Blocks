require('dotenv').config()
const express = require('express')
const cookieParser = require("cookie-parser")

const app = express()

app.set('view engine', 'ejs')

// global middleware
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// routers 


const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
    console.log("server listening on port " + PORT)
})

app.get('/',(req,res)=>{
    res.render("index")
})

app.use('', (req, res) => {
    res.status(404).send('URL not found !')
})

