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
    return res.status(422).send("Todos os campos são obrigatórios");
  }

  if (arrUsers.find((u) => u.username === username)) {
    return res.status(409).send("Usuário já cadastrado");
  }

  const user = {
    username,
    avatar,
  };

  arrUsers.push(user);
  res.status(201).send("OK");
});


app.post('/tweets', (req, res) => {
    const { username, tweet } = req.body;

    if(!username || ! tweet){
        return res.status(422).send("Todos os campos são obrigatórios");
    }
    
    const newTweet = {
        username,
        tweet
    }

    arrTweets.push(newTweet);
    res.status(201).send("OK");
})


app.get("/", (req, res) => {
  console.log("Hello World");
});

const port = 5000;
app.listen(port, () => console.log(`App running in http://localhost:${port}`));
