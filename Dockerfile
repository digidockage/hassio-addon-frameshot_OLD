# Build arguments
ARG BUILD_FROM=ghcr.io/hassio-addons/base:12.2.4

ARG BUILD_ARCH
ARG BUILD_DATE
ARG BUILD_DESCRIPTION
ARG BUILD_NAME
ARG BUILD_REF
ARG BUILD_REPOSITORY
ARG BUILD_VERSION

# Base docker image
FROM ${BUILD_FROM}

# Install required OS extra packages
RUN apk add --no-cache \
      nodejs npm \
      chromium

# Create app directory
RUN mkdir -p /app
WORKDIR /app

# Copy project files
COPY rootfs /
COPY data /app/data
COPY server /app/server
COPY package.json /app/package.json

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium
ENV CHROME_PATH=/usr/bin/chromium

# Install app dependencies
# the install is retry threee times with a pause of 10 seconds
RUN for i in 1 2 3; \
    do \
      npm config set unsafe-perm true \
      && npm install \
        --no-audit \
        --omit=dev \
        --omit=optional \
        --no-update-notifier \
        --unsafe-perm \
      && npm cache clear --force \
      && npm ls --prod;\
      sleep 10; \
      ([ $i -eq 3 ] && exit 1) || true; \
    done;

# Labels
LABEL \
    io.hass.name="${BUILD_NAME}" \
    io.hass.description="${BUILD_DESCRIPTION}" \
    io.hass.arch="${BUILD_ARCH}" \
    io.hass.type="addon" \
    io.hass.version=${BUILD_VERSION} \
    maintainer="Sgobbi Federico <federico@sgobbi.it>"

# Health check
HEALTHCHECK CMD curl --fail http://127.0.0.1:3000 || exit 1

EXPOSE 3000

CMD node .
