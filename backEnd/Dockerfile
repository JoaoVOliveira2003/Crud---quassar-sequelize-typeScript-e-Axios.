FROM node:20-alpine
WORKDIR /app
COPY . .
RUN yarn install
RUN chmod +x start.sh
CMD ["sh", "start.sh"]