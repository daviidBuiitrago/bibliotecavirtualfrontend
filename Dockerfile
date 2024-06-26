#FROM node:lts-alpine
#ENV NODE_ENV=production
#WORKDIR /usr/src/app
#COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
#RUN npm install -g @angular/cli
#RUN npm install --production --silent && mv node_modules ../
#COPY . .
#EXPOSE 4200
#RUN chown -R node /usr/src/app
#USER node
#CMD ["npm", "start"]
FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install -g @angular/cli
RUN npm install

COPY . .

EXPOSE 4200

CMD ["ng", "serve"]
