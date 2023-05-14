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

app.get('/contact',(req,res)=>{
    res.render('contact')
})

app.get('/about-us',(req,res)=>{
    res.render('about-us')
})

app.use('', (req, res) => {
    res.render('404')
})

