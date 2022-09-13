import joi from "joi";
import validationSchema from "./schema";

/**
 *
 * @description
 * Validates against a defined schema, returns the verified payload on success
 *
 * Throws validation error on failure
 *
 * Start by defining a schema under schema.ts to validate against
 *
 * @example
 * validate({
 * data:{
 * email:"iamemail@smtp.com",
 * password:"iampassword"
 * },
 * schema:"validateLoginDetails"
 * })
 */
function validate(params: { data: any; schema: string }) {
  try {
    const data = params.data;
    const schemaName = params.schema;

    // Don't check on data, as it can be a empty string, 0, null, undefined
    if (!schemaName) {
      throw `No schema passed to validate function`;
    }

    const schemaToValidateAgainst = joi.object(validationSchema[schemaName]);
    if (!schemaToValidateAgainst) {
      throw `No schema is defined for ${schemaName} in schema.ts`;
    }

    const result = schemaToValidateAgainst.validate(data);

    const error = result.error;

    if (error) {
      const detailedError = error.details?.[0]?.message;
      throw detailedError || error;
    }

    const value = result.value;
    return value;
  } catch (error) {
    console.log(`\n Error occured while validating : `, error);
    throw error;
  }
}

export default validate;
