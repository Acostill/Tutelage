DROP DATABASE IF EXISTS tutelage;
CREATE DATABASE tutelage;

\c tutelage;

CREATE TABLE users (
  ID SERIAL PRIMARY KEY,
  username VARCHAR (50) UNIQUE NOT NULL,
  firstname VARCHAR NOT NULL,
  lastname VARCHAR NOT NULL,
	zipcode VARCHAR,
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

INSERT INTO users (username, firstname, lastname, zipcode, imgURL, email, password_digest, ismentor)
  values ('test0','Greg0','Davis0', '91932', 'https://i.imgur.com/pZ9jX8v.png', 'me@u.we0','$2a$10$brAZfSmByFeZmPZ/MH5zne9YDhugjW9CtsBGgXqGfix0g1tcooZWq','true');
INSERT INTO users (username, firstname, lastname, zipcode, imgURL, email, password_digest, ismentor)
  values ('test1','Greg1','Davis1', '10027', 'https://i.imgur.com/pZ9jX8v.png', 'me@u.we1', '$2a$10$brAZfSmByFeZmPZ/MH5zne9YDhugjW9CtsBGgXqGfix0g1tcooZWq','true');
INSERT INTO users (username, firstname, lastname, zipcode, imgURL, email, password_digest, ismentor)
  values ('test2','Greg2','Davis2', '10001','https://i.imgur.com/pZ9jX8v.png', 'me@u.we2', '$2a$10$brAZfSmByFeZmPZ/MH5zne9YDhugjW9CtsBGgXqGfix0g1tcooZWq','true');
INSERT INTO users (username, firstname, lastname, zipcode, imgURL, email, password_digest, ismentor)
  values ('test3','Greg3','Davis3', '11219', 'https://i.imgur.com/pZ9jX8v.png', 'me@u.we3','$2a$10$brAZfSmByFeZmPZ/MH5zne9YDhugjW9CtsBGgXqGfix0g1tcooZWq','true');
INSERT INTO users (username, firstname, lastname, zipcode, imgURL, email, password_digest, ismentor)
  values ('test4','Greg4','Davis4', '10023', 'https://i.imgur.com/pZ9jX8v.png', 'me@u.we4','$2a$10$brAZfSmByFeZmPZ/MH5zne9YDhugjW9CtsBGgXqGfix0g1tcooZWq','true');
INSERT INTO users (username, firstname, lastname, zipcode, imgURL, email, password_digest, ismentor)
  values ('test5','Greg5','Davis5', '10002', 'https://i.imgur.com/pZ9jX8v.png', 'me@u.we5','$2a$10$brAZfSmByFeZmPZ/MH5zne9YDhugjW9CtsBGgXqGfix0g1tcooZWq','false');
INSERT INTO users (username, firstname, lastname, zipcode, imgURL, email, password_digest, ismentor)
  values ('test6','Greg6','Davis6', '10028', 'https://i.imgur.com/pZ9jX8v.png', 'me@u.we6','$2a$10$brAZfSmByFeZmPZ/MH5zne9YDhugjW9CtsBGgXqGfix0g1tcooZWq','false');
INSERT INTO users (username, firstname, lastname, zipcode, imgURL, email, password_digest, ismentor)
  values ('test7','Greg7','Davis7', '10456', 'https://i.imgur.com/pZ9jX8v.png', 'me@u.we7','$2a$10$brAZfSmByFeZmPZ/MH5zne9YDhugjW9CtsBGgXqGfix0g1tcooZWq','false');
INSERT INTO users (username, firstname, lastname, zipcode, imgURL, email, password_digest, ismentor)
  values ('test8','Greg8','Davis8', '10192', 'https://i.imgur.com/pZ9jX8v.png', 'me@u.we8','$2a$10$brAZfSmByFeZmPZ/MH5zne9YDhugjW9CtsBGgXqGfix0g1tcooZWq','false');
INSERT INTO users (username, firstname, lastname, zipcode, imgURL, email, password_digest, ismentor)
  values ('test9','Greg9','Davis9', '11215', 'https://i.imgur.com/pZ9jX8v.png', 'me@u.we9','$2a$10$brAZfSmByFeZmPZ/MH5zne9YDhugjW9CtsBGgXqGfix0g1tcooZWq','false');

INSERT INTO questions (the_question, answer_1, answer_2, answer_3, answer_4)
  values ('Do you like Math?','a little bit', 'Im learning to like it', 'yes I like it', 'I love love Math');
INSERT INTO questions (the_question, answer_1, answer_2, answer_3, answer_4)
  values ('Do you like Reading?','a little bit', 'Im learning to like it', 'yes I like it', 'I love love Reading');
INSERT INTO questions (the_question, answer_1, answer_2, answer_3, answer_4)
  values ('Do you like to exercise?','a little bit', 'Im learning to like it', 'yes I like it', 'I love love Exercising');
INSERT INTO questions (the_question, answer_1, answer_2, answer_3, answer_4)
  values ('Are you a psychopathic murderer lacking remorse and empathy?','a little bit', 'Im learning to like it', 'yes I like it', 'I love love Evility');
INSERT INTO questions (the_question, answer_1, answer_2, answer_3, answer_4)
  values ('What is your level of proficiency in the subject at hand?','Novice', 'Intermediate', 'Advanced', 'Expert');
INSERT INTO questions (the_question, answer_1, answer_2, answer_3, answer_4)
  values ('What is your previous mentoring experience level?','This is my first time', 'I have mentored once before in the past', 'I have a few mentoring experiences under my belt', 'I have several years extensively mentoring others');
INSERT INTO questions (the_question, answer_1, answer_2, answer_3, answer_4)
  values ('Do you see your role as a mentor as more of a(n):','Advisor', 'Supporter', 'Coach', 'Role-Model');
INSERT INTO questions (the_question, answer_1, answer_2, answer_3, answer_4)
  values ('What is your preferred mentoring style?','Face-to-Face', 'Virtual (Skype, Google Hangouts, etc.)', 'Phone Calls', 'Text Messaging');
INSERT INTO questions (the_question, answer_1, answer_2, answer_3, answer_4)
  values ('What level of privacy do you expect to give and receive while utilizing the app?','Full Disclosure (Nothing Off Limits)', 'I Agree To Only Mention Details To Close Friends', 'It Depends On The Situation', 'Total Discretion (Nothing Should Be Discussed With Anyone Outside App)');
INSERT INTO questions (the_question, answer_1, answer_2, answer_3, answer_4)
  values ('How long does the ideal mentoring relationship last?','A Few Hours', 'A Few Days', 'A Few Weeks', 'As Long As It Takes');
INSERT INTO questions (the_question, answer_1, answer_2, answer_3, answer_4)
  values ('In your opinion, what is the most important attribute of a mentor?','Empathy', 'Patience', 'Accuracy', 'Reliability');
INSERT INTO questions (the_question, answer_1, answer_2, answer_3, answer_4)
  values ('What do you feel is the most important value for a mentee to have?','Eagerness To Learn', 'Punctuality', 'Consistency', 'Ability To Listen');
INSERT INTO questions (the_question, answer_1, answer_2, answer_3, answer_4)
  values ('What is your main motivation for joining Tutelage?','It’s A Good Way To Spend Free Time', 'I Wanted To Give Back And Serve Others', 'Volunteer Experience For My Resume/Job', 'Great Way To Improve My Own Understanding Of The Subject Matter');
INSERT INTO questions (the_question, answer_1, answer_2, answer_3, answer_4)
  values ('Who do you teach best?','Visual Learners', 'Auditory Learners', 'Hands-On Learners', 'All Of The Above');


-- INSERT INTO answers (answer_selection, question_id, user_id)
--   values (1, 1, 1);
