import { sessionFunctions } from "../../services";

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
    console.log("\n Error occured while validating session with db : ", error);
    throw error;
  }
};

export default validateSession;
