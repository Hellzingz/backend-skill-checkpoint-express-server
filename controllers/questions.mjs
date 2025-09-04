import connectionPool from "../utils/db.mjs";

//POST
//CREATE Questions
export const createQuestion = async (req, res) => {
  const { title, description, category } = req.body;
  try {
    const results = await connectionPool.query(
      `insert into questions (title, description,category)
            values ($1, $2, $3)`,
      [title, description, category]
    );
    res.status(201).json({ message: "Question created successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Unable to create question." });
  }
};

//GET
//READ All
export const read = async (req, res) => {
  try {
    const results = await connectionPool.query(`select * from questions`);
    res.status(200).json({ data: results.rows });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Unable to fetch questions." });
  }
};

//ReadById
export const readById = async (req, res) => {
  const { questionId } = req.params;
  try {
    const results = await connectionPool.query(
      `select * from questions where id = $1`,
      [questionId]
    );
    if (!results.rows[0]) {
      return res.status(404).json({ message: "Question not found." });
    }
    res.status(200).json({ data: results.rows[0] });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Unable to fetch questions." });
  }
};

//ReadBySearch
export const readByQuery = async (req, res) => {
  const title = req.query.title ? `%${req.query.title}%` : null;
  const category = req.query.category ? `%${req.query.category}%` : null;
  try {
    const results = await connectionPool.query(
      `select * from questions 
        where (title ilike $1 or $1 is null)
        and (category ilike  $2 or $2 is null)
        `,
      [title, category]
    );
    if (!results.rows[0]) {
      return res.status(400).json({ message: "Invalid search parameters." });
    }
    res.status(200).json({ data: results.rows });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Unable to fetch questions." });
  }
};

//PUT
export const update = async (req, res) => {
  const { questionId } = req.params;
  const { title, description, category } = req.body;
  try {
    const results = await connectionPool.query(
      `update questions
    set title = $2,
    description = $3,
    category = $4
    where id = $1`,
      [questionId, title, description, category]
    );
    if (results.rowCount === 0) {
      return res.status(404).json({ message: "Question not found." });
    }
    res.status(200).json({ message: "Question updated successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Unable to updated questions." });
  }
};

//DELETE
export const remove = async (req, res) => {
  const { questionId } = req.params;
  try {
    const results = await connectionPool.query(
      `delete from questions where id = $1`,
      [questionId]
    );
    if (results.rowCount === 0) {
      return res.status(404).json({ message: "Question not found." });
    }
    res
      .status(200)
      .json({ message: "Question post has been deleted successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Unable to delete question." });
  }
};

// Answers

// POST
export const createAnswer = async (req, res) => {
  const { questionId } = req.params;
  const { content } = req.body;
  try {
    const results = await connectionPool.query(
      `insert into answers (question_id,content)
              values ($1, $2)`,
      [questionId, content]
    );
    res.status(201).json({ message: "Answer created successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Unable to create answers." });
  }
};

//GET
export const readAnswer = async (req, res) => {
  const { questionId } = req.params;
  try {
    const results = await connectionPool.query(
      `select question_id as id,content from answers where question_id = $1`,
      [questionId]
    );
    if (!results.rows[0]) {
      return res.status(404).json({ message: "Answers not found." });
    }
    res.status(200).json({ data: results.rows });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Unable to fetch answers." });
  }
};

//DELETE
export const removeAnswers = async (req, res) => {
  const { questionId } = req.params;
  try {
    const results = await connectionPool.query(
      `delete from answers where question_id = $1`,
      [questionId]
    );
    if (results.rowCount === 0) {
      return res.status(404).json({ message: "Answers not found." });
    }
    res.status(200).json({
      message: "All answers for the question have been deleted successfully.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Unable to delete answers." });
  }
};

//Question_Votes

//POST
export const voteQuestion = async (req, res) => {
  const { questionId } = req.params;
  const { action } = req.body;
  try {
    let updateVote;
    if (action === "+") updateVote = 1;
    else if (action === "-") updateVote = -1;
    else return res.status(400).json({ message: "Invalid vote value." });

    const results = await connectionPool.query(
      `select * from questions where id = $1`,
      [questionId]
    );
    if (!results.rows[0])
      return res.status(404).json({ message: "Question not found." });
    await connectionPool.query(
      `
        insert into question_votes (question_id, vote)
        values ($1, $2)`,
      [questionId, updateVote]
    );
    res.json({
      message: "Vote on the question has been recorded successfully.",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Unable to vote question." });
  }
};
