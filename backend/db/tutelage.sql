DROP DATABASE IF EXISTS tutelage;
CREATE DATABASE tutelage;

\c tutelage;

CREATE TABLE users (
  ID SERIAL PRIMARY KEY,
  username VARCHAR (50) UNIQUE NOT NULL,
  firstname VARCHAR NOT NULL,
  lastname VARCHAR NOT NULL,
  email VARCHAR UNIQUE,
  password_digest VARCHAR,
  ismentor boolean
);

/*CREATE TABLE messages (
  ID SERIAL PRIMARY KEY,
  sender VARCHAR,
  recipient VARCHAR,
  body VARCHAR
);
*/

/* tyler, password: 123456 */

INSERT INTO users (username, firstname, lastname, email, password_digest, ismentor)
  values ('TestMentee1','Greg','Davis','davisgreg1@gmail.com', '$2a$10$brAZfSmByFeZmPZ/MH5zne9YDhugjW9CtsBGgXqGfix0g1tcooZWq','true')