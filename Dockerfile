FROM node:carbon-alpine as builder

WORKDIR /workspace
COPY ./ .
RUN yarn install --ignore-optional
RUN yarn build

FROM node:carbon-alpine as runtime
ARG VERSION
ENV VERSION $VERSION

WORKDIR /opt/game
COPY --from=builder /workspace/dist ./
RUN chmod +x start.js

CMD ["./start.js"]
