import { connectToPostgres } from "../../helpers";

interface Params {
  table: String;
  columns: Array<String>; // Empty array fetches all columns
}

interface Result {
  success: Number;
  data: Object | String;
}

/**
 *
 * @description
 * Fetches columns from the passed table
 *  
 * To fetch all columns : pass an empty array
 *
 * @example
 * select({
 * table : "<table name here>",
 * columns : ["<column 1 here>","<column 2 here>"]
 * })
 */
const select = async (params: Params): Promise<Result> => {
  try {
    const passedParams = params;

    const table = passedParams.table;
    const columns = passedParams.columns;

    // Validate
    if (!(table && columns)) {
      throw `No ${
        table ? "columns parameter" : "table name"
      } passed to select function.`;
    }

    // Get connection to db
    const connection = await connectToPostgres();

    // Select
    const result = await connection.table(table).select(...columns);

    return {
      success: 1,
      data: result,
    };
  } catch (error) {
    console.log("\n Error occured while getting data from postgres : ", error);
    throw error;
  }
};

export default select;
