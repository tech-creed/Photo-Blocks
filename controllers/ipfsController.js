  const ipfsAPI = require('ipfs-api');
const fs = require('fs');

const ipfs = ipfsAPI('/ip4/127.0.0.1/tcp/5002')

const Upload = async (req, res) => {
    let ImageBuffer = req.files.file.data
    ipfs.files.add(ImageBuffer, function (err, file) {
        if (err) {
        console.log(err);
        }
        console.log(file)
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
    Upload,
    Retrive,
  }
