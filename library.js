"use strict";

// Class constructor denoting user details
exports.User = class {
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
exports.User_access = class {
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
exports.Credential = class {
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
exports.Login = class {
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
exports.Book = class {
    // Item title
    title;
    // Item author
    author;
    // Item category
    genre;

    constructor(title, author, genre) {
        this.title = title;
        this.author = author;
        this.genre = genre;
    }
}

// Class contructor denoting secondary book features
exports.Book_details = class {
    // Item URL link
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
exports.Book_genre = class {
    // Genre category
    genre;
    // Genre category description
    genre_description;

    constructor(genre, genre_description) {
        this.genre = genre;
        this.genre_description = genre_description;
    }
}

// Class constructor denoting complete book detailing
exports.Book_complete = class {
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