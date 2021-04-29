"use strict";

// Class constructor denoting user details
class User {
    // User ID
    id;
    // User email
    email;

    constructor(id, email) {
        this.id = id;
        this.email = email;
    }
}

// Class constructor denoting access type
class User_access {
    // access level - default non-admin
    access = 0;
    // password
    password;

    constructor(access, password) {
        this.access = access;
        this.password = password;
    }
}

// Class constructor denoting user credentials
class Credential {
    // user id
    id;
    // password
    password;

    constructor(id, password) {
        this.id = id;
        this.password = password;
    }
}

// Class constructor denoting login requirements
class Login {
    // user email
    email;
    // password
    password;

    constructor(email, password) {
        this.email = email;
        this.password = password;
    }
}

// Class constructor denoting primary book features
class Book {
    // Item title
    title;
    // Item author
    author;
    // Item genre
    genre;

    constructor(title, author, genre) {
        this.title = title;
        this.author = author;
        this.genre = genre;
    }
}

// Class contructor denoting secondary book features
class Book_details {
    // Item URL
    item_link;
    // Item description
    item_description;
    // Book item title
    title;

    constructor(item_link, item_description, title) {
        this.item_link = item_link;
        this.item_description = item_description;
        this.title = title;
    }
}

// Class constructor denoting genre type and descriptor
class Book_genre {
    // Genre category
    genre;
    // Gnere category description
    genre_description;

    constructor(genre, genre_description) {
        this.genre = genre;
        this.genre_description = genre_description;
    }
}

// Class constructor denoting complete book detailing
class Book_complete {
    // Book title
    title;
    // Book author
    author;
    // Book genre
    genre;
    // Book link
    item_link;
    // Book description
    item_description;

    constructor(title, author, genre, item_link, item_description) {
        this.title = title;
        this.author = author;
        // parameter input or standard replacement
        this.genre = genre || "Empty Genre";
        this.item_link = item_link;
        // parameter input or standard replacement
        this.item_description = item_description || "Empty Description";
    }
}