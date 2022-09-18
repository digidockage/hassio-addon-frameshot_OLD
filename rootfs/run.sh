#!/usr/bin/with-contenv bashio
# ==============================================================================
# hassio-addon-frameshot
# Runs the frameshot service
# ==============================================================================

bashio::log.info 'Starting the frameshot service...'

# Change working directory
cd /app || bashio::exit.nok 'Unable to change working directory'

# Run the frameshot service
bashio::log.info 'Executing startup script'
exec node --trace-warnings .
