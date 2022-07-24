FROM node:14

RUN mkdir /jakelanders

WORKDIR /jakelanders

COPY ./package.json /jakelanders

RUN npm install

COPY . /jakelanders

RUN npm run build

CMD ["npm", "start"]