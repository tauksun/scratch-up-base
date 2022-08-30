import { connectToPostgres, constants } from "../../helpers";

/**
 *
 * @description
 * Create a user
 *
 * @example
 * createUser({
 * data : {
 *  id:<uuid>,
 *  email: <email value>,
 *  password: <password value>,
 * }
 * })
 */
const create = async (params: {
  id: string;
  email: string;
  password: string;
}): Promise<{ data: object | string }> => {
  try {
    const table = constants.tables.users;

    const { id, email, password } = params;

    // Validate
    if (!(table && id && email && password)) {
      throw `Invalid parameters passed to create function.`;
    }

    const data = {
      id,
      email,
      password,
    };

    // Get connection to db
    const connection = await connectToPostgres();

    // Insert
    const result = await connection(table).insert(data);

    return {
      data: result,
    };
  } catch (error: any) {
    console.log("\n Error occured while creating user : ", error);
    throw error;
  }
};

export default create;
