
DELETE FROM users;
DELETE FROM channels;
DELETE FROM messages;

-- -------------------------------------------------------------------------------
-- --- Populate users database ----------------------------------------------------------------------------------------------------------------------------------
INSERT INTO users(login, nickname, password) VALUES('etudiant0', 'E0','mp0');
INSERT INTO users(login, nickname, password) VALUES('etudiant1', 'E1','mp1');
INSERT INTO users(login, nickname, password) VALUES('etudiant2', 'E2','mp2');
INSERT INTO users(login, nickname, password) VALUES('etudiant3', 'E3','mp3');

-- -------------------------------------------------------------------------------
-- --- Populate channels database ---------------------------------------------------
-- -------------------------------------------------------------------------------
ALTER SEQUENCE channels_id_seq RESTART;
INSERT INTO channels(name) VALUES('General');
INSERT INTO channels(name) VALUES('Musique');
INSERT INTO channels(name) VALUES('Voyage');
INSERT INTO channels(name) VALUES('Cinema');
INSERT INTO channels(name) VALUES('Bricolage');

-------------------------------------------------------------------------------
--- Populate messages database ------------------------------------------------
-------------------------------------------------------------------------------
ALTER SEQUENCE messages_id_seq RESTART;
INSERT INTO messages(userLogin, channelid, message) VALUES('etudiant0', 1, 'a');
INSERT INTO messages(userLogin, channelid, message) VALUES('etudiant1', 1, 'b');
INSERT INTO messages(userLogin, channelid, message) VALUES('etudiant0', 1, 'c');
INSERT INTO messages(userLogin, channelid, message) VALUES('etudiant2', 3, 'd');
INSERT INTO messages(userLogin, channelid, message) VALUES('etudiant3', 4, 'e');
