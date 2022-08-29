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
  user_id: String;
  username: String;
  phone_number?: String;
  profile_photo?: String;
}): Promise<{ success: Number; data: Object | String }> => {
  try {
    const table = constants.tables.user_details;

    const {
      user_id,
      username,
      phone_number = null,
      profile_photo = null,
    } = params;

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
      success: 1,
      data: result,
    };
  } catch (error) {
    console.log("\n Error occured while creating user details : ", error);
    throw error;
  }
};

export default createUserDetails;

