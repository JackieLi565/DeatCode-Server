import { Request, Response } from "express";
import ref from "../config/MongoConfig";

export async function baseProblems(req: Request, res: Response) {
  const collection = await ref("challanges");

  const [randomProblem] = await collection
    .aggregate([{ $sample: { size: 1 } }])
    .toArray();

  res.status(200).json(randomProblem);
}

/*
    get all the custom problems
    return a card liek form of information to the user
    * include ID
    * Desc
    * creator
*/
export async function allCustomProblems(req: Request, res: Response) {
  const collection = await ref("custom_challanges");
  const problems = await collection.find({}).toArray(); // all the problems

  const cardForm = problems.map((problem) => {
    return {};
  });

  res.status(200).json({ cardForm });
}

// query param
// check amount of custom problems left
// let user do the problem, no points given
export async function customProblems(req: Request, res: Response) {
  const collection = await ref("custom_challanges");
  // get problem id
  // give custom problem
  const problemID = req.body.problemID;
  const problems = await collection.findOne({ "_id.$oid": problemID });
  res.send(200).json({ problems });
}
