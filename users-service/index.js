import express from "express";
const app = express();

app.use(express.json());

function extractUserInfo(req, res, next) {
  const userId = req.headers["x-user-id"];
  const username = req.headers["x-user-name"];
  const email = req.headers["x-user-email"];
  const firstName = req.headers["x-user-first-name"];
  const lastName = req.headers["x-user-last-name"];

  req.user = {
    userId,
    username,
    email,
    firstName,
    lastName,
  };
  next();
}

app.get("/api/users/", extractUserInfo, (req, res) => {
  res.json(req?.user);
});
app.get("/public/users/", (req, res) => {
  res.json({
    message: "This is a public users endpoint",
  });
});

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
