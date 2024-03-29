import { connectToPostgres, constants, log } from "../../helpers";

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
  user_id: string;
  columns: validColumns[];
}): Promise<{
  data: {
    user_id?: string;
    username?: string;
    phone_number?: string;
    profile_photo?: string;
    created_at?: string;
    updated_at?: string;
  };
}> => {
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
      data: result,
    };
  } catch (error: any) {
    log.error({
      prefix: "Fetching User Details",
      message: { error },
    });
    throw error;
  }
};

export default fetch;
