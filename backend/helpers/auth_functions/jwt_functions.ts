import jsonwebtoken from "jsonwebtoken";
import { constants, log } from "../../helpers";

/**
 *
 * @description
 * Returns a promise, resolving with token
 *
 * Signs with default (HMAC SHA256)
 *
 * Optional : Set expiresIn to the seconds after which token should expire,
 *  defaults to one day i.e, 86400
 *
 * @example
 * generateJWT({
 * data:{
 * userId:"1234-5678-abcd-efgh",
 * }
 * })
 *
 * // Expire in 15mins
 * generateJWT({
 * data:{
 * userId:"1234-5678-abcd-efgh",
 * expiresIn: 900
 * }
 * })
 */
function generateJWT(params: {
  data: object | string;
  expiresIn?: number;
}): Promise<{
  token: string;
}> {
  return new Promise((resolve, reject) => {
    try {
      const data = params.data;
      const jwtSecretKey = constants.jwt.secretKey;
      const defaultExpiresIn = constants.jwt.defaultExpiresIn;
      const expiresIn = Math.floor(params.expiresIn || defaultExpiresIn);

      // Call Asynchronously
      jsonwebtoken.sign(data, jwtSecretKey, { expiresIn }, (err, token) => {
        if (err) {
          return reject(err);
        }
        if (!token) {
          return reject(`Error while generating token : ${{ token }}`);
        }
        resolve({ token });
      });
    } catch (error: any) {
      log.error({
        prefix: "Generating Token",
        message: { error },
      });
      reject(error);
    }
  });
}

/**
 * @description
 * Verifies the signature of the token & resolves with the payload after decoding
 *
 * @example
 * verifyJWT({
 * token:"<token value>"
 * })
 */
function verifyJWT(params: { token: string }): Promise<{
  payload: jsonwebtoken.JwtPayload | string;
}> {
  return new Promise((resolve, reject) => {
    try {
      const token = params.token;
      const jwtSecretKey = constants.jwt.secretKey;
      jsonwebtoken.verify(token, jwtSecretKey, (err, decoded) => {
        if (err) {
          return reject(err);
        }
        if (!decoded) {
          return reject(
            `Error while verifying token : ${{ payload: decoded }}`
          );
        }
        return resolve({
          payload: decoded,
        });
      });
    } catch (error: any) {
      log.error({
        prefix: "Verifying Token",
        message: { error },
      });
      reject(error);
    }
  });
}

/**
 * @description
 * Decodes token WITHOUT verifying signature
 *
 * Don't use this to verify authenticity of a token, instead use verifyJWT
 *
 * @example
 * decodeJWT({
 * token:"<token value>"
 * })
 */
function decodeJWT(params: { token: string }) {
  try {
    const token = params.token;
    const decodedPayload = jsonwebtoken.decode(token);
    return {
      payload: decodedPayload,
    };
  } catch (error: any) {
    log.error({
      prefix: "Decoding Token",
      message: { error },
    });
    throw error;
  }
}

export { generateJWT, verifyJWT, decodeJWT };
