DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS tokens;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(55) NOT NULL,
  email VARCHAR(55) NOT NULL,
  password VARCHAR(255) NOT NULL
);


CREATE TABLE posts(
   id SERIAL PRIMARY KEY,
   user_id INT,
   text VARCHAR(255) NOT NULL,
	created timestamp NOT null,
   
   CONSTRAINT fk_user_post
      FOREIGN KEY(user_id) 
	  REFERENCES users(id)
);


CREATE TABLE tokens(
   id SERIAL PRIMARY KEY,
   user_id INT,
   token VARCHAR(255) NOT NULL,
   created timestamp NOT null,
   
   CONSTRAINT fk_user_token
      FOREIGN KEY(user_id) 
	  REFERENCES users(id)
);

