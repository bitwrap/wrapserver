#!/usr/bin/env bash


if [[ "x${APIKEY}" = 'x' ]] ; then
    export APIKEY='DEADBEEFDEADBEEF'
fi

if [[ "x${ENDPOINT}" = 'x' ]] ; then
    export ENDPOINT='http://127.0.0.1:8080'
  npm run dev
else
  npm run start
fi
