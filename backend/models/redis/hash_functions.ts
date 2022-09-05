import { connectToRedis } from "../../helpers";

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
    console.log(
      "\n Error occured while creating hash field in redis : ",
      error
    );
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
    console.log(
      "\n Error occured while fetching all hash fields from redis : ",
      error
    );
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
    console.log(
      "\n Error occured while fetching hash field from redis : ",
      error
    );
    throw error;
  }
};

const updateField = async (params: {}): Promise<any> => {
  try {
    //
  } catch (error) {
    console.log(
      "\n Error occured while updating hash field in redis : ",
      error
    );
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
    console.log(
      "\n Error occured while deleting hash field from redis : ",
      error
    );
    throw error;
  }
};

export { createField, fetchField, fetchAllFields, updateField, deleteField };
