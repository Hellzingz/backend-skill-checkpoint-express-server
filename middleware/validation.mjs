
//Validate Questions
export const validateQuestions = (req, res, next) => {
  const { title,description } = req.body;
  if (!title || !description) {
    return res.status(400).json({"message": "Invalid request data."});
  }
  next();
};


//Validate Answers
export const validateAnswers = (req, res, next) => {
  const { content } = req.body;
  if (!content) {
    return res.status(400).json({ message: "Answers are required." });
  }
  if (content.length > 300)
    return res
      .status(400)
      .json({ message: "Answers must not exceed 300 characters." });
  next();
};
