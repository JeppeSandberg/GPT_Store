const sqlite3 = require("sqlite3").verbose();

// open the database
let db = new sqlite3.Database("./ecommerce.db");

db.serialize(function () {
  // create the tables
  db.run(
    "CREATE TABLE IF NOT EXISTS categories (id INTEGER PRIMARY KEY, name TEXT)"
  );
  db.run(
    "CREATE TABLE IF NOT EXISTS products (id INTEGER PRIMARY KEY, name TEXT, description TEXT, image TEXT, price REAL, stock INTEGER, categoryId INTEGER, FOREIGN KEY(categoryId) REFERENCES categories(id))"
  );
  db.run(
    "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, username TEXT, password TEXT, isAdmin INTEGER)"
  );
  db.run(
    "CREATE TABLE IF NOT EXISTS cart (id INTEGER PRIMARY KEY, userId INTEGER, productId INTEGER, quantity INTEGER)"
  );
  db.run(
    "CREATE TABLE IF NOT EXISTS orders (id INTEGER PRIMARY KEY, userId INTEGER, total REAL)"
  );
  db.run(
    "CREATE TABLE IF NOT EXISTS ratings (id INTEGER PRIMARY KEY, userId INTEGER, productId INTEGER, rating INTEGER, FOREIGN KEY(userId) REFERENCES users(id), FOREIGN KEY(productId) REFERENCES products(id))"
  );
});

module.exports = db;