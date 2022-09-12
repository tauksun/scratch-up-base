/**
 * As best practice, replace any with the schemas & their structure as per your requirements
 */

import joi from "joi";
const validationSchema: any = {
  signUp: {
    email: joi.string().required(),
    password: joi.string().min(8).required(),
    username: joi.string().required(),
  },
  signIn: {
    email: joi.string().required(),
    password: joi.string().min(8).required(),
    username: joi.string().optional(),
  },
};

export default validationSchema;
