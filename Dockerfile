FROM node:20

WORKDIR /app

COPY package*.json .

CMD ["npm", "install"]

COPY . .

CMD ["npm", "run", "build"]

CMD ["npm", "start"]

EXPOSE 3000