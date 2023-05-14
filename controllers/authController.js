const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./database/database.db", (err) => {
    if (err) {
        return console.error(err.message);
    } else {
        //console.log("Database Connected");
    }
});

const Login = async (req, res) => {
    res.render('login')
  }
  const Register = async (req, res) => {
    res.render('register')
  }

  const PostLogin = async (req, res) => {
    db.get('SELECT * FROM user WHERE wallet = ?',[req.body.wallet_id],(err,result)=>{
        if(result){
            res.cookie("walletID", req.body.wallet_id);
            res.cookie("role", result.role);
            res.cookie("name", result.name);
            res.json("OK")
        }else{
            res.redirect('/auth/register')
        }
    })
  }
  const PostRegister = async (req, res) => {
    res.cookie("walletID", req.body.wallet_id);
    res.cookie("role", req.body.role);
    res.cookie("name", req.body.name);
    db.run('INSERT INTO user(name,role,mail,wallet) VALUES(?,?,?,?)',[req.body.name,req.body.role,req.body.mail,req.body.wallet_id],(err)=>{
        res.json("OK")
    })
  }
  module.exports = {
    Login,
    Register,
    PostLogin,
    PostRegister
  }