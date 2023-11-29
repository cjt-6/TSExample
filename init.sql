CREATE DATABASE if NOT EXISTS book_manage;
use book_manage;


-- books
CREATE TABLE if NOT EXISTS books (
  id int AUTO_INCREMENT,
  bookname varchar(50) NOT NULL UNIQUE, 
  PRIMARY KEY (id)
);
INSERT INTO books (id, bookname) VALUES
(NULL, 'book1'),
(NULL, 'book2');


-- users
CREATE TABLE if NOT EXISTS users (
  id int AUTO_INCREMENT,
  username varchar(50) NOT NULL UNIQUE, 
  PRIMARY KEY (id)
) ;
INSERT INTO users (id, username) VALUES
(null, 'jack'),
(null, 'lucy');


-- borrow_history
CREATE TABLE if NOT EXISTS borrow_history (
  id int AUTO_INCREMENT,
  borrow_time datetime NOT NULL UNIQUE,
  user_id int NOT NULL,
  book_id int NOT NULL,
  PRIMARY KEY (id),
  Foreign Key (user_id) REFERENCES users(id),
  Foreign Key (book_id) REFERENCES books(id)
);

INSERT INTO borrow_history (id, borrow_time, user_id, book_id) VALUES
(NULL, '2023-11-07 12:09:13', 1, 1),
(NULL, '2023-11-09 15:00:00', 1, 2);




