FROM node:20-alpine as builder
# 指定工作目录方便下一阶段引用
WORKDIR /app
# 启用pnpm功能(v16+)
RUN corepack enable
# 仅复制依赖相关文件
COPY .npmrc package.json pnpm-lock.yaml .
# 安装依赖，利用docker的缓存机制
RUN --mount=type=cache,id=pnpm-store,target=/root/.pnpm-store pnpm install --frozen-lockfile
# 复制其他文件
COPY . .
# 进行打包
RUN pnpm build

FROM nginx:alpine
# 复制产物
COPY --from=builder /app/dist /usr/share/nginx/html
# 复制nginx配置
COPY --from=builder /app/.github/nginx.conf /etc/nginx/conf.d/default.conf

# 显式暴露端口
EXPOSE 80
# 启动，关闭后台运行启动前台运行，不然 docker 会结束运行
CMD ["nginx", "-g", "daemon off;"]