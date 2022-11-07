import express, { Router } from "express";
import cors from "cors";

const arrUsers = [];
const arrTweets = [];

const app = express();
app.use(cors());
app.use(express.json());

app.post("/sign-up", (req, res) => {
  const { username, avatar } = req.body;

  if (!username || !avatar) {
    return res.status(400).send("Todos os campos são obrigatórios");
  }

  const user = {
    username,
    avatar,
  };

  arrUsers.push(user);
  res.status(201).send("OK");
});

app.post("/tweets", (req, res) => {
  const { tweet } = req.body;
  const username = req.headers.user;

  if (!username || !tweet) {
    return res.status(409).send("Todos os campos são obrigatórios");
  }

  const newTweet = {
    username,
    tweet,
  };

  arrTweets.unshift(newTweet);
  console.log(arrTweets);
  res.status(201).send("OK");
});

app.get("/tweets", (req, res) => {
  let page = parseInt(req.query.page);
  if (!page) {
    page = 1;
  }
  if (page < 1) {
    return res.status(400).send("Informe uma página válida!");
  }
  if ((page - 1) * 10 > arrTweets.length) {
    return res
      .status(400)
      .send(
        `Só existem tweets até a página ${
          Math.trunc(arrTweets.length / 10) + 1
        }`
      );
  }
  
  arrTweets.forEach(
    (e) => (e.avatar = arrUsers.find((u) => u.username === e.username).avatar)
  );
  const tweetsWithAvatar = [];

  for (let i = 10 * page - 10; i < 10 * page && i < arrTweets.length; i++) {
    tweetsWithAvatar.push(arrTweets[i]);
  }
  res.send(tweetsWithAvatar);
});

app.get("/tweets/:username", (req, res) => {
  const user = req.params.username;
  arrTweets.forEach(
    (e) => (e.avatar = arrUsers.find((u) => u.username === e.username).avatar)
  );

  const userTweets = arrTweets.filter((e) => e.username === user);
  const tweetsWithAvatar = [];

  for (let i = 0; i < 10 && i < userTweets.length; i++) {
    tweetsWithAvatar.push(userTweets[i]);
  }

  res.send(tweetsWithAvatar);
});

const port = 5000;
app.listen(port, () => console.log(`App running in http://localhost:${port}`));
