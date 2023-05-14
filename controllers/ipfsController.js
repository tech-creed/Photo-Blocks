const ipfsAPI = require('ipfs-api');
const fs = require('fs');

const ipfs = ipfsAPI('/ip4/127.0.0.1/tcp/5002')

// //Reading file from computer
// let testFile = fs.readFileSync("controllers/blog-img.jpg");
// //Creating buffer for ipfs function to add file to the system
// let testBuffer = new Buffer(testFile);

// ipfs.files.add(testBuffer, function (err, file) {
//     if (err) {
//       console.log(err);
//     }
//     console.log(file)
//   })