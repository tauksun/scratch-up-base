import cors, { CorsOptions } from "cors";
import { constants } from "../helpers";

const corsHandler = () => {
  const allowedOrigins = constants.allowedOrigins;

  const corsOptions: CorsOptions = {
    //@ts-ignore
    origin: function (origin: string, callback) {
      if (allowedOrigins.indexOf(origin) !== -1) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
  };

  return cors(corsOptions);
};

export default corsHandler;
