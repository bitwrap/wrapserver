#!/usr/bin/env bash

if [[ "${1}x" = 'x' ]] ; then
  CONTAINER_NAME='wrapfile-dev'
else
  CONTAINER_NAME=$1
fi
echo "rebuilding: ${CONTAINER_NAME}"

docker rm --force $CONTAINER_NAME &>/dev/null
docker build . -t bitwrap/wrapserver:dev

docker run -it --name=${CONTAINER_NAME} \
-e "VIRTUAL_HOST=svg.bitwrap.io" \
-p 127.0.0.1:8000:8000 \
--link bitwrap-pnml-dev:bitwrap \
-v ${HOME}:/opt/bitwrap bitwrap/wrapserver:dev
