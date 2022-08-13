FROM node:18.4.0
WORKDIR /code
COPY . /code/
RUN npm install
RUN npm run build
EXPOSE 4200
RUN chmod +x "./wait-for-db.sh"
ENV docker_build="true"
CMD ["npm","run","start:dock"]
