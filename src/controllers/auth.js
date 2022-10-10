const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv")
  .config();

const Pool = require('pg').Pool
const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DB ,
  password: process.env.PG_PASS,
  port: process.env.PG_PORT,
})



exports.sign_up = (req, res, next) => {
    
    const { name, email, password } = req.body
    
    pool.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3)', [name, email, bcrypt.hashSync(password, 8)], (error, results) => {
        if (error) {
        throw error
        }
        res.status(201).send({message:`User added`})
    })

};


exports.login = (req, res, next) => {
    const { email, password } = req.body

    pool.query('SELECT * FROM users WHERE email = $1', [email], (error, results) => {
        if (error) {
            res.status(500)
              .send({
                message: error
              });
            return;
        }

        if (results.rowCount < 1) {
            return res.status(404)
              .send({
                message: "User Not found."
              });
        }


        //comparing passwords
        let passwordIsValid = bcrypt.compareSync(
            password,
            results.rows[0].password
        );

        // checking if password was valid and send response accordingly
        if (!passwordIsValid) {
            return res.status(401)
            .send({
                accessToken: null,
                message: "Invalid Password!"
            });
        }

        let token = jwt.sign({
            id: results.rows[0].id
          }, process.env.API_SECRET, {
            expiresIn: 86400
          });
    
        //responding to client request with user profile success message and  access token .
        res.status(200)
          .send({
            user: {
              id: results.rows[0].id,
              email: results.rows[0].email,
              name: results.rows[0].name,
            },
            message: "Login successfull",
            accessToken: token,
          });
      })
};


exports.get_user = (req, res, next) => {
    
  
  pool.query('SELECT * FROM users WHERE id = $1', [req.user.id],  (error, results) => {
      if (error) {
      throw error
      }
      res.status(200).send({
        user: {
        id: results.rows[0].id,
        email: results.rows[0].email,
        name: results.rows[0].name,
      }})
  })

};
