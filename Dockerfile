FROM node:20-alpine as build
WORKDIR /app
COPY ./package.json .
COPY ./pnpm-lock.yaml .
RUN corepack enable
RUN pnpm install --registry https://registry.npmmirror.com/
COPY . .
RUN pnpm build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY --from=build /app/.github/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]