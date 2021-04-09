"use strict";

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

class Book_complete {
    title;
    author;
    genre;
    item_link;
    item_description;

    constructor(title, author, genre, item_link, item_description) {
        this.title = title;
        this.author = author || "Empty Author";
        this.genre = genre;
        this.item_link = item_link;
        this.item_description = item_description || "Empty Description";
    }
}