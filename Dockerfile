FROM node:20-alpine as builder
WORKDIR /app
COPY package.json .
COPY pnpm-lock.yaml .
COPY .npmrc .
RUN corepack enable
RUN pnpm install
COPY . .
RUN pnpm build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY --from=builder /app/.github/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]