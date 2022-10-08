const environmentVariables = process.env;

// Check if running with docker, variable set by script //
const docker_run = environmentVariables.REACT_APP_DOCKER_BUILD;

/////////////////////////////
// Get PORT Configuration //
////////////////////////////

// Get ports, set by .env
const docker_port_in_env = environmentVariables.REACT_APP_DOCKER_PORT
  ? parseInt(environmentVariables.REACT_APP_DOCKER_PORT)
  : null;

// Get default fallback docker port
const default_fallback_docker_port =
  environmentVariables.REACT_APP_DOCKER_FALLBACK_PORT
    ? parseInt(environmentVariables.REACT_APP_DOCKER_FALLBACK_PORT)
    : null;

const backend_port_in_env = environmentVariables.REACT_APP_BACKEND_PORT
  ? parseInt(environmentVariables.REACT_APP_BACKEND_PORT)
  : null;

// Get default backend port, set by script when run on local environment
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

let backendHost: string | null =
  backend_host_in_env || default_fallback_backend_host;

let backendPort: number | null;
if (docker_run) {
  backendPort = docker_port_in_env || default_fallback_docker_port;
} else {
  backendPort = backend_port_in_env || default_fallback_backend_port;
}

// Constants //
const constants = {
  backend: `${backendHost}:${backendPort}/api`,
  logoutRoute: "logout",
};

export default constants;
