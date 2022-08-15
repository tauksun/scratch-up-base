import { Request, Response, NextFunction } from "express";

import { connectToRedis } from "../helpers";
import connect from "../helpers/db_functions/connectToRedis";

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

export { testRoute, redisTest, redisTestGETDATA };
