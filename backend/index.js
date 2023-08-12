import express, { json, query } from "express";
import mysql from "mysql";
const app = express();
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Sohamchikane@1",
  database: "test",
});

app.use(express.json());

app.get("/", (req, res) => {
  res.json("This is backend");
});

app.get("/books", (req, res) => {
  const q = "SELECT * FROM BOOKS";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post("/books", (req, res) => {
  const q = "INSERT INTO books ('title','desc','price','cover') VALUES (?)";
  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
  ];

  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json("books ahs been created");
  });
});

app.delete("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const q = " DELETE FROM books WHERE id = ? ";
  
    db.query(q, [bookId], (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
    });
  });

  app.put("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const q = "UPDATE books SET `title`= ?, `desc`= ?, `price`= ?, `cover`= ? WHERE id = ?";
  
    const values = [
      req.body.title,
      req.body.desc,
      req.body.price,
      req.body.cover,
    ];
  
    db.query(q, [...values,bookId], (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
    });
  });

app.listen(8800, () => {
  console.log("Connected to Backend!");
});
