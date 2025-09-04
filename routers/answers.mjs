import { Router } from "express";
import { voteAnswer } from "../controllers/answers.mjs";

const answersRouter = Router()

answersRouter.post('/:answerId/votes', voteAnswer)


export default answersRouter