FROM node:22.3-alpine3.20

WORKDIR /usr/src/app

# Copy package files
COPY package.json package-lock.json turbo.json tsconfig.json ./

COPY apps ./apps
COPY packages ./packages

# Install dependencies
RUN npm install

# Run database generation script
RUN npm run db:generate

# Can you filter the build down to just one app?
RUN npm run build --prefix ./apps/user-app

CMD ["npm", "run", "start-user-app"]