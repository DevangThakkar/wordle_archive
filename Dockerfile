
# Stage 1 - build app
FROM node:17.4.0-alpine3.15 as build
WORKDIR /app
ENV NODE_ENV=dev
ENV PATH /app/node_modules/.bin:$PATH
COPY . .
RUN npm install
RUN npm run build --dev --configuration=dev && react-scripts build

# Stage 2 - copy app into unpriviledged nginx container
#FROM nginx:stable-alpine
FROM nginxinc/nginx-unprivileged:1.20-alpine
COPY --from=build /app/build /usr/share/nginx/html/wordle_archive
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
