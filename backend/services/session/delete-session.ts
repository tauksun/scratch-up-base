import { stringFunctions } from "..";
import { constants, log } from "../../helpers";

/**
 *
 * @description
 * Deletes the passed sessionId from redis, \
 * returns true for the successful delete
 */
const deleteSession = async (params: {
  sessionId: string;
}): Promise<{
  result: boolean;
}> => {
  try {
    const sessionId = params.sessionId;

    // Redis Session Key
    const redisSessionKey = constants.session.redisSessionKey;

    const sessionKey = `${redisSessionKey}:${sessionId}`;
    const { result } = await stringFunctions.del({ key: sessionKey });
    if (!result) {
      return {
        result: false,
      };
    }

    return {
      result: true,
    };
  } catch (error) {
    log.error({
      prefix: "Deleting Session",
      message: { error },
    });
    throw error;
  }
};

export default deleteSession;
