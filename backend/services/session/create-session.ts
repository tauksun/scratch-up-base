import { stringFunctions } from "..";
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

    // Session Key
    const redisSessionKey = constants.session.redisSessionKey;

    // Generate unique session id
    const v4 = uuid.v4;
    const uniqueSessionId = v4();

    // Calculate endTimestamp of session expiry
    const now = new Date().getTime();
    const expiryInMilliseconds = constants.session.expiryInSeconds * 1000;

    const expiryTimestamp = now + expiryInMilliseconds;

    // Session Data //
    // Storing expiry timestamp in sessionData, allows to
    // do add logic based on expiry
    // while retrieving session (saving extra call)
    // eg : refresh session, prompt user to elongate session entering password again...
    const sessionData = JSON.stringify({
      userId,
      expiryTimestamp,
    });

    const sessionKey = `${redisSessionKey}:${uniqueSessionId}`;

    // Create session in redis
    await stringFunctions.create({
      key: sessionKey,
      value: sessionData,
      expiresAt: expiryTimestamp,
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
