import { MongoClient } from "mongodb";
import * as dotenv from "dotenv";
dotenv.config();

const uri = process.env.DATABASE_HOST;
const client = new MongoClient(uri as string);

async function Connect(collect: string) {
  const result = await client.connect();
  const db = result.db("DeatCode");
  const collection = db.collection(collect);
  const data = await collection.find({}).toArray();
  console.log(data);
}

export default Connect;
