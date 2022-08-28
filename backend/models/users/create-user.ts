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
const createUser = async (params: {
  id: String;
  email: String;
  password: String;
}): Promise<{ success: Number; data: Object | String }> => {
  try {
    const table = constants.tables.users;

    const { id, email, password } = params;

    // Validate
    if (!(table && id && email && password)) {
      throw `Invalid parameters passed to createUser function.`;
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
      success: 1,
      data: result,
    };
  } catch (error) {
    console.log("\n Error occured while creating user : ", error);
    throw error;
  }
};

export default createUser;
