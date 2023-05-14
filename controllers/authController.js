const apiInit = async (req, res) => {

    res.status(200).json({ welcome: "Hello World !!!" })
  }

  
module.exports = { apiInit }