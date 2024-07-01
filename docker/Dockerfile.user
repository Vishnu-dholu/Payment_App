FROM node:20.12.0-alpine3.19

WORKDIR /usr/src/app

# Copy global package.json and other configuration files
COPY package.json package-lock.json turbo.json tsconfig.json ./

# Copy apps and packages directories
COPY apps ./apps
COPY packages ./packages

# Install dependencies
RUN npm install

# Generate the database schema (assuming the script is defined in the global package.json)
RUN npm run db:generate

# Filter the build to just one app (e.g., user-app)
RUN cd ./apps/user-app && npm run build

# Set the command to run the user app
CMD ["npm", "run", "start-user-app"]
