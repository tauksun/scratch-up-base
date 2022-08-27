import { connectToPostgres } from "../../helpers";

interface Params {
  table: String;
  data: Array<Object> | Object;
}

interface Result {
  success: Number;
  data: Object | String;
}

/**
 *
 * @description
 * Inserts data into passed table
 *
 * To insert multiple rows : pass an array of objects (where each object represents a row)
 *
 * @example
 * insert({
 * table : "<table name here>",
 * data : {
 *  <column 1>:<value 1>,
 *  <column 2>:<value 2>,
 * }
 * })
 *
 * @example // To insert multiple rows
 * insert({
 * table : "<table name here>",
 * data :[
 * {
 *  <column 1>:<value 1>,
 *  <column 2>:<value 2>,
 * },
 * {
 *  <column 1>:<value 1>,
 *  <column 2>:<value 2>,
 * }
 * ]
 * })
 */
const insert = async (params: Params): Promise<Result> => {
  try {
    const passedParams = params;

    const table = passedParams.table;
    const data = passedParams.data;

    // Validate
    if (!(table && data)) {
      throw `No ${
        table ? "data parameter" : "table name"
      } passed to insert function.`;
    }

    // Get connection to db
    const connection = await connectToPostgres();

    // Insert
    const result = await connection(table).insert(data);

    return {
      success: 1,
      data: result,
    };
  } catch (error) {
    console.log("\n Error occured while inserting data in postgres : ", error);
    throw error;
  }
};

export default insert;
