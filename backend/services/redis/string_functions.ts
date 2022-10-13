/**
 * @description
 * This file creates an abstract over the functions
 * provided by the redis client library,
 * such that the client library can be replaced
 * with another without affecting the project/code structure.
 */
import { connectToRedis, log } from "../../helpers";

/**
 *
 * @description
 * Creates a new string field \
 * set expiresAt to a future timestamp in milliseconds to set expiry
 * 
 * @example
 * // Sets a key(name) with expiry 
 * create({
      key:"name",
      value:"namey-namey",
      expiresAt:1665225978209
    });

 */
const create = async (params: {
  key: string;
  value: string;
  /**
   * @description
   * Timestamp in milliseconds eg : 1665225689320
   */
  expiresAt?: number;
}): Promise<any> => {
  try {
    const connection = await connectToRedis();
    const { key, value, expiresAt = null } = params;

    // String Options
    const options = {};
    // Add to string options
    if (expiresAt) {
      Object.defineProperty(options, "PXAT", {
        value: expiresAt,
        enumerable: true,
      });
    }
    const result = await connection.set(key, value, options);
    return result;
  } catch (error) {
    log.error({
      prefix: "Redis String : Create",
      message: {
        error,
      },
    });
    throw error;
  }
};

/**
 *
 * @description
 * Fetches value of the passed key
 */
const fetch = async (params: {
  key: string;
}): Promise<{
  result: any;
}> => {
  try {
    const connection = await connectToRedis();
    const { key } = params;
    const data = await connection.get(key);
    return { result: data };
  } catch (error) {
    log.error({
      prefix: "Redis String : Fetch",
      message: {
        error,
      },
    });
    throw error;
  }
};

/**
 *
 * @description
 * Deletes the passed key
 */
const del = async (params: {
  key: string;
}): Promise<{
  result: any;
}> => {
  try {
    const connection = await connectToRedis();
    const { key } = params;
    const result = await connection.del(key);
    return { result };
  } catch (error) {
    log.error({
      prefix: "Redis String : Delete",
      message: {
        error,
      },
    });
    throw error;
  }
};

export { create, fetch, del };
