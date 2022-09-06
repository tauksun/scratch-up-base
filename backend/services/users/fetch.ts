import { connectToPostgres, constants } from "../../helpers";

type validColumns = "id" | "email" | "password" | "created_at" | "updated_at";

/**
 *
 * @description
 * Fetch user by id or email
 * If both are present, fetch by id is used
 *
 * @example
 * // By id
 * fetchUser({
 *  id:<uuid>,
 *  columns:["id","email"]
 * })
 *
 * // By email
 * // Pass empty array to fetch all columns
 * fetch({
 *  email:<email value>,
 *  columns:[]
 * })
 */
const fetch = async (params: {
  id?: string;
  email?: string;
  columns: validColumns[];
}): Promise<{
  data: {
    id?: string;
    email?: string;
    password?: string;
    updated_at?: string;
    created_at?: string;
  };
}> => {
  try {
    const table = constants.tables.users;

    const { id = null, email = null, columns = [] } = params;

    // Validate
    if (!(table && (id || email))) {
      throw `Invalid parameters passed to fetch function.`;
    }

    // Get connection to db
    const connection = await connectToPostgres();

    // Fetch
    const { key, value } = id
      ? { key: "id", value: id }
      : { key: "email", value: email };

    const where = {
      [key]: value,
    };
    const result: {} = await connection(table)
      .select(...columns)
      .where(where);

    return {
      data: result,
    };
  } catch (error: any) {
    console.log("\n Error occured while fetching user : ", error);
    throw error;
  }
};

export default fetch;
