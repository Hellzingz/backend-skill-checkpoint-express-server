import express from "express";
import dotenv from 'dotenv';
import questionRouter from "./routers/questions.mjs";
import answersRouter from "./routers/answers.mjs";
dotenv.config();

const app = express();
const port = 4000;

app.use(express.json());


app.get("/test", (req, res) => {
  return res.json("Server API is working 🚀");
});

//Route
app.use('/questions', questionRouter)
app.use('/answers', answersRouter)


app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
