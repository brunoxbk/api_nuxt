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


exports.fetch = (req, res, next) => {
    
  
    pool.query('SELECT * FROM posts', (error, results) => {
        if (error) {
        throw error
        }


        res.status(200).send(results.rows.map(i=>{
            return {id: i.id, text: i.text}
        }))
    })
  
};

  
exports.create = (req, res, next) => {
    
    const { user_id, text, created } = req.body
    
    pool.query('INSERT INTO posts (user_id, text, created) VALUES ($1, $2, $3)', [user_id, text, created], (error, results) => {
        if (error) {
            throw error
        }
        res.status(201).send({message:`Post added`})
    })

};


exports.update = (req, res, next) => {
    
    const { user_id, text, created } = req.body
    
    pool.query('UPDATE posts  SET user_id=$1, text=$2 WHERE id=$3', [user_id, text, req.params.id], (error, results) => {
        if (error) {
            throw error
        }
        res.status(201).send({message:`Post added`})
    })

};


exports.get = (req, res, next) => {
    
    pool.query('SELECT * FROM posts WHERE id = $1', [req.params.id], (error, results) => {
        if (error) {
            throw error
        }
        
        res.status(200).send({
            post: {
            id: results.rows[0].id,
            text: results.rows[0].text,
            user_id: results.rows[0].user_id,
          }})
    })

};
