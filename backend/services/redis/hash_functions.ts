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
 * Creates a new field in the passed hash.
 */
const createField = async (params: {
  key: string;
  field: string;
  value: string;
}): Promise<{ result: any }> => {
  try {
    const connection = await connectToRedis();
    const { key, field, value } = params;
    const result = await connection.HSET(key, field, value);
    return { result };
  } catch (error) {
    log.error({
      prefix: "Redis : Creating Hash Field",
      message: { error },
    });
    throw error;
  }
};

/**
 *
 * @description
 * Fetches all the fields present in the passed hash
 */
const fetchAllFields = async (params: {
  key: string;
}): Promise<{
  result: any;
}> => {
  try {
    const connection = await connectToRedis();
    const { key } = params;
    const data = await connection.HGETALL(key);
    return { result: data };
  } catch (error) {
    log.error({
      prefix: "Redis : Fetching All Hash Fields",
      message: { error },
    });
    throw error;
  }
};

/**
 *
 * @description
 * Fetches the specified field from the hash
 */
const fetchField = async (params: {
  key: string;
  field: string;
}): Promise<{
  result: any;
}> => {
  try {
    const connection = await connectToRedis();
    const { key, field } = params;
    const data = await connection.HGET(key, field);
    return { result: data };
  } catch (error) {
    log.error({
      prefix: "Redis : Fetching Hash Field",
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
 * Deletes the specified field from the passed hash
 */
const deleteField = async (params: {
  key: string;
  field: string;
}): Promise<{
  result: any;
}> => {
  try {
    const connection = await connectToRedis();
    const { key, field } = params;
    const result = await connection.HDEL(key, field);
    return { result };
  } catch (error) {
    log.error({
      prefix: "Redis : Deleting Hash Field",
      message: {
        error,
      },
    });
    throw error;
  }
};

export { createField, fetchField, fetchAllFields, deleteField };
