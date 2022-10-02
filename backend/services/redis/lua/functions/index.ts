import helloLua from "./hello-lua";

/**
 * @description
 * Add imported function name to the interface below, so that it is available
 * at other places in application through load & call functions
 * @example
 * type IluaFunctions = 'helloLua' | 'imported-function-name-here';
 *
 */
type IluaFunctions = "helloLua";

export { helloLua, IluaFunctions};
