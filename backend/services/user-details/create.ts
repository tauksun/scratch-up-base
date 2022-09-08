import { connectToPostgres, constants } from "../../helpers";

/**
 *
 * @description
 * Create user details
 *
 * @example
 * createUserDetails({
 * data : {
 *  id:<uuid>,
 *  user_id: <user_id value>,
 *  username: <username value>,
 *  phone_number : <phone_number value>,
 *  profile_photo : <url value>
 * }
 * })
 */
const createUserDetails = async (params: {
  user_id: string;
  username: string;
  phone_number?: string;
  profile_photo?: string;
}): Promise<{ data: object | string }> => {
  try {
    const table = constants.tables.user_details;

    const { user_id, username, phone_number = "", profile_photo = "" } = params;

    // Validate
    if (!(table && user_id && username)) {
      throw `Invalid parameters passed to createUserDetails function.`;
    }

    const data = {
      user_id,
      username,
      phone_number,
      profile_photo,
    };

    // Get connection to db
    const connection = await connectToPostgres();

    // Insert
    const result = await connection(table).insert(data);

    return {
      data: result,
    };
  } catch (error: any) {
    console.log("\n Error occured while creating user details : ", error);
    throw error;
  }
};

export default createUserDetails;
