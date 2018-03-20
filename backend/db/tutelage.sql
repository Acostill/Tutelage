DROP DATABASE IF EXISTS tutelage;
CREATE DATABASE tutelage;

\c tutelage;

CREATE TABLE users (
  ID SERIAL PRIMARY KEY,
  username VARCHAR (50) UNIQUE NOT NULL,
  firstname VARCHAR NOT NULL,
  lastname VARCHAR NOT NULL,
  password_digest VARCHAR,
  ismentor boolean
);

CREATE TABLE questions (
	ID SERIAL PRIMARY KEY,
	the_question VARCHAR,
	answer_1 INTEGER,
	answer_2 INTEGER,
	answer_3 INTEGER,
	answer_4 INTEGER
);

CREATE TABLE answers (
	ID SERIAL PRIMARY KEY,
	question_id INTEGER REFERENCES questions(ID),
	user_id INTEGER REFERENCES users(ID),
	answer_selection INTEGER
);


/* tyler, password: 123456 */

INSERT INTO users (username, firstname, lastname, password_digest, ismentor)
  values ('test1','Greg1','Davis1', '$2a$10$brAZfSmByFeZmPZ/MH5zne9YDhugjW9CtsBGgXqGfix0g1tcooZWq','true');
INSERT INTO users (username, firstname, lastname, password_digest, ismentor)
  values ('test2','Greg2','Davis2', '$2a$10$brAZfSmByFeZmPZ/MH5zne9YDhugjW9CtsBGgXqGfix0g1tcooZWq','true');
INSERT INTO users (username, firstname, lastname, password_digest, ismentor)
  values ('test3','Greg3','Davis3', '$2a$10$brAZfSmByFeZmPZ/MH5zne9YDhugjW9CtsBGgXqGfix0g1tcooZWq','false');
INSERT INTO users (username, firstname, lastname, password_digest, ismentor)
  values ('test4','Greg4','Davis4', '$2a$10$brAZfSmByFeZmPZ/MH5zne9YDhugjW9CtsBGgXqGfix0g1tcooZWq','false');

INSERT INTO questions (the_question, answer_1, answer_2, answer_3, answer_4)
  values ('Do you like Math?',1, 2, 3, 4);
INSERT INTO questions (the_question, answer_1, answer_2, answer_3, answer_4)
  values ('Do you like Reading?',1, 2, 3, 4);
INSERT INTO questions (the_question, answer_1, answer_2, answer_3, answer_4)
  values ('Do you like to exercise?',1, 2, 3, 4);
INSERT INTO questions (the_question, answer_1, answer_2, answer_3, answer_4)
  values ('Are you a psychopathic murderer lacking remorse and empathy?',1, 2, 3, 4);


INSERT INTO answers (answer_selection, question_id, user_id)
  values (1, 1, 1);
INSERT INTO answers (answer_selection, question_id, user_id)
  values (2, 2, 2);
INSERT INTO answers (answer_selection, question_id, user_id)
  values (3, 3, 3);
INSERT INTO answers (answer_selection, question_id, user_id)
  values (4, 4, 4);