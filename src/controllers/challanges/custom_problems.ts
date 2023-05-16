import { Request, Response } from "express";
import ref from "../../config/MongoConfig";
// query param
// check amount of custom problems left
// let user do the problem, no points given
export default async function customProblems(req: Request, res: Response) {
  const collection = await ref("custom_problems");
  // get problem id
  // give custom problem
  const problemID = req.body.problemID;
  const problems = await collection.findOne({ "_id.$oid": problemID });
  res.send(200).json({ problems });
}
