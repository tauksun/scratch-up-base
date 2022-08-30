import { Request, Response, NextFunction } from "express";

import { connectToRedis, connectToPostgres } from "../helpers";

import { v4 } from "uuid";

import { userDetails, users } from "../models";

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
  // console.log("\n\n --------- ### TEST ### Con to postgres ");
  // const postgresConnection = await connectToPostgres();
  // console.log("\n\n ----------- ### TEST ### writing to postgres ");
  // const postgresResponse = await postgresConnection.table("users").insert({
  //   id,
  //   email: "something@testing.com",
  //   password: "iamapassword",
  // });

  result = await users.create({
    id: v4(),
    email: "harsh@kant.com",
    password: "iamapassword",
  });

  console.log("\n\n Got this from postgres : ", result);
  res.json({ result });
};

const nginxTest = (req: Request, res: Response, next: NextFunction) => {
  console.log("\n\n### Gotcha in mid ### \n\n");
  console.log(req.url);
  req.url = req.url.replace("/api", "");
  next();
};

// const getPostgresData = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     console.log("\n\n ### Hit on get postgres data ### \n\n");

//     let result: any = null;

//     console.log("\n\n --------- ### TEST ### Con to postgres ");
//     // const postgresConnection = await connectToPostgres();

//     // console.log("\n\n ----------- ### TEST ### reading from postgres ");
//     // const postgresResponse = await postgresConnection
//     //   .table("users")
//     //   .select("");
//     const query = JSON.parse(req.params.query);
//     const where = query.where;
//     const orWhere = query.orWhere;

//     const finder: {
//       table: string;
//       columns: Array<String>;
//       where?: any;
//       orWhere?: any;
//     } = {
//       table: "users",
//       columns: ["email"],
//     };

//     if (where) {
//       finder.where = where;
//     }
//     if (orWhere) {
//       finder.orWhere = orWhere;
//     }

//     const postgresResponse = await select(finder);
//     console.log("\n\n Got this from postgres : ", postgresResponse);
//     result = "Succcessfully read from  postgres : " + postgresResponse;
//     res.json({ result });
//   } catch (error) {
//     console.log("ERRRRor > ", error);
//     res.json({ error });
//   }
// };

// 27082022 //
const insertTest = async (req: Request, res: Response) => {
  try {
    console.log("\nInsert test\n");
    const email = req.params.email;
    console.log("\nparams data > ", email);
    const id = v4();
    console.log("\nInserting data ...");
    const result = await users.create({
      id,
      email,
      password: "iamapassword",
    });
    console.log("\nSuccessfully inserted ");
    res.json(result);
  } catch (error) {
    res.json({ error });
  }
};

const insertDetailsTest = async (req: Request, res: Response) => {
  try {
    console.log("\nInsert Details test\n");

    const email = req.params.email;
    const user_id = req.params.user_id;
    const username = `abara-${user_id.slice(0, 5)}`;
    const photo = `http://${new Date()}/}`;

    console.log({ email, user_id, username, photo });

    console.log("\nparams data > ", email);
    console.log("\nInserting data ...");
    const result = await userDetails.create({
      user_id,
      username,
    });
    console.log("\nSuccessfully inserted ");
    res.json(result);
  } catch (error) {
    res.json({ error });
  }
};

const getUser = async (req: Request, res: Response) => {
  try {
    console.log("\n getUser test\n");

    const email = req.params.email;
    const id = req.params.id;

    console.log({ email, id });

    console.log("\n Getting data ...");
    const result = await users.fetch({ id, columns: [] });
    console.log("\nSuccessfully found !!! > ", result);
    res.json(result);
  } catch (error) {
    res.json({ error });
  }
};

const getUserDetails = async (req: Request, res: Response) => {
  try {
    console.log("\n getUserDetails test\n");

    // const columns = req.params?.columns || [];
    const id = req.params.id;

    console.log("------", { id }, "-------");

    console.log("\n Getting data ...");
    const result = await userDetails.fetch({ user_id: id, columns: [] });
    console.log("\nSuccessfully found user-details !!! > ", result);
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
  insertTest,
  insertDetailsTest,
  getUser,
  getUserDetails,
};
