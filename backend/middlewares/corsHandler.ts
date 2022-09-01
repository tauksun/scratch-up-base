import cors, { CorsOptions } from "cors";
import { constants } from "../helpers";

/**
 *
 * @description
 * Matches the origin with the allowed values from .env \
 * On mis-match, rejects with cors error
 *
 */
const corsHandler = () => {
  const allowedOrigins = constants.allowedOrigins;

  const corsOptions: CorsOptions = {
    //@ts-ignore
    origin: function (origin: string, callback) {
      // Remove !origin to block server to server access
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
  };

  return cors(corsOptions);
};

export default corsHandler;
