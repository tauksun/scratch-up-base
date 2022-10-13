import { sessionFunctions } from "../../services";
import { log } from "../../helpers";

/**
 *
 * @description
 * Returns true for a valid session, & false for invalid
 */
const validateSession = async (params: {
  sessionId: string;
}): Promise<{
  session: object;
} | null> => {
  try {
    const sessionId = params.sessionId;

    const { session } = await sessionFunctions.getSession({ sessionId });

    if (!session) {
      return null;
    }

    return { session };
  } catch (error) {
    log.error({
      prefix: "Validating Session With Database",
      message: { error },
    });
    throw error;
  }
};

export default validateSession;
