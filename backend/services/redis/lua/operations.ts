import { connectToRedis, log, constants } from "../../../helpers";
import * as luaFunctions from "./functions";
/**
 *
 * @description
 * Load lua function/s on the redis instance
 *
 * @example
 * // Loads "helloLua" function in default library set in constants
 * load({
 * functions:["helloLua"],
 * options:{
 * replace:true // This replaces the previous code for the library
 * }
 * })
 *
 * // Loads "helloCustomLuaFunction" function in library : "myCustomLib"
 * load({
 * functions:["helloCustomLuaFunction"],
 * library:"myCustomLib",
 * options:{
 * replace:true // This replaces the previous code for the library
 * }
 * })
 */
const load = async (params: {
  functions: luaFunctions.IluaFunctions[];
  /**
   * @description
   * This defines a library, in which the passed function will be registered \
   * __Defaults to library set by helpers/constants : redisDefaultLuaLibrary __
   */
  library?: string;
  options: {
    /**
     * @description
     * Set to true, to replace the library code \
     * default to false
     */
    replace?: boolean;
  };
}): Promise<boolean> => {
  try {
    const connection = await connectToRedis();
    const { functions, options } = params;
    const library = params.library || constants.redisDefaultLuaLibrary;
    const replaceLibraryCode = options.replace || false;

    let libraryCode = `#!lua name=${library}`;

    for (let func of functions) {
      // Get function code
      const functionCode = luaFunctions[func];
      // Register function in the library
      const registerFunction = `redis.register_function(
      '${func}',
      ${functionCode}
    )`;
      libraryCode += `\n${registerFunction}`;
    }

    await connection.functionLoad(libraryCode, {
      REPLACE: replaceLibraryCode,
    });

    return true;
  } catch (error) {
    log.error({
      prefix: "Lua Functions : load",
      message: {
        error,
      },
    });
    return false;
  }
};

/**
 * 
 * @description
 * Returns list of loaded functions & their respective libraries
 */
const list = async (): Promise<
  {
    functionName: string;
    library: string;
  }[]
> => {
  try {
    const connection = await connectToRedis();
    const functionsList = [];
    const functionListResponse = await connection.functionList();

    for (let libraryData of functionListResponse) {
      const library = libraryData.libraryName;
      for (let funcs of libraryData.functions) {
        functionsList.push({
          functionName: funcs.name,
          library,
        });
      }
    }

    return functionsList;
  } catch (error) {
    log.error({
      prefix: "Lua Functions : list",
      message: {
        error,
      },
    });
    return [];
  }
};

/**
 * 
 * @description
 * Execute a loaded function
 */
const call = async (params: {
  functionName: luaFunctions.IluaFunctions;
}): Promise<any> => {
  try {
    const connection = await connectToRedis();
    const functionName = params.functionName;
    const response = await connection.fCall(functionName);
    return response;
  } catch (error) {
    log.error({
      prefix: "Lua Functions : call",
      message: {
        error,
      },
    });
    return error;
  }
};
export { load, list, call };
