import { Request, Response } from "express";
import ref from "../../config/MongoConfig";

export default async function baseProblems(req: Request, res: Response) {
  const collection = await ref("challanges");

  const [randomProblem] = await collection
    .aggregate([{ $sample: { size: 1 } }])
    .toArray();

  res.status(200).json(randomProblem);
}
