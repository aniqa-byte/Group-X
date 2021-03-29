PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE users (
    email TEXT PRIMARY KEY,
    id INTEGER (255)
);
INSERT INTO users VALUES('ROOT',1);
INSERT INTO users VALUES('test1@email.com',2);
INSERT INTO users VALUES('test2@email.com',3);
INSERT INTO users VALUES('test3@email.com',4);
INSERT INTO users VALUES('updatedemail1@email.com',1616446450377);
INSERT INTO users VALUES('createduser1@email.com',1616619483785);
INSERT INTO users VALUES('test@email.com',1617038688381);
CREATE TABLE credentials (
    password TEXT,
    user_id INTEGER (255),
    FOREIGN KEY (user_id) REFERENCES users (id)
);
INSERT INTO credentials VALUES('ROOT',1);
INSERT INTO credentials VALUES('AAA111',2);
INSERT INTO credentials VALUES('BBB222',3);
INSERT INTO credentials VALUES('CCC333',4);
INSERT INTO credentials VALUES('password1',1616446450377);
INSERT INTO credentials VALUES('Pass123',1616619483785);
INSERT INTO credentials VALUES('1234321',1617038688381);
CREATE TABLE admin_access (
    access INTEGER (1),
    user_id INTEGER (255),
    FOREIGN KEY (user_id) REFERENCES users (id)
);
INSERT INTO admin_access VALUES(1,1);
INSERT INTO admin_access VALUES(1,2);
INSERT INTO admin_access VALUES(0,3);
INSERT INTO admin_access VALUES(0,4);
INSERT INTO admin_access VALUES(0,1616446450377);
INSERT INTO admin_access VALUES(0,1616619483785);
INSERT INTO admin_access VALUES(0,1617038688381);
CREATE TABLE books (
    title VARCHAR (50) PRIMARY KEY,
    author VARCHAR (50),
    genre VARCHAR (50),
    FOREIGN KEY (genre) REFERENCES book_genre (genre)
);
INSERT INTO books VALUES('Title 1','Author 1','Genre 1');
INSERT INTO books VALUES('Title 2','Author 1','Genre 1');
INSERT INTO books VALUES('Title 3','Author 2','Genre 1');
INSERT INTO books VALUES('Title 4','Author 3','Genre 2');
INSERT INTO books VALUES('Title 5','Author 4','Genre 3');
INSERT INTO books VALUES('Title 6','Author 4','Genre 3');
CREATE TABLE book_details (
    title VARCHAR (50),
    item_link TEXT,
    item_description TEXT,
    FOREIGN KEY (title) REFERENCES books (title)
);
INSERT INTO book_details VALUES('Title 1','https://www.google.co.uk','1Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.');
INSERT INTO book_details VALUES('Title 2','https://www.amazon.co.uk','2Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.');
INSERT INTO book_details VALUES('Title 3','https://www.google.co.uk','3Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.');
INSERT INTO book_details VALUES('Title 4','https://www.google.co.uk','4Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.');
INSERT INTO book_details VALUES('Title 5','https://www.google.co.uk','5Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.');
INSERT INTO book_details VALUES('Title 6','https://www.google.co.uk','6Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.');
CREATE TABLE book_genre (
    genre VARCHAR (50) PRIMARY KEY,
    genre_description TEXT
);
INSERT INTO book_genre VALUES('Genre 1','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.');
INSERT INTO book_genre VALUES('Genre 2','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.');
INSERT INTO book_genre VALUES('Genre 3','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.');
INSERT INTO book_genre VALUES('Genre 4','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.');
COMMIT;
