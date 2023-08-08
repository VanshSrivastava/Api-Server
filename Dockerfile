FROM node:alpine

# Set working directory
WORKDIR /usr/app

# Copy package.json to working directory
COPY /src/package*.json ./

RUN npm install

# Copy all files to working directory   
COPY /src ./

COPY . .
# Expose port 3000
EXPOSE 8080

# Run npm start
CMD ["npm", "start"]


# RUN sh setup.sh