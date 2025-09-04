import connectionPool from "../utils/db.mjs";

//Answer_Votes

//POST
export const voteAnswer = async (req, res) => {
  const { answerId } = req.params;
  const { action } = req.body;
  try {
    let updateVote;
    if (action === "+") updateVote = 1;
    else if (action === "-") updateVote = -1;
    else return res.status(400).json({ message: "Invalid vote value." });

    const results = await connectionPool.query(
      `select * from answers where id = $1`,
      [answerId]
    );
    if (!results.rows[0])
      return res.status(404).json({ message: "Answer not found." });
    await connectionPool.query(
      `
          insert into answer_votes (answer_id, vote)
          values ($1, $2)`,
      [answerId, updateVote]
    );
    res.json({
      message: "Vote on the answer has been recorded successfully.",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Unable to vote answer." });
  }
};
