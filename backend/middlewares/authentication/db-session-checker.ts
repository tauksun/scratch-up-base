/**
 *
 * @description
 * Returns true for a valid session, & false for invalid
 */
const validateSession = async (params: {
  userToken: string;
}): Promise<boolean> => {
  try {
    const usertoken = params.userToken;

    let isSession = false;
    //
    // on checking with Redis > check the expiry also
    //
    // Return false for an invalid session
    
    if (!isSession) {
      return false;
    }

    // Return true for a valid session
    return true;
  } catch (error) {
    console.log("\n Error occured while validating session with db : ", error);
    throw error;
  }
};

export default validateSession;
