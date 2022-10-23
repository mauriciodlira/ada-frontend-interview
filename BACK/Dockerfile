# Image to be used to serve this backend
FROM node:16

# Defines a variable not to repeat the port, and help maintanability
ARG port=5000

# Environment Variables used in express backend
ENV JWT_SECRET 4ee01ac6a4e44dfaa182e92abbad7f79
ENV DEFAULT_LOGIN letscode
ENV DEFAULT_PASSWORD lets@123
ENV API_PORT={$port}

# Working directory
WORKDIR /usr/src/app/api

# Copies all matches to working directory
COPY package*.json .

RUN npm install

# Exposes the port - which can be overriden by command line
EXPOSE $port

# Runs the server
CMD ["npm", "run", "server"]
