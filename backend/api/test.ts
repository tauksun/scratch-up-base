import { Request, Response, NextFunction } from "express";

import { connectToRedis, connectToPostgres } from "../helpers";

import { v4 } from "uuid";

const testRoute = (req: Request, res: Response) => {
  console.log("\n\n### Hit on test route ### \n\n");
  res.json("From test route");
};

const postyTest = (req: Request, res: Response) => {
  console.log("Hit on postyTest");
  let result: any = null;
  //

  res.json({ result });
};

const redisTest = async (req: Request, res: Response) => {
  console.log("Hit on redis TEst");
  let result: any = null;
  console.log("\n\n ### TEST ### Con to redis ");
  const redisConnection = await connectToRedis();
  console.log("\n\n ### TEST ### Write to redis ");
  const redisREsponse = await redisConnection.set("name", "Harsh");
  console.log("\n\n Got this from redis : ", redisREsponse);
  result = "Succcessfully wrote to redis : " + redisREsponse;
  res.json({ result });
};

const redisTestGETDATA = async (req: Request, res: Response) => {
  console.log("\n\n Hit on redis redisTestGETDATA");
  let result: any = null;
  console.log("\n\n ### TEST ### Con to redis ");
  const redisConnection = await connectToRedis();
  console.log("\n\n ### TEST ### GETDATA from redis ");
  const redisREsponse = await redisConnection.get("name");
  console.log("\n\n Got this from redis : ", redisREsponse);
  result = "Succcessfully got data from redis : " + redisREsponse;
  res.json({ result });
};

const postgresTest = async (req: Request, res: Response) => {
  const id = v4();
  console.log("\n\n -------- Hit on postgresTest ");
  let result: any = null;
  console.log("\n\n --------- ### TEST ### Con to postgres ");
  const postgresConnection = await connectToPostgres();
  console.log("\n\n ----------- ### TEST ### writing to postgres ");
  const postgresResponse = await postgresConnection.table("users").insert({
    id,
    email: "something@testing.com",
    password: "iamapassword",
  });
  console.log("\n\n Got this from postgres : ", postgresResponse);
  result = "Succcessfully wrote data to postgres : " + postgresResponse;
  res.json({ result });
};

export { testRoute, redisTest, redisTestGETDATA, postgresTest };
