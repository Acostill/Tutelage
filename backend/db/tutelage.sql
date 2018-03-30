DROP DATABASE IF EXISTS tutelage;
CREATE DATABASE tutelage;

\c tutelage;

CREATE TABLE users (
  ID SERIAL PRIMARY KEY,
  username VARCHAR (50) UNIQUE NOT NULL,
  firstname VARCHAR NOT NULL,
  lastname VARCHAR NOT NULL,
  gender VARCHAR,
  occupation VARCHAR,
  bio VARCHAR,
	zipcode VARCHAR,
	imgURL VARCHAR DEFAULT 'https://i.imgur.com/pZ9jX8v.png',
  email VARCHAR UNIQUE NOT NULL,
  password_digest VARCHAR NOT NULL,
  ismentor boolean
);

CREATE TABLE interests (
	ID SERIAL PRIMARY KEY,
	username VARCHAR REFERENCES users(username),
	interest VARCHAR
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
  username VARCHAR REFERENCES users(username),
	answer_selection VARCHAR
  -- accepted_answer_selection INTEGER REFERENCES answers(answer_selection) 
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

/** 
  Default Password: testpass
  Hash: $2a$10$kjH6HiZmn9y4jABk9PN3v.rHJ51RJWGo5nYPZba16hIX4YUr9CVjS 
*/

INSERT INTO users (username, firstname, lastname, zipcode, imgURL, email, password_digest, ismentor)
  values ('test0','Johny0','Test0', '11215', 'https://i.imgur.com/pZ9jX8v.png', 'me@u.we0','$2a$10$brAZfSmByFeZmPZ/MH5zne9YDhugjW9CtsBGgXqGfix0g1tcooZWq','false');
INSERT INTO users (username, firstname, lastname, zipcode, imgURL, email, password_digest, ismentor)
  values ('test1','Johny1','Test1', '91932', 'https://i.imgur.com/pZ9jX8v.png', 'me@u.we1','$2a$10$brAZfSmByFeZmPZ/MH5zne9YDhugjW9CtsBGgXqGfix0g1tcooZWq','true');
INSERT INTO users (username, firstname, lastname, zipcode, imgURL, email, password_digest, ismentor)
  values ('test2','Johny2','Test2', '10001','https://i.imgur.com/pZ9jX8v.png', 'me@u.we2', '$2a$10$brAZfSmByFeZmPZ/MH5zne9YDhugjW9CtsBGgXqGfix0g1tcooZWq','true');
INSERT INTO users (username, firstname, lastname, zipcode, imgURL, email, password_digest, ismentor)
  values ('test3','Johny3','Test3', '11219', 'https://i.imgur.com/pZ9jX8v.png', 'me@u.we3','$2a$10$brAZfSmByFeZmPZ/MH5zne9YDhugjW9CtsBGgXqGfix0g1tcooZWq','true');
INSERT INTO users (username, firstname, lastname, zipcode, imgURL, email, password_digest, ismentor)
  values ('test4','Johny4','Test4', '10023', 'https://i.imgur.com/pZ9jX8v.png', 'me@u.we4','$2a$10$brAZfSmByFeZmPZ/MH5zne9YDhugjW9CtsBGgXqGfix0g1tcooZWq','true');
INSERT INTO users (username, firstname, lastname, zipcode, imgURL, email, password_digest, ismentor)
  values ('test5','Johny5','Test5', '10002', 'https://i.imgur.com/pZ9jX8v.png', 'me@u.we5','$2a$10$brAZfSmByFeZmPZ/MH5zne9YDhugjW9CtsBGgXqGfix0g1tcooZWq','false');
INSERT INTO users (username, firstname, lastname, zipcode, imgURL, email, password_digest, ismentor)
  values ('test6','Johny6','Test6', '10028', 'https://i.imgur.com/pZ9jX8v.png', 'me@u.we6','$2a$10$brAZfSmByFeZmPZ/MH5zne9YDhugjW9CtsBGgXqGfix0g1tcooZWq','false');
INSERT INTO users (username, firstname, lastname, zipcode, imgURL, email, password_digest, ismentor)
  values ('test7','Johny7','Test7', '10456', 'https://i.imgur.com/pZ9jX8v.png', 'me@u.we7','$2a$10$brAZfSmByFeZmPZ/MH5zne9YDhugjW9CtsBGgXqGfix0g1tcooZWq','false');
INSERT INTO users (username, firstname, lastname, zipcode, imgURL, email, password_digest, ismentor)
  values ('test8','Johny8','Test8', '10192', 'https://i.imgur.com/pZ9jX8v.png', 'me@u.we8','$2a$10$brAZfSmByFeZmPZ/MH5zne9YDhugjW9CtsBGgXqGfix0g1tcooZWq','false');
INSERT INTO users (username, firstname, lastname, zipcode, imgURL, email, password_digest, ismentor)
  values ('test9','Johny9','Test9', '11215', 'https://i.imgur.com/pZ9jX8v.png', 'me@u.we9','$2a$10$brAZfSmByFeZmPZ/MH5zne9YDhugjW9CtsBGgXqGfix0g1tcooZWq','false');
INSERT INTO users (username, firstname, lastname, zipcode, imgURL, email, password_digest, ismentor)
  values ('carolina1','Carolina','Restrepo', NULL, '../images/CarolinaPic.jpeg', 'carolina@up.start','$2a$10$kjH6HiZmn9y4jABk9PN3v.rHJ51RJWGo5nYPZba16hIX4YUr9CVjS','false');
INSERT INTO users (username, firstname, lastname, zipcode, imgURL, email, password_digest, ismentor)
  values ('eddie1','Eddie','Harmon', NULL, '../images/EddieCropped.jpg', 'eddie@up.start','$2a$10$kjH6HiZmn9y4jABk9PN3v.rHJ51RJWGo5nYPZba16hIX4YUr9CVjS','false');
INSERT INTO users (username, firstname, lastname, zipcode, imgURL, email, password_digest, ismentor)
  values ('nick1','Nicholas','Chavez', NULL, '../images/NickCropped.jpg', 'nick@up.start','$2a$10$kjH6HiZmn9y4jABk9PN3v.rHJ51RJWGo5nYPZba16hIX4YUr9CVjS','false');
INSERT INTO users (username, firstname, lastname, zipcode, imgURL, email, password_digest, ismentor)
  values ('gerson1','Gerson','Castillo', NULL, '../images/GersonCropped.jpg', 'gerson@up.start','$2a$10$kjH6HiZmn9y4jABk9PN3v.rHJ51RJWGo5nYPZba16hIX4YUr9CVjS','false');
INSERT INTO users (username, firstname, lastname, zipcode, imgURL, email, password_digest, ismentor)
  values ('greg1','Gregory','Davis', NULL, '../images/gregcropped.jpg', 'greg@up.start','$2a$10$kjH6HiZmn9y4jABk9PN3v.rHJ51RJWGo5nYPZba16hIX4YUr9CVjS','false');
INSERT INTO users (username, firstname, lastname, zipcode, imgURL, email, password_digest, ismentor)
  values ('jcrest','Jason','Crest', NULL, 'https://upload.wikimedia.org/wikipedia/commons/c/cd/MFettes-headshot.jpg', 'jason@up.start','$2a$10$kjH6HiZmn9y4jABk9PN3v.rHJ51RJWGo5nYPZba16hIX4YUr9CVjS','false');
INSERT INTO users (username, firstname, lastname, zipcode, imgURL, email, password_digest, ismentor)
  values ('adelle1','Adelle','Anderson', '90210', '../images/adelleprofilepic.jpeg', 'adelle@up.start','$2a$10$kjH6HiZmn9y4jABk9PN3v.rHJ51RJWGo5nYPZba16hIX4YUr9CVjS','false');

 
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

INSERT INTO threads (user_1, user_2)
  values ('carolina1', 'greg1');
INSERT INTO threads (user_1, user_2)
  values ('nick1', 'eddie1');
INSERT INTO threads (user_1, user_2)
  values ('gerson1', 'jcrest');


INSERT INTO  messages (thread_id, sender, body)
  values ('1', 'carolina1', 'Message One');
INSERT INTO  messages (thread_id, sender, body)
  values ('2', 'nick1', 'Message One');
INSERT INTO  messages (thread_id, sender, body)
  values ('3', 'gerson1', 'Message One');
INSERT INTO  messages (thread_id, sender, body)
  values ('1', 'greg1', 'Message Two');
INSERT INTO  messages (thread_id, sender, body)
  values ('2', 'eddie1', 'Message Two');
INSERT INTO  messages (thread_id, sender, body)
  values ('3', 'jcrest', 'Message Two');
INSERT INTO  messages (thread_id, sender, body)
  values ('1', 'carolina1', 'Message Three');
INSERT INTO  messages (thread_id, sender, body)
  values ('2', 'nick1', 'Message Three');
INSERT INTO  messages (thread_id, sender, body)
  values ('3', 'gerson1', 'Message Three');
INSERT INTO  messages (thread_id, sender, body)
  values ('1', 'greg1', 'Message Four');
INSERT INTO  messages (thread_id, sender, body)
  values ('2', 'eddie1', 'Message Four');
INSERT INTO  messages (thread_id, sender, body)
  values ('3', 'jcrest', 'Message Four');
INSERT INTO  messages (thread_id, sender, body)
  values ('1', 'carolina1', 'Message Five');
INSERT INTO  messages (thread_id, sender, body)
  values ('2', 'nick1', 'Message Five');
INSERT INTO  messages (thread_id, sender, body)
  values ('3', 'gerson1', 'Message Five');
INSERT INTO  messages (thread_id, sender, body)
  values ('1', 'greg1', 'Message Six');
INSERT INTO  messages (thread_id, sender, body)
  values ('2', 'eddie1', 'Message Six');
INSERT INTO  messages (thread_id, sender, body)
  values ('3', 'jcrest', 'Message Six');
INSERT INTO  messages (thread_id, sender, body)
  values ('1', 'carolina1', 'Message Seven');
INSERT INTO  messages (thread_id, sender, body)
  values ('2', 'nick1', 'Message Seven');
-- INSERT INTO  messages (thread_id, sender, body)
  values ('3', 'gerson1', 'Message Seven');


INSERT INTO interests (username, interest)
  values('gerson1', 'coding');
INSERT INTO interests (username, interest)
  values('gerson1', 'music');
INSERT INTO interests (username, interest)
  values('gerson1', 'fishing');
INSERT INTO interests (username, interest)
  values('nick1', 'driving');
INSERT INTO interests (username, interest)
  values('nick1', 'music');
INSERT INTO interests (username, interest)
  values('nick1', 'hangout');
INSERT INTO interests (username, interest)
  values('eddie1', 'reading');
INSERT INTO interests (username, interest)
  values('eddie1', 'basketball');
INSERT INTO interests (username, interest)
  values('eddie1', 'archery');
INSERT INTO interests (username, interest)
  values('greg1', 'coding');
INSERT INTO interests (username, interest)
  values('greg1', 'sports');
INSERT INTO interests (username, interest)
  values('greg1', 'motorcycles');
INSERT INTO interests (username, interest)
  values('carolina1', 'roasting');
INSERT INTO interests (username, interest)
  values('carolina1', 'camping');
INSERT INTO interests (username, interest)
  values('carolina1', 'swimming');
INSERT INTO interests (username, interest)
  values('jcrest', 'business');
INSERT INTO interests (username, interest)
  values('jcrest', 'finance');
INSERT INTO interests (username, interest)
  values('jcrest', 'fishing');


-- INSERT INTO answers (answer_selection, question_id, user_id)
--   values (1, 1, 1);
