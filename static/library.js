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
    // Item ID
    item_id;
    // Item visibility
    visible = 0;
    // Item title
    title;
    // Item author
    author;
    // Item category
    genre;
    // Item URL link
    item_link;
    // Item description
    item_description;

    constructor(item_id, visible, title, author, genre, item_link, item_description) {
        this.item_id = item_id;
        this.visible = visible;
        this.title = title;
        this.author = author;
        this.genre = genre;
        this.item_link = item_link;
        this.item_description = item_description;
    }
}