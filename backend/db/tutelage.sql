CREATE TABLE users
(
  ID SERIAL PRIMARY KEY,
  username VARCHAR (50) UNIQUE NOT NULL,
  firstname VARCHAR NOT NULL,
  lastname VARCHAR NOT NULL,
  email VARCHAR UNIQUE NOT NULL,
  password_digest VARCHAR NOT NULL,
  ismentor boolean,
  age INTEGER,
  bio VARCHAR,
  occupation VARCHAR,
	zipcode VARCHAR,
  gender VARCHAR,
	imgurl VARCHAR DEFAULT 'http://res.cloudinary.com/tutelage/image/upload/v1522734450/defaultpic.png',
  hobbies VARCHAR,
  credentials VARCHAR,
  public_id VARCHAR
);

CREATE TABLE interests (
	ID SERIAL PRIMARY KEY,
	username VARCHAR REFERENCES users(username) ON UPDATE CASCADE,
	interest VARCHAR
);
CREATE TABLE questions
(
  ID SERIAL PRIMARY KEY,
  the_question VARCHAR,
  answer_1 VARCHAR,
  answer_2 VARCHAR,
  answer_3 VARCHAR,
  answer_4 VARCHAR
);
CREATE TABLE answers
(
  ID SERIAL PRIMARY KEY,
  question_id INTEGER REFERENCES questions(ID),
  user_id INTEGER REFERENCES users(ID),
  username VARCHAR REFERENCES users(username),
  answer_selection VARCHAR
  -- accepted_answer_selection INTEGER REFERENCES answers(answer_selection) 
);

CREATE TABLE threads(
	ID SERIAL PRIMARY KEY,
	user_1 VARCHAR REFERENCES users(username) ON UPDATE CASCADE,
	user_2 VARCHAR REFERENCES users(username) ON UPDATE CASCADE,
  subject VARCHAR
);

CREATE TABLE messages(
	ID SERIAL PRIMARY KEY,
	thread_id INTEGER REFERENCES threads(ID),
	sender VARCHAR REFERENCES users(username) ON UPDATE CASCADE,
	receiver VARCHAR REFERENCES users(username) ON UPDATE CASCADE,
	body VARCHAR,
	date_sent  TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  isread BOOLEAN DEFAULT FALSE
);
/** 
  Default Password: testpass
  Hash: $2a$10$kjH6HiZmn9y4jABk9PN3v.rHJ51RJWGo5nYPZba16hIX4YUr9CVjS 
*/
INSERT INTO users
  (username, firstname, lastname, zipcode, imgURL, email, password_digest, ismentor, age, gender, occupation, hobbies, bio, credentials)
values
  ('WillWall', 'William', 'Wallace', '11215', 'http://res.cloudinary.com/tutelage/image/upload/v1522771900/WilliamWallace.jpg', 'me@u.we0', '$2a$10$kjH6HiZmn9y4jABk9PN3v.rHJ51RJWGo5nYPZba16hIX4YUr9CVjS', 'false', '57', 'Male', 'Pilot, Aeroswift Aeronautics Agency', 'Stamp Collecting and RC Plane Build', 'Hi I am Will, Will I am. My father was a pilot for World War II and Ive always looked up to him. When I was young I admired his photos with him and his aircraft and wanted to be just like him. He taught me how to pilot a plane and aircrafts at a young age and it became my career. Now Im looking foward to pilot a helicopter', NULL);
INSERT INTO users
  (username, firstname, lastname, zipcode, imgURL, email, password_digest, ismentor, age, gender, occupation, hobbies, bio, credentials)
values
  ('Cloudia', 'Claudia', 'Baker', '91932', 'http://res.cloudinary.com/tutelage/image/upload/v1522772709/ClaudiaBaker.jpg', 'me@u.we1', '$2a$10$kjH6HiZmn9y4jABk9PN3v.rHJ51RJWGo5nYPZba16hIX4YUr9CVjS', 'true', '49', 'Female', 'President, IMG Insurance Agency', 'Crocheting', NULL, NULL);
INSERT INTO users
  (username, firstname, lastname, zipcode, imgURL, email, password_digest, ismentor, age, gender, occupation, hobbies, bio, credentials)
values
  ('Joshua75', 'Joshua', 'Henderson', '10001', 'http://res.cloudinary.com/tutelage/image/upload/v1522772822/JoshuaHenderson.jpg', 'me@u.we2', '$2a$10$kjH6HiZmn9y4jABk9PN3v.rHJ51RJWGo5nYPZba16hIX4YUr9CVjS', 'true', '43', 'Male', 'Sports Agent', 'Playing Fantasy Baseball', NULL, NULL);
INSERT INTO users
  (username, firstname, lastname, zipcode, imgURL, email, password_digest, ismentor, age, gender, occupation, hobbies, bio, credentials)
values
  ('PerksAng', 'Angie', 'Perkins', '11219', 'http://res.cloudinary.com/tutelage/image/upload/v1522772990/AngiePerkins.jpg', 'me@u.we3', '$2a$10$kjH6HiZmn9y4jABk9PN3v.rHJ51RJWGo5nYPZba16hIX4YUr9CVjS', 'true', '28', 'Female', 'CEO, All-Star Public Relations Firm ', 'Karaoke', NULL, NULL);
INSERT INTO users
  (username, firstname, lastname, zipcode, imgURL, email, password_digest, ismentor, age, gender, occupation, hobbies, bio, credentials)
values
  ('Tyrone88', 'Tyrone', 'Mayfield', '10023', 'http://res.cloudinary.com/tutelage/image/upload/v1522771547/CourtneyMayfield.jpg', 'me@u.we4', '$2a$10$kjH6HiZmn9y4jABk9PN3v.rHJ51RJWGo5nYPZba16hIX4YUr9CVjS', 'true', '30', 'Male', 'Sound Engineer/Jazz Musician', 'Restoring Vintage Automobiles', NULL, NULL);
INSERT INTO users
  (username, firstname, lastname, zipcode, imgURL, email, password_digest, ismentor, age, gender, occupation, hobbies, bio, credentials)
values
  ('AshleeT', 'Ashley', 'Thompson', '10002', 'http://res.cloudinary.com/tutelage/image/upload/v1522772488/AshleyThompson.jpg', 'me@u.we5', '$2a$10$kjH6HiZmn9y4jABk9PN3v.rHJ51RJWGo5nYPZba16hIX4YUr9CVjS', 'false', '31', 'Female', 'Author/Novelist', 'Scrabble Competitions', NULL, NULL);
INSERT INTO users
  (username, firstname, lastname, zipcode, imgURL, email, password_digest, ismentor, age, gender, occupation, hobbies, bio, credentials)
values
  ('JohnnyBake', 'John', 'Baker', '10028', 'http://res.cloudinary.com/tutelage/image/upload/v1522773173/JohnBaker.jpg', 'me@u.we6', '$2a$10$kjH6HiZmn9y4jABk9PN3v.rHJ51RJWGo5nYPZba16hIX4YUr9CVjS', 'false', '62', 'Male', 'Financial Accountant', 'Woodworking', NULL, NULL);
INSERT INTO users
  (username, firstname, lastname, zipcode, imgURL, email, password_digest, ismentor, age, gender, occupation, hobbies, bio, credentials)
values
  ('VioletGreene', 'Voletta', 'Greene', '10456', 'http://res.cloudinary.com/tutelage/image/upload/v1522771748/VolettaGreene.jpg', 'me@u.we7', '$2a$10$kjH6HiZmn9y4jABk9PN3v.rHJ51RJWGo5nYPZba16hIX4YUr9CVjS', 'false', '26', 'Female', 'Motivational Speaker', 'Chess', NULL, NULL);
INSERT INTO users
  (username, firstname, lastname, zipcode, imgURL, email, password_digest, ismentor, age, gender, occupation, hobbies, bio, credentials)
values
  ('RichArt', 'Richard', 'Artoul', '10192', 'http://res.cloudinary.com/tutelage/image/upload/v1523045174/richie.jpg', 'me@u.we8', '$2a$10$kjH6HiZmn9y4jABk9PN3v.rHJ51RJWGo5nYPZba16hIX4YUr9CVjS', 'true', '38', 'Male', 'Senior Developer', 'Solving Sudoku Puzzles', 'I enjoy coding and building web applications. I love to give back to the developer community. I joined other sites to find mentees but none of them seemed to work and I never really recieved a mentee. I make it my goal to help others and show that this career choice would be the best one they chose.', 'Bachelor of Science and Computer Science');
INSERT INTO users
  (username, firstname, lastname, zipcode, imgURL, email, password_digest, ismentor, age, gender, occupation, hobbies, bio, credentials)
values
  ('Jill70', 'Jill', 'Watson', '11215', 'http://res.cloudinary.com/tutelage/image/upload/v1522773737/JillWatson.jpg', 'me@u.we9', '$2a$10$kjH6HiZmn9y4jABk9PN3v.rHJ51RJWGo5nYPZba16hIX4YUr9CVjS', 'false', '48', 'Female', 'Chef', 'Painting', NULL, NULL);
INSERT INTO users
  (username, firstname, lastname, zipcode, imgURL, email, password_digest, ismentor, age, gender, occupation, hobbies, bio, credentials)
values
  ('carolina1', 'Carolina', 'Restrepo', '07110', 'http://res.cloudinary.com/tutelage/image/upload/v1522799780/juypm4v5fqitsg5sawiv.jpg', 'carolina@up.start', '$2a$10$kjH6HiZmn9y4jABk9PN3v.rHJ51RJWGo5nYPZba16hIX4YUr9CVjS', 'false', '26', 'Female', 'Junior Developer', 'Sculpting', 'As a Junior Developer coming into the Tech World, I feel a bit uneasy with the interview process. The white boarding interview process scares me the most and I plan to find someone who can help me with that.', 'Associates in Fine Arts and Bachelors in Social and Behavioral Sciences and C4Q ');
INSERT INTO users
  (username, firstname, lastname, zipcode, imgURL, email, password_digest, ismentor, age, gender, occupation, hobbies, bio, credentials)
values
  ('eddie1', 'Eddie', 'Harmon', '60628', 'http://res.cloudinary.com/tutelage/image/upload/v1522803875/t4ud3mf0v4fahfpu1cs0.jpg', 'eddie@up.start', '$2a$10$kjH6HiZmn9y4jABk9PN3v.rHJ51RJWGo5nYPZba16hIX4YUr9CVjS', 'true', '28', 'Male', 'Aquamarine Palentologist', 'Filming Documentaries', NULL, NULL);
INSERT INTO users
  (username, firstname, lastname, zipcode, imgURL, email, password_digest, ismentor, age, gender, occupation, hobbies, bio, credentials)
values
  ('nick1', 'Nicholas', 'Chavez', '11226', 'http://res.cloudinary.com/tutelage/image/upload/v1522799854/aktqfqevrooa1rry11vx.jpg', 'nick@up.start', '$2a$10$kjH6HiZmn9y4jABk9PN3v.rHJ51RJWGo5nYPZba16hIX4YUr9CVjS', 'false', '24', 'Male', 'Video Game Software Designer', 'Playing Videogames', NULL, NULL);
INSERT INTO users
  (username, firstname, lastname, zipcode, imgURL, email, password_digest, ismentor, age, gender, occupation, hobbies, bio, credentials)
values
  ('gerson1', 'Gerson', 'Castillo', '10452', 'http://res.cloudinary.com/tutelage/image/upload/v1522799965/uigofjebpaxcdlohdpyb.jpg', 'gerson@up.start', '$2a$10$kjH6HiZmn9y4jABk9PN3v.rHJ51RJWGo5nYPZba16hIX4YUr9CVjS', 'true', '26', 'Male', 'Senior Architect', 'Swimming', NULL, NULL);
INSERT INTO users
  (username, firstname, lastname, zipcode, imgURL, email, password_digest, ismentor, age, gender, occupation, hobbies, bio, credentials)
values
  ('greg1', 'Gregory', 'Davis', '10001', 'http://res.cloudinary.com/tutelage/image/upload/v1522977999/a1wovuhk7fvqop3e4euj.jpg', 'greg@up.start', '$2a$10$kjH6HiZmn9y4jABk9PN3v.rHJ51RJWGo5nYPZba16hIX4YUr9CVjS', 'false', '28', 'Male', 'Ducati Mechanical Engineer', 'Racing', NULL, NULL);
INSERT INTO users
  (username, firstname, lastname, zipcode, imgURL, email, password_digest, ismentor, age, gender, occupation, hobbies, bio, credentials)
values
  ('jcrest', 'Jason', 'Crest', '10128', 'http://res.cloudinary.com/tutelage/image/upload/v1522734137/jcrest.jpg', 'jason@up.start', '$2a$10$kjH6HiZmn9y4jABk9PN3v.rHJ51RJWGo5nYPZba16hIX4YUr9CVjS', 'true', '44', 'Male', 'Dentist', 'Training For Ironman', NULL, NULL);
INSERT INTO users
  (username, firstname, lastname, zipcode, imgURL, email, password_digest, ismentor, age, gender, occupation, hobbies, bio, credentials)
values
  ('adelle1', 'Adelle', 'Anderson', '90210', 'http://res.cloudinary.com/tutelage/image/upload/v1522799717/apyst02piyn3c7alvnyr.jpg', 'adelle@up.start', '$2a$10$kjH6HiZmn9y4jABk9PN3v.rHJ51RJWGo5nYPZba16hIX4YUr9CVjS', 'false', '24', 'Female', 'Physical Science Grad Student', 'Roller Skating', 'Born on the West Coast, I moved to sunny Florida when I was 9 years-old. That was when I saw my very first space shuttle launch taking off from Cape Canaveral. Ever since then, I have been inspired to see the space and stars for myself. I grew up admiring Mae Jemison and want to follow in her footsteps someday!', NULL);
  



INSERT INTO questions
  (the_question, answer_1, answer_2, answer_3, answer_4)
values
  ('What is your level of proficiency in the subject at hand?', 'Novice', 'Intermediate', 'Advanced', 'Expert');
INSERT INTO questions
  (the_question, answer_1, answer_2, answer_3, answer_4)
values
  ('What is your previous mentoring experience level?', 'This is my first time', 'I have mentored once before in the past', 'I have a few mentoring experiences under my belt', 'I have several years extensively mentoring others');
INSERT INTO questions
  (the_question, answer_1, answer_2, answer_3, answer_4)
values
  ('Do you see your role as a mentor as more of a(n):', 'Advisor', 'Supporter', 'Coach', 'Role-Model');
INSERT INTO questions
  (the_question, answer_1, answer_2, answer_3, answer_4)
values
  ('What is your preferred mentoring style?', 'Face-to-Face', 'Virtual (Skype, Google Hangouts, etc.)', 'Phone Calls', 'Text Messaging');
INSERT INTO questions
  (the_question, answer_1, answer_2, answer_3, answer_4)
values
  ('What level of privacy do you expect to give and receive while utilizing the app?', 'Full Disclosure (Nothing Off Limits)', 'I Agree To Only Mention Details To Close Friends', 'It Depends On The Situation', 'Total Discretion (Nothing Should Be Discussed With Anyone Outside App)');
INSERT INTO questions
  (the_question, answer_1, answer_2, answer_3, answer_4)
values
  ('How long does the ideal mentoring relationship last?', 'A Few Hours', 'A Few Days', 'A Few Weeks', 'As Long As It Takes');
INSERT INTO questions
  (the_question, answer_1, answer_2, answer_3, answer_4)
values
  ('In your opinion, what is the most important attribute of a mentor?', 'Empathy', 'Patience', 'Accuracy', 'Reliability');
INSERT INTO questions
  (the_question, answer_1, answer_2, answer_3, answer_4)
values
  ('What do you feel is the most important value for a mentee to have?', 'Eagerness To Learn', 'Punctuality', 'Consistency', 'Ability To Listen');
INSERT INTO questions
  (the_question, answer_1, answer_2, answer_3, answer_4)
values
  ('What is your main motivation for joining Tutelage?', 'It’s A Good Way To Spend Free Time', 'I Wanted To Give Back And Serve Others', 'Volunteer Experience For My Resume/Job', 'Great Way To Improve My Own Understanding Of The Subject Matter');
INSERT INTO questions
  (the_question, answer_1, answer_2, answer_3, answer_4)
values
  ('Who do you teach best?', 'Visual Learners', 'Auditory Learners', 'Hands-On Learners', 'All Of The Above');





INSERT INTO threads
  (user_1, user_2)
values
  ('carolina1', 'greg1');
INSERT INTO threads
  (user_1, user_2)
values
  ('nick1', 'eddie1');
INSERT INTO threads
  (user_1, user_2)
values
  ('gerson1', 'jcrest');
INSERT INTO  messages
  (thread_id, sender, body)
values
  ('1', 'carolina1', 'Message One');
INSERT INTO  messages
  (thread_id, sender, body)
values
  ('2', 'nick1', 'Message One');
INSERT INTO  messages
  (thread_id, sender, body)
values
  ('3', 'gerson1', 'Message One');
INSERT INTO  messages
  (thread_id, sender, body)
values
  ('1', 'greg1', 'Message Two');
INSERT INTO  messages
  (thread_id, sender, body)
values
  ('2', 'eddie1', 'Message Two');
INSERT INTO  messages
  (thread_id, sender, body)
values
  ('3', 'jcrest', 'Message Two');
INSERT INTO  messages
  (thread_id, sender, body)
values
  ('1', 'carolina1', 'Message Three');
INSERT INTO  messages
  (thread_id, sender, body)
values
  ('2', 'nick1', 'Message Three');
INSERT INTO  messages
  (thread_id, sender, body)
values
  ('3', 'gerson1', 'Message Three');
INSERT INTO  messages
  (thread_id, sender, body)
values
  ('1', 'greg1', 'Message Four');
INSERT INTO  messages
  (thread_id, sender, body)
values
  ('2', 'eddie1', 'Message Four');
INSERT INTO  messages
  (thread_id, sender, body)
values
  ('3', 'jcrest', 'Message Four');
INSERT INTO  messages
  (thread_id, sender, body)
values
  ('1', 'carolina1', 'Message Five');
INSERT INTO  messages
  (thread_id, sender, body)
values
  ('2', 'nick1', 'Message Five');
INSERT INTO  messages
  (thread_id, sender, body)
values
  ('3', 'gerson1', 'Message Five');
INSERT INTO  messages
  (thread_id, sender, body)
values
  ('1', 'greg1', 'Message Six');
INSERT INTO  messages
  (thread_id, sender, body)
values
  ('2', 'eddie1', 'Message Six');
INSERT INTO  messages
  (thread_id, sender, body)
values
  ('3', 'jcrest', 'Message Six');
INSERT INTO  messages
  (thread_id, sender, body)
values
  ('1', 'carolina1', 'Message Seven');
INSERT INTO  messages
  (thread_id, sender, body)
values
  ('2', 'nick1', 'Message Seven');
INSERT INTO  messages
  (thread_id, sender, body)
values
  ('3', 'gerson1', 'Message Seven');




INSERT INTO interests
  (username, interest)
values('gerson1', 'Coding');
INSERT INTO interests
  (username, interest)
values('gerson1', 'Music');
INSERT INTO interests
  (username, interest)
values('gerson1', 'Fishing');
INSERT INTO interests
  (username, interest)
values('nick1', 'Driving');
INSERT INTO interests
  (username, interest)
values('nick1', 'Music');
INSERT INTO interests
  (username, interest)
values('nick1', 'Hangout');
INSERT INTO interests
  (username, interest)
values('eddie1', 'Reading');
INSERT INTO interests
  (username, interest)
values('eddie1', 'Basketball');
INSERT INTO interests
  (username, interest)
values('eddie1', 'Archery');
INSERT INTO interests
  (username, interest)
values('greg1', 'Coding');
INSERT INTO interests
  (username, interest)
values('greg1', 'Sports');
INSERT INTO interests
  (username, interest)
values('greg1', 'Motorcycles');
INSERT INTO interests
  (username, interest)
values('carolina1', 'Coding');
INSERT INTO interests
  (username, interest)
values('carolina1', 'Camping');
INSERT INTO interests
  (username, interest)
values('carolina1', 'Computer Science');
INSERT INTO interests
  (username, interest)
values('carolina1', 'Swimming');
INSERT INTO interests
  (username, interest)
values('jcrest', 'Business');
INSERT INTO interests
  (username, interest)
values('jcrest', 'Finance');
INSERT INTO interests
  (username, interest)
values('jcrest', 'Fishing');
INSERT INTO interests
  (username, interest)
values('adelle1', 'Stargazing');
INSERT INTO interests
  (username, interest)
values('adelle1', 'Binging On Netflix');
INSERT INTO interests
  (username, interest)
values('adelle1', 'Backpacking In Foreign Countries');
INSERT INTO interests
  (username, interest)
values('RichArt', 'Coding');
INSERT INTO interests
  (username, interest)
values('RichArt', 'Sudoku');
INSERT INTO interests
  (username, interest)
values('RichArt', 'Computer Science');
INSERT INTO interests
  (username, interest)
values('RichArt', 'Cook');



-- INSERT INTO answers (answer_selection, question_id, user_id)
--   values (1, 1, 1);
