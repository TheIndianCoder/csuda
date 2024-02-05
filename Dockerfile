####################################################################
FROM node:alpine3.16 as csuda 
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
##### EXPOSE [Port you mentioned in the vite.config file]
#EXPOSE 80
CMD ["npm", "run", "dev"]


#  nginx block

FROM nginx:1.23-alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=csuda /app .
ENTRYPOINT [ "nginx", "-g", "daemon off;" ]

####### useful docker commands
#docker build -t [any name] .
#docker images
#docker run -d --rm -p 4173:4173 --name [name of the container] [your docker image name]
#docker ps
#docker rmi -f $(docker images -aq)