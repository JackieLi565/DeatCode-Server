import { MongoClient } from "mongodb";
import * as dotenv from "dotenv";
dotenv.config();

const uri = process.env.DATABASE_HOST;
const client = new MongoClient(uri as string);

type collections = "users" | "challanges" | "custom_challanges";

//return dcollection pointer
const ref = async (collect: collections) => {
  const result = await client.connect();
  const db = result.db("DeatCode");
  const collection = db.collection(collect);
  return collection;
};

export default ref;
