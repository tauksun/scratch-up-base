FROM node:18.4.0
WORKDIR /code
COPY . /code/
RUN npm install
EXPOSE 3200
ENV docker_build="true"
CMD ["npm","run","dock"]
COPY package.json ./.env* /code/dist-server/