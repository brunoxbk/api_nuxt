const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv")
  .config();

const Pool = require('pg').Pool
const pool = new Pool({
  user: process.env.PG_USER,
  host: 'localhost',
  database: process.env.PG_DB ,
  password: process.env.PG_PASS,
  port: 5432,
})



exports.sign_up = (req, res, next) => {
    
    const { name, email, password } = req.body
    
    pool.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3)', [name, email, bcrypt.hashSync(password, 8)], (error, results) => {
        if (error) {
        throw error
        }
        res.status(201).send(`User added with ID: ${results.insertId}`)
    })

};


exports.login = (req, res, next) => {
    const { email, password } = req.body

    console.log(email, password)
    
    pool.query('SELECT * FROM users WHERE email = $1', [email], (error, results) => {
        if (error) {
            res.status(500)
              .send({
                message: error
              });
            return;
        }

        if (!results) {
            return res.status(404)
              .send({
                message: "User Not found."
              });
        }

        //comparing passwords
        let passwordIsValid = bcrypt.compareSync(
            password,
            results.password
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
            id: results.id
          }, process.env.API_SECRET, {
            expiresIn: 86400
          });
    
        //responding to client request with user profile success message and  access token .
        res.status(200)
          .send({
            user: {
              id: results.id,
              email: results.email,
              name: results.name,
            },
            message: "Login successfull",
            accessToken: token,
          });
      })
};

