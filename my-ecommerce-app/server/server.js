const db = require("./database.js");
const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const app = express();
const port = process.env.PORT || 3001;
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const saltRounds = 10;

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/register", (req, res) => {
  const { username, password, isAdmin } = req.body;

  // Hash the password
  bcrypt.hash(password, saltRounds, function (err, hash) {
    if (err) {
      res.status(500).send(err);
    } else {
      const sql =
        "INSERT INTO users (username, password, isAdmin) VALUES (?, ?, ?)";
      db.run(sql, [username, hash, isAdmin], function (err) {
        if (err) {
          res.status(500).send(err);
        } else {
          res.send({ id: this.lastID });
        }
      });
    }
  });
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const sql = "SELECT * FROM users WHERE username = ?";
  db.get(sql, username, (err, row) => {
    if (err) {
      res.status(500).send(err);
    } else if (!row) {
      res.status(401).send("User not found");
    } else {
      bcrypt.compare(password, row.password, function (err, result) {
        if (err) {
          res.status(500).send(err);
        } else if (result) {
          res.send({ id: row.id, username: row.username });
        } else {
          res.status(401).send("Password is incorrect");
        }
      });
    }
  });
});

// Products routes
app.get("/products", (req, res) => {
  db.all("SELECT * FROM products", [], (err, rows) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(rows);
    }
  });
});

app.post("/products", (req, res) => {
  const { name, description, image, price, stock, categoryId } = req.body;
  const sql =
    "INSERT INTO products (name, description, image, price, stock, categoryId) VALUES (?, ?, ?, ?, ?, ?)";
  db.run(
    sql,
    [name, description, image, price, stock, categoryId],
    function (err) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send({ id: this.lastID });
      }
    }
  );
});

app.put("/products/:id", (req, res) => {
  const { name, description, image, price, stock, categoryId } = req.body;
  const { id } = req.params;
  const sql =
    "UPDATE products SET name = ?, description = ?, image = ?, price = ?, stock = ?, categoryId = ? WHERE id = ?";
  db.run(
    sql,
    [name, description, image, price, stock, categoryId, id],
    function (err) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send({ changes: this.changes });
      }
    }
  );
});

app.delete("/products/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM products WHERE id = ?";
  db.run(sql, id, function (err) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send({ changes: this.changes });
    }
  });
});

// Users routes
app.get("/users", (req, res) => {
  // Implement your logic here to get all users
});

app.post("/users", (req, res) => {
  // Implement your logic here to add a new user
});

// Cart routes
app.get("/cart/:userId", (req, res) => {
  const { userId } = req.params;
  const sql = "SELECT * FROM cart WHERE userId = ?";
  db.all(sql, userId, (err, rows) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(rows);
    }
  });
});

app.post("/cart", (req, res) => {
  const { userId, productId, quantity } = req.body;

  // Validate request data
  if (!userId || !productId || !quantity) {
    return res.status(400).send("Missing required data");
  }

  const sql = "INSERT INTO cart (userId, productId, quantity) VALUES (?, ?, ?)";
  db.run(sql, [userId, productId, quantity], function (err) {
    if (err) {
      res.status(500).send("Database error");
    } else {
      res.send({ id: this.lastID });
    }
  });
});

app.delete("/cart/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM cart WHERE id = ?";
  db.run(sql, id, function (err) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send({ changes: this.changes });
    }
  });
});

// Orders routes
app.get("/orders/:userId", (req, res) => {
  const { userId } = req.params;
  const sql = "SELECT * FROM orders WHERE userId = ?";
  db.all(sql, userId, (err, rows) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(rows);
    }
  });
});

// Orders routes
app.post("/orders", (req, res) => {
  const { userId, total } = req.body;

  // Validate request data
  if (!userId || !total) {
    return res.status(400).send("Missing required data");
  }

  const sql = "INSERT INTO orders (userId, total) VALUES (?, ?)";
  db.run(sql, [userId, total], function (err) {
    if (err) {
      res.status(500).send("Database error");
    } else {
      res.send({ id: this.lastID });
    }
  });
});

app.post("/categories", (req, res) => {
  const { name } = req.body;

  // Validate request data
  if (!name) {
    return res.status(400).send("Missing required data");
  }

  const sql = "INSERT INTO categories (name) VALUES (?)";
  db.run(sql, [name], function (err) {
    if (err) {
      res.status(500).send("Database error");
    } else {
      res.send({ id: this.lastID });
    }
  });
});

app.get("/categories", (req, res) => {
  const sql = "SELECT * FROM categories";
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(500).send("Database error");
    } else {
      res.send(rows);
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
