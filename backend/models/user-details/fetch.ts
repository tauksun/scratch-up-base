import { connectToPostgres, constants } from "../../helpers";

type validColumns =
  | "user_id"
  | "username"
  | "phone_number"
  | "profile_photo"
  | "created_at"
  | "updated_at";

/**
 *
 * @description
 * Fetch user-details by id
 * Record fetched is the latest, order by created_at
 *
 * @example
 * // By id
 * fetch({
 *  user_id:<uuid>,
 *  columns:["id","email"]
 * })
 */
const fetch = async (params: {
  user_id: String;
  columns: validColumns[];
}): Promise<{ success: Number; data: Object | String }> => {
  try {
    const table = constants.tables.user_details;

    const { user_id = null, columns = [] } = params;

    // Validate
    if (!(table && user_id)) {
      throw `Invalid parameters passed to fetch function.`;
    }

    // Get connection to db
    const connection = await connectToPostgres();

    // Fetch
    const where = {
      user_id,
    };
    const result = await connection(table)
      .select(...columns)
      .where(where)
      .orderBy("created_at", "desc")
      .first();

    return {
      success: 1,
      data: result,
    };
  } catch (error) {
    console.log("\n Error occured while fetching user details : ", error);
    throw error;
  }
};

export default fetch;
