// When running with docker, backend port is 80 (set via Nginx configuration)
// To Change port for backend > make changes here & in Nginx configuration (when running with docker)

/////////////////////////////
///////// IMPORTANT ////////
////////////////////////////

// If you are running backend directly during development with "npm run start:dev" (without docker, without Nginx proxy),
// then change the below port to 4200 to connect with backend

// To set a custom port while running directly without docker & without Nginx,
// make changes here & in .env of backend
const backendPort: number = 80;

// Constants //
const constants = {
  backend: `http://localhost:${backendPort}/api`,
};

export default constants;
