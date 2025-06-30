FROM node:22-alpine

RUN corepack enable && corepack prepare pnpm@8.15.4 --activate

WORKDIR /app

COPY pnpm-lock.yaml package.json ./

RUN pnpm install

COPY . .

EXPOSE 3000

CMD ["pnpm", "dev", "--host", "--port", "3000"]
