#!/bin/sh -eu
if [ -z "${SERVER_HTTP_ADDRESS:-}" ]; then
    SERVER_HTTP_ADDRESS=undefined
else
    SERVER_HTTP_ADDRESS=$(jq -n --arg brand '$SERVER_HTTP_ADDRESS' '$server_http_address')
fi

cat <<EOF
window.SERVER_HTTP_ADDRESS=$SERVER_HTTP_ADDRESS;
EOF
