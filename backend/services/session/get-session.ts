import { stringFunctions } from "..";
import { constants, log } from "../../helpers";

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

    // Redis Session Key
    const redisSessionKey = constants.session.redisSessionKey;

    const sessionKey = `${redisSessionKey}:${sessionId}`;
    const { result } = await stringFunctions.fetch({
      key: sessionKey,
    });

    if (!result) {
      return {
        session: null,
      };
    }

    // Convert back session data to object from string
    const sessionData = JSON.parse(result);

    // Check for expiry //
    // Additional check, irrespective of the expiry set in redis //
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
    log.error({
      prefix: "Getting Session From Redis",
      message: { error },
    });
    throw error;
  }
};

export default getSession;
