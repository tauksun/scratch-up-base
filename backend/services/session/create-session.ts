import { hashFunctions } from "..";
import { constants } from "../../helpers";
import * as uuid from "uuid";

/**
 *
 * @description
 * creates session in redis for the passed userId \
 * returns unique sessionId for each user
 */
const createSession = async (params: {
  userId: string;
}): Promise<{
  session: {
    id: string;
  };
}> => {
  try {
    const userId = params.userId;

    // Session Hash Key
    const hashKey = constants.session.redisHashKey;

    // Generate unique session id
    const v4 = uuid.v4;
    const uniqueSessionId = v4();

    // Calculate endTimestamp of session expiry
    const now = new Date().getTime();
    const expiryInMilliseconds = constants.session.expiryInSeconds * 1000;

    const expiryTimestamp = now + expiryInMilliseconds;

    // Session Data
    const sessionData = JSON.stringify({
      userId,
      expiryTimestamp,
    });

    // Create session in redis
    await hashFunctions.createField({
      key: hashKey,
      field: uniqueSessionId,
      value: sessionData,
    });

    return {
      session: {
        id: uniqueSessionId,
      },
    };
  } catch (error) {
    console.log("\n Error occured while creating session in redis : ", error);
    throw error;
  }
};

export default createSession;
