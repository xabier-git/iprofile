FROM node:18
WORKDIR /app
COPY . .
#RUN apt-get update && \
#    apt-get install -y net-tools && \
#    apt-get clean
    
RUN npm install 
EXPOSE 3000
CMD ["node", "server.js"]
