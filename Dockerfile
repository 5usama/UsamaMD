FROM node:lts-buster

RUN git clone https://github.com/5usama/UsamaMD

WORKDIR /app

COPY . .

RUN npm install && npm install -g pm2

EXPOSE 9090

CMD ["npm", "start"]
