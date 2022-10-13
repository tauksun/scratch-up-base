import bcrypt from "bcryptjs";
import { constants, log } from "../../helpers";

/**
 *
 * @description
 * Returns a promise, resolving with the hash of the string passed
 *
 * @example
 * generateHash({
 * data:"i am a very secure password, indeed!"
 * })
 */
function generateHash(params: { data: string }): Promise<{
  hash: string;
}> {
  return new Promise((resolve, reject) => {
    try {
      // Data to hash
      const data = params.data;
      const saltRounds: number = constants.hash.saltRounds;
      bcrypt.genSalt(saltRounds, function (err, salt) {
        if (err) {
          log.error({
            prefix: "Generating salt for hashing",
            message: {
              error: err,
            },
          });
          return reject(err);
        }
        bcrypt.hash(data, salt, function (err, hash) {
          if (err) {
            log.error({
              prefix: "Generating Hash",
              message: {
                error: err,
              },
            });
            return reject(err);
          }
          return resolve({ hash });
        });
      });
    } catch (error: any) {
      log.error({
        prefix: "Generating Hash",
        message: { error },
      });
      reject(error);
    }
  });
}

/**
 *
 * @description
 * Returns a promise, resolving with boolean after comparing data & hash
 *
 * @example
 * compareHash({
 * data:<data to check>;
 * hash:<hash to be compared with>;
 * })
 */
function compareHash(params: { data: string; hash: string }): Promise<{
  result: boolean;
}> {
  return new Promise((resolve, reject) => {
    try {
      // Data & Hash to compare
      const data = params.data;
      const hash = params.hash;
      bcrypt.compare(data, hash, function (err, result) {
        if (err) {
          log.error({
            prefix: "Comparing data & hash",
            message: {
              error: err,
            },
          });
          return reject(err);
        }
        resolve({ result });
      });
    } catch (error: any) {
      log.error({
        prefix: "Comparing Data & Hash",
        message: { error },
      });
      return reject(error);
    }
  });
}

export { generateHash, compareHash };
