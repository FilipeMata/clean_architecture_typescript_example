FROM node:12-alpine AS dev

ENV PATH="/application/node_modules/.bin:${PATH}"
# ENV NODE_EXTRA_CA_CERTS="/etc/ssl/certs/ca-certificates.crt"
# COPY docker/Gerencianet-CA.crt /usr/local/share/ca-certificates/Gerencianet-CA.crt
RUN apk add sudo bash ca-certificates
RUN apk add git ca-certificates bash sudo make build-base python3 libcap openssh
RUN update-ca-certificates
RUN echo "node ALL=(ALL) NOPASSWD: ALL" > /etc/sudoers.d/node && chmod 0440 /etc/sudoers.d/node
RUN setcap cap_net_bind_service=+ep /usr/local/bin/node
RUN mkdir -p /home/node/.ssh && \
  chmod 0700 /home/node/.ssh && \
  chown node:node /home/node/.ssh

CMD cd "/application" && \
  npm start
