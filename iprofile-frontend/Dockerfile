# Etapa de build
FROM node:18 AS builder
WORKDIR /app
COPY . .
RUN apt-get update && \
    apt-get install -y net-tools && \
    apt-get clean
    
RUN npm install && npm run build

# Etapa de producción
FROM nginx:alpine
COPY --from=builder /app/dist/iprofile-frontend/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
