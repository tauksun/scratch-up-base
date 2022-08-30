import bcrypt from "bcryptjs";
import { constants } from "../../helpers";

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
          console.log(
            "\nError occured while generating salt for hashing : ",
            err
          );
          return reject(err);
        }
        bcrypt.hash(data, salt, function (err, hash) {
          if (err) {
            console.log("\nError occured while generating hash : ", err);
            return reject(err);
          }
          return resolve({ hash });
        });
      });
    } catch (error: any) {
      console.log("\n Error occured during generating hash : ", error);
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
          console.log("\n Error while comparing data & hash : ", err);
          return reject(err);
        }
        resolve({ result });
      });
    } catch (error: any) {
      console.log("\n Error occured while comparing data & hash : ", error);
      return reject(error);
    }
  });
}

export { generateHash, compareHash };
