import { Request, Response } from "express";
import ref from "../../config/MongoConfig";

/*
    get all the custom problems
    return a card liek form of information to the user
    * include ID
    * Desc
    * creator
*/
export default async function cards(req: Request, res: Response) {
  const collection = await ref("custom_problems");
  const problems = await collection.find({}).toArray(); // all the problems

  const cardForm = problems.map((problem) => {
    return {};
  });

  res.status(200).json({ cardForm });
}
