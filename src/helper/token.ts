import { sign } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export default function handleJWT(id: string, latestCompletion: number) {
  const token = sign(
    {
      exp: Math.floor(Date.now() / 1000) + 7200, //2 hours
      id,
      latestCompletion,
    },
    process.env.JWT_KEY as string
  );

  return token;
}
