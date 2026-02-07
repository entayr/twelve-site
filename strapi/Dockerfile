FROM node:18-alpine

WORKDIR /opt/app

RUN apk add --no-cache \
  python3 \
  make \
  g++ \
  vips-dev \
  libc6-compat

COPY package.json package-lock.json* yarn.lock* pnpm-lock.yaml* ./

RUN if [ -f yarn.lock ]; then yarn install --frozen-lockfile; \
    elif [ -f package-lock.json ]; then npm ci; \
    elif [ -f pnpm-lock.yaml ]; then corepack enable && pnpm i --frozen-lockfile; \
    else npm i; fi

COPY . .

RUN if [ -f yarn.lock ]; then yarn build; \
    elif [ -f package-lock.json ]; then npm run build; \
    elif [ -f pnpm-lock.yaml ]; then pnpm build; \
    else npm run build; fi

EXPOSE 1337
CMD ["sh", "-lc", "if [ -f yarn.lock ]; then yarn start; else npm run start; fi"]
