import { Request, Response, NextFunction } from "express";

import { connectToRedis, connectToPostgres } from "../helpers";

import { v4 } from "uuid";

import { insert, select } from "../models/postgres";

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

const nginxTest = (req: Request, res: Response, next: NextFunction) => {
  console.log("\n\n### Gotcha in mid ### \n\n");
  console.log(req.url);
  req.url = req.url.replace("/api", "");
  next();
};

const getPostgresData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("\n\n ### Hit on get postgres data ### \n\n");

    let result: any = null;

    console.log("\n\n --------- ### TEST ### Con to postgres ");
    // const postgresConnection = await connectToPostgres();

    // console.log("\n\n ----------- ### TEST ### reading from postgres ");
    // const postgresResponse = await postgresConnection
    //   .table("users")
    //   .select("");
    const query = JSON.parse(req.params.query);
    const where = query.where;
    const orWhere = query.orWhere;

    const finder: {
      table: string;
      columns: Array<String>;
      where?: any;
      orWhere?: any;
    } = {
      table: "users",
      columns: ["email"],
    };

    if (where) {
      finder.where = where;
    }
    if (orWhere) {
      finder.orWhere = orWhere;
    }

    const postgresResponse = await select(finder);
    console.log("\n\n Got this from postgres : ", postgresResponse);
    result = "Succcessfully read from  postgres : " + postgresResponse;
    res.json({ result });
  } catch (error) {
    console.log("ERRRRor > ", error);
    res.json({ error });
  }
};

// 27082022 //
const insertTest = async (req: Request, res: Response) => {
  try {
    console.log("\nInsert test\n");
    const email = req.params.email;
    console.log("\nparams data > ", email);
    const id = v4();
    console.log("\nInserting data ...");
    const result = await insert({
      table: "",
      data: [
        {
          id,
          email: email,
          password: "iamapassword-hehe",
        },
      ],
    });
    console.log("\nSuccessfully inserted ");
    res.json(result);
  } catch (error) {
    res.json({ error });
  }
};

export {
  testRoute,
  redisTest,
  redisTestGETDATA,
  postgresTest,
  nginxTest,
  getPostgresData,
  insertTest,
};
