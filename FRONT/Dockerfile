FROM node:16

WORKDIR /usr/src/app/ui

COPY package*.json ./

RUN npm i -g @angular/cli @angular-devkit/build-angular && npm install

EXPOSE 4201

CMD ["npm", "start"]
