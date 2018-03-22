DROP DATABASE IF EXISTS tutelage;
CREATE DATABASE tutelage;

\c tutelage;

CREATE TABLE users (
  ID SERIAL PRIMARY KEY,
  username VARCHAR (50) UNIQUE NOT NULL,
  firstname VARCHAR NOT NULL,
  lastname VARCHAR NOT NULL,
	imgURL VARCHAR,
  email VARCHAR NOT NULL,
  password_digest VARCHAR NOT NULL,
  ismentor boolean
);

CREATE TABLE questions (
	ID SERIAL PRIMARY KEY,
	the_question VARCHAR,
	answer_1 VARCHAR,
	answer_2 VARCHAR,
	answer_3 VARCHAR,
	answer_4 VARCHAR
);

CREATE TABLE answers (
	ID SERIAL PRIMARY KEY,
	question_id INTEGER REFERENCES questions(ID),
	user_id INTEGER REFERENCES users(ID),
	answer_selection INTEGER
);

CREATE TABLE threads(
	ID SERIAL PRIMARY KEY,
	user_1 VARCHAR REFERENCES users(username),
	user_2 VARCHAR REFERENCES users(username)
);

CREATE TABLE messages(
	ID SERIAL PRIMARY KEY,
	thread_id INTEGER REFERENCES threads(ID),
	sender VARCHAR REFERENCES users(username),
	receiver VARCHAR REFERENCES users(username),
	body VARCHAR,
	date_sent  TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

/* tyler, password: 123456 */

INSERT INTO users (username, firstname, lastname, imgURL, email, password_digest, ismentor)
  values ('test0','Greg0','Davis0', 'https://i.imgur.com/pZ9jX8v.png', 'me@u.we0','$2a$10$brAZfSmByFeZmPZ/MH5zne9YDhugjW9CtsBGgXqGfix0g1tcooZWq','true');
INSERT INTO users (username, firstname, lastname, imgURL, email, password_digest, ismentor)
  values ('test1','Greg1','Davis1', 'https://i.imgur.com/pZ9jX8v.png', 'me@u.we1', '$2a$10$brAZfSmByFeZmPZ/MH5zne9YDhugjW9CtsBGgXqGfix0g1tcooZWq','true');
INSERT INTO users (username, firstname, lastname, imgURL, email, password_digest, ismentor)
  values ('test2','Greg2','Davis2', 'https://i.imgur.com/pZ9jX8v.png', 'me@u.we2', '$2a$10$brAZfSmByFeZmPZ/MH5zne9YDhugjW9CtsBGgXqGfix0g1tcooZWq','true');
INSERT INTO users (username, firstname, lastname, imgURL, email, password_digest, ismentor)
  values ('test3','Greg3','Davis3', 'https://i.imgur.com/pZ9jX8v.png', 'me@u.we3','$2a$10$brAZfSmByFeZmPZ/MH5zne9YDhugjW9CtsBGgXqGfix0g1tcooZWq','true');
INSERT INTO users (username, firstname, lastname, imgURL, email, password_digest, ismentor)
  values ('test4','Greg4','Davis4', 'https://i.imgur.com/pZ9jX8v.png', 'me@u.we4','$2a$10$brAZfSmByFeZmPZ/MH5zne9YDhugjW9CtsBGgXqGfix0g1tcooZWq','true');
INSERT INTO users (username, firstname, lastname, imgURL, email, password_digest, ismentor)
  values ('test5','Greg5','Davis5', 'https://i.imgur.com/pZ9jX8v.png', 'me@u.we5','$2a$10$brAZfSmByFeZmPZ/MH5zne9YDhugjW9CtsBGgXqGfix0g1tcooZWq','false');
INSERT INTO users (username, firstname, lastname, imgURL, email, password_digest, ismentor)
  values ('test6','Greg6','Davis6', 'https://i.imgur.com/pZ9jX8v.png', 'me@u.we6','$2a$10$brAZfSmByFeZmPZ/MH5zne9YDhugjW9CtsBGgXqGfix0g1tcooZWq','false');
INSERT INTO users (username, firstname, lastname, imgURL, email, password_digest, ismentor)
  values ('test7','Greg7','Davis7', 'https://i.imgur.com/pZ9jX8v.png', 'me@u.we7','$2a$10$brAZfSmByFeZmPZ/MH5zne9YDhugjW9CtsBGgXqGfix0g1tcooZWq','false');
INSERT INTO users (username, firstname, lastname, imgURL, email, password_digest, ismentor)
  values ('test8','Greg8','Davis8', 'https://i.imgur.com/pZ9jX8v.png', 'me@u.we8','$2a$10$brAZfSmByFeZmPZ/MH5zne9YDhugjW9CtsBGgXqGfix0g1tcooZWq','false');
INSERT INTO users (username, firstname, lastname, imgURL, email, password_digest, ismentor)
  values ('test9','Greg9','Davis9', 'https://i.imgur.com/pZ9jX8v.png', 'me@u.we9','$2a$10$brAZfSmByFeZmPZ/MH5zne9YDhugjW9CtsBGgXqGfix0g1tcooZWq','false');

INSERT INTO questions (the_question, answer_1, answer_2, answer_3, answer_4)
  values ('Do you like Math?','a little bit', 'Im learning to like it', 'yes I like it', 'I love love Math');
INSERT INTO questions (the_question, answer_1, answer_2, answer_3, answer_4)
  values ('Do you like Reading?','a little bit', 'Im learning to like it', 'yes I like it', 'I love love Reading');
INSERT INTO questions (the_question, answer_1, answer_2, answer_3, answer_4)
  values ('Do you like to exercise?','a little bit', 'Im learning to like it', 'yes I like it', 'I love love Exercising');
INSERT INTO questions (the_question, answer_1, answer_2, answer_3, answer_4)
  values ('Are you a psychopathic murderer lacking remorse and empathy?','a little bit', 'Im learning to like it', 'yes I like it', 'I love love Evility');

-- INSERT INTO answers (answer_selection, question_id, user_id)
--   values (1, 1, 1);
