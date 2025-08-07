const express = require("express");

const app = express();

const products = [
  { id: 1, name: "Product A" },
  { id: 2, name: "Product B" },
  { id: 3, name: "Product C" },
  { id: 4, name: "Product D" },
];

app.get("/api/products/", (req, res) => {
  const userId = req.header("x-user-id");
  if (!userId) {
    return res.status(400).json({ error: "x-user-id header is required" });
  }
  res.json(products);
});
app.get("/public/products/", (req, res) => {
  res.json({
    message: "This is a public product endpoint",
  });
});

app.listen(5002, () => {
  console.log("Server running on port 5002");
});
