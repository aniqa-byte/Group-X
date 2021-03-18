"use strict";

class User {
    // User ID
    id;
    // User email
    email;
    // Password
    password;
    // Admin
    access = 0;

    constructor(id, email, password, access) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.access = access;
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
    genre_description

    constructor(genre, genre_description) {
        this.genre = genre;
        this.genre_description = genre_description;
    }
}