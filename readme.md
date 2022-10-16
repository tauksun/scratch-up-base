# Scratch-Up

A framework to generate structure  with _frontend_, _backend_, _proxy_, _database_ & _cache layer_. With maintaining focus on ease of development on local & deployment as a container system.

Initialises code & structure with basic functionalities, enabling you to focus on application logic.

Get Started with : ```npx scratch-up myApp```

Setup & Customize as per your needs.

## Configuration

- database : Postgres
- cache layer : Redis
- proxy : Nginx
- frontend : React based, Express hosted (Typescript)
- backend : Express based server (Typescript)
- Test Framework : Jest
- containerization : Docker

## Pre-Requisite

- Nodejs
- Docker & Docker-Compose
- Good Internet : First-time running ```docker-compose up``` fetches image for Postgres, Nginx, Nodejs & Redis.

## Getting Started

(__on linux : use sudo as required__)

- Setup with : ```npx scratch-up myApp```
- Start Application : ```docker-compose up```

### For Local Development

- Start _proxy_, _database_ & _cache_ with: ```docker-compose -f start--proxy-and-databases.yml up```
- Start backend :
  - Change directory to backend
  - Run : ```npm install```
  - Run: ```npm run start:dev```
- Start frontend :
  - Change directory to frontend
  - Run: ```npm install```
  - Run: ```npm run start:dev```

Code base is documented with function definitions & examples.

### Upcoming

- Tests
- Proper Documentation with website
- Admin Panel

### Contact

Write at : tauksun@gmail.com
