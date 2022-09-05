import { hashFunctions } from "..";
import { constants } from "../../helpers";

/**
 *
 * @description
 * checks for session in redis for the passed sessionId \
 * returns sessionData if it exists, otherwise null
 */
const getSession = async (params: {
  sessionId: string;
}): Promise<{
  session: object | null;
}> => {
  try {
    const sessionId = params.sessionId;

    // Redis Session Hash Key
    const hashKey = constants.session.redisHashKey;

    const { result } = await hashFunctions.fetchField({
      key: hashKey,
      field: sessionId,
    });

    if (!result) {
      return {
        session: null,
      };
    }

    // Convert back session data to object from string
    const sessionData = JSON.parse(result);

    // Check for expiry
    const now = new Date().getTime();
    const expiryTimestamp = sessionData.expiryTimestamp;

    if (now >= expiryTimestamp) {
      // Session is already expired
      return {
        session: null,
      };
    }

    return {
      session: sessionData,
    };
  } catch (error) {
    console.log(
      "\n Error occured while getting session data from redis : ",
      error
    );
    throw error;
  }
};

export default getSession;
