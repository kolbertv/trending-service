FROM node:18.16-alpine
WORKDIR /app
COPY . .
RUN npm ci && npm cache clean --force
ENV PATH /app/node_modules/.bin:$PATH
RUN tsc
WORKDIR /app/dist
CMD ["node", "service.js"]