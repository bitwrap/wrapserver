#!/usr/bin/env node

var budo = require('budo');

budo('./main.js', {
  serve: 'bundle.js',
  live: true,
  host: '127.0.0.1',
  port: 8001,
  wg: '**/*.{html,css,js,json}',
  stream: process.stdout,
  browserify: {
    transform: []
  }
})
