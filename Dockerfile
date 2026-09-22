FROM node:22-alpine AS revision
RUN apk add --no-cache git
WORKDIR /source
COPY .git ./.git
RUN git rev-parse HEAD > /release-sha

FROM node:22-alpine
WORKDIR /app
ENV NODE_ENV=production PORT=8080
COPY --from=revision --chown=node:node /release-sha ./RELEASE_SHA
COPY --chown=node:node server.mjs ./
COPY --chown=node:node public ./public
USER node
EXPOSE 8080
CMD ["node", "server.mjs"]
