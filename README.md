# Wrapserver

[![Build Status](https://travis-ci.org/bitwrap/wrapserver.svg?branch=master)](https://travis-ci.org/bitwrap/wrapserver)

Render SVG graphics for bitwrap state machines using Node.js Express and browserify.

[![live example](https://svg.bitwrap.io/v1/octoe/000000000.svg?ref=wrapserver-github-readme)](https://bitwrap.io/#octothorpe)

Example from our tic-tac-to demo https://bitwrap.io/#octothorpe
#### Features

* ServerSide - render svg graphics using javascript templates and jsdom
* Browser - compiles into bundle.js for drawing svg widgets in browser

* Aws-Lambda - render svg using API gateway & Lambda
  * NOTE: it's recommended to set the Memory Resource settings to >= 448 to keep render time < 1 sec

#### Development Notes

* nodemon - can used for auto-reloading
* npm run budo - run the budo dev server w/ autoreload
