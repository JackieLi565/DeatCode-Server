import { sign, verify } from "jsonwebtoken";
import dotenv from "dotenv";
import { CookieType } from "../types/cookie";
dotenv.config();

const jwtKey = process.env.JWT_KEY as string;

export default function handleJWT(id: string) {
  const token = sign(
    {
      exp: Math.floor(Date.now() / 1000) + 7200, //2 hours
      id,
    },
    jwtKey
  );

  return token;
}

export function verifyJWT(cookie: string): CookieType {
  const jwt = verify(cookie, jwtKey) as CookieType;

  if (!jwt) throw new Error("Invalid JWT");

  return jwt;
}
