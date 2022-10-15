FROM node:18.4.0
WORKDIR /code
COPY . /code/
RUN npm install
RUN npm run build
COPY package.json ./.env* /code/dist/
EXPOSE 4200
ENV docker_build="true"
CMD ["npm","run","start:dock"]
