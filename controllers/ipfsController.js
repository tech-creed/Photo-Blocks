const ipfsAPI = require('ipfs-api');
const fs = require('fs');
const sqlite3 = require("sqlite3").verbose();
const ipfs = ipfsAPI('/ip4/127.0.0.1/tcp/5002')

const db = new sqlite3.Database("./database/database.db", (err) => {
    if (err) {
        return console.error(err.message);
    } else {
        //console.log("Database Connected");
    }
});

const GetUpload = async (req, res) => {
    res.render('upload')
}

const GetGallary = async (req, res) => {
    if(req.cookies.role == 'Client'){
        db.all(`SELECT * FROM gallary`,(err,result)=>{
            res.render('gallary client', walletImages=result)
        })
    }else{
        db.all(`SELECT * FROM gallary WHERE wallet = ?`,[req.cookies.walletID],(err,result)=>{
            res.render('gallary', walletImages=result)
        })
    }
}

const Upload = async (req, res) => {
    let ImageBuffer = req.files.file.data
    ipfs.files.add(ImageBuffer, function (err, file) {
        if (err) {
            res.redirect("/ipfs/upload")
            console.log(err);
        }
        console.log(file, req.body)
        db.run('INSERT INTO gallary(wallet,img_hash,img_description) VALUES(?,?,?)',[req.body.walletID,file[0].hash,req.body.description],(err)=>{
            console.log(err)
            res.redirect("/ipfs/gallary")
        })
    })
}

const Retrive = async (req, res) => {
    const validCID = req.params.CID
    ipfs.files.get(validCID, function (err, files) {
        files.forEach((file) => {
          console.log(file.path)
          console.log(file.content)
        })
    })
}

module.exports = {
    GetUpload,
    Upload,
    Retrive,
    GetGallary
  }
