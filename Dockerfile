# syntax = docker/dockerfile:1

ARG NODE_VERSION=20.19.4
FROM node:${NODE_VERSION}-slim AS base

WORKDIR /app

ENV NODE_ENV="production"


FROM base AS build

# NEXT_PUBLIC_* values must be inlined into the client bundle at build
# time — they're not picked up from runtime env. Pass these as
# --build-arg on `docker build`.
ARG NEXT_PUBLIC_SANITY_PROJECT_ID
ARG NEXT_PUBLIC_SANITY_DATASET
ARG NEXT_PUBLIC_SANITY_API_VERSION
ARG NEXT_PUBLIC_SITE_URL

ENV NEXT_PUBLIC_SANITY_PROJECT_ID=$NEXT_PUBLIC_SANITY_PROJECT_ID
ENV NEXT_PUBLIC_SANITY_DATASET=$NEXT_PUBLIC_SANITY_DATASET
ENV NEXT_PUBLIC_SANITY_API_VERSION=$NEXT_PUBLIC_SANITY_API_VERSION
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL

RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential node-gyp pkg-config python-is-python3

COPY package-lock.json package.json ./
RUN npm ci --include=dev

COPY . .

RUN npx next build --experimental-build-mode compile

RUN npm prune --omit=dev


FROM base

COPY --from=build /app /app

ENTRYPOINT [ "/app/docker-entrypoint.js" ]

EXPOSE 3000
CMD [ "npm", "run", "start" ]
