const environmentVariables = process.env;

/////////////////////////////
// Get PORT Configuration //
////////////////////////////

// Get ports, set by .env
const backend_port_in_env = environmentVariables.REACT_APP_BACKEND_PORT
  ? parseInt(environmentVariables.REACT_APP_BACKEND_PORT)
  : null;

// Get default fallback backend port, set by script when run on local environment
const default_fallback_backend_port =
  environmentVariables.REACT_APP_DEFAULT_FALLBACK_BACKEND_PORT
    ? parseInt(environmentVariables.REACT_APP_DEFAULT_FALLBACK_BACKEND_PORT)
    : null;

/////////////////////////////////////
// Get Backend HOST Configuration //
////////////////////////////////////

const backend_host_in_env = environmentVariables.REACT_APP_BACKEND_HOST || null;

const default_fallback_backend_host =
  environmentVariables.REACT_APP_DEFAULT_FALLBACK_BACKEND_HOST || null;

////////////////
// Configure //
///////////////

const backendHost: string | null =
  backend_host_in_env || default_fallback_backend_host;

const backendPort: number | null =
  backend_port_in_env || default_fallback_backend_port;

////////////////////////////////////////////
//~~~~~~~~~~~~~~ Constants ~~~~~~~~~~~~~~~//
///////////////////////////////////////////

const constants = {
  backend: `${backendHost}:${backendPort}/api`,
  logoutRoute: "logout",
};

export default constants;
