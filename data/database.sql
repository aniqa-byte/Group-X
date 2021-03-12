PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;

CREATE TABLE users (
    user_number INT PRIMARY KEY AUTOINCREMENT,
    id INT (255) NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE
);

INSERT INTO users VALUES (11111,'ROOT');
INSERT INTO users VALUES (12222,'test1@email.com');
INSERT INTO users VALUES (13333,'test2@email.com');
INSERT INTO users VALUES (14444,'test3@email.com');

CREATE TABLE credentials (
    user_id INT (255) NOT NULL,
    password TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id)
);

INSERT INTO credentials VALUES (11111,'PASSWORD');
INSERT INTO credentials VALUES (12222,'AAA111');
INSERT INTO credentials VALUES (13333,'BBB222');
INSERT INTO credentials VALUES (14444,'CCC333');

CREATE TABLE admin_access (
    user_id INT (255) NOT NULL,
    access INT (1),
    FOREIGN KEY (user_id) REFERENCES users (id)
);

INSERT INTO admin_access VALUES (11111,1);
INSERT INTO admin_access VALUES (12222,1);
INSERT INTO admin_access VALUES (13333,0);
INSERT INTO admin_access VALUES (14444,0);

CREATE TABLE books (
    item_id INT PRIMARY KEY AUTOINCREMENT,
    visible INT (1),
    title VARCHAR (50),
    author VARCHAR (50),
    genre VARCHAR (50),
    item_link TEXT,
    item_description TEXT,
    FOREIGN KEY (genre) REFERENCES book_categories (category)
);

INSERT INTO books VALUES (1,"Title 1","Author 1","Genre 1","https://www.google.co.uk","Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.");
INSERT INTO books VALUES (0,"Title 2","Author 1","Genre 1","https://www.google.co.uk","Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.");
INSERT INTO books VALUES (1,"Title 3","Author 2","Genre 1","https://www.google.co.uk","Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.");
INSERT INTO books VALUES (1,"Title 4","Author 3","Genre 2","https://www.google.co.uk","Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.");
INSERT INTO books VALUES (1,"Title 5","Author 4","Genre 3","https://www.google.co.uk","Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.");
INSERT INTO books VALUES (1,"Title 6","Author 4","Genre 3","https://www.google.co.uk","Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.");

CREATE TABLE book_categories (
    category_code INT PRIMARY KEY AUTOINCREMENT,
    category VARCHAR (50),
    category_description TEXT
);

INSERT INTO book_categories VALUES ("Genre 1","Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.");
INSERT INTO book_categories VALUES ("Genre 2","Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.");
INSERT INTO book_categories VALUES ("Genre 3","Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.");
INSERT INTO book_categories VALUES ("Genre 4","Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.");

COMMIT;