FROM node:22-alpine
WORKDIR /app
ARG RELEASE_SHA=unknown
ENV NODE_ENV=production PORT=8080 RELEASE_SHA=$RELEASE_SHA
COPY --chown=node:node server.mjs ./
COPY --chown=node:node public ./public
USER node
EXPOSE 8080
CMD ["node", "server.mjs"]
