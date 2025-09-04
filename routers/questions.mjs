import { Router } from "express";
import { read,createQuestion,readById,update,remove,readByQuery, 
        createAnswer,readAnswer,removeAnswers,
        voteQuestion
  } 
  from "../controllers/questions.mjs"
import { validateQuestions,validateAnswers } from "../middleware/validation.mjs";
const questionRouter = Router()

questionRouter.get("/", read);
questionRouter.get("/search", readByQuery);
questionRouter.get("/:questionId", readById);
questionRouter.post("/",validateQuestions, createQuestion);
questionRouter.put("/:questionId",validateQuestions, update);
questionRouter.delete("/:questionId", remove);

//Nested Router

 
questionRouter.post("/:questionId/answers", validateAnswers, createAnswer);
questionRouter.get("/:questionId/answers",readAnswer);
questionRouter.delete("/:questionId/answers",removeAnswers);

questionRouter.post("/:questionId/votes", voteQuestion)



export default questionRouter