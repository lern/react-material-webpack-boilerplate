# webpack/react-starter

This repo began as a GitHub fork of [webpack/react-starter](https://github.com/webpack/react-starter).

It is a boilerplate for quickly starting React/Webpack/MaterialUI projects. It features lightning fast development ala live reload.

The main differences from the original repo are:

- Data layer has been stripped out (not needed for static sites).
- Integrated Material UI [callemall/material-ui](https://github.com/callemall/material-ui).
- Created a basic Material UI project with site navigation and a couple of sample pages.


## Installation

Just clone this repo and change the `origin` git remote.

``` text
npm install
```


## Hot Module Replacement development server

``` text
# start the webpack-dev-server in HMR mode
npm run hot-dev-server
# wait for the first compilation

# in another terminal/console
# start the node.js server in development mode
npm run start-dev

# open this url in your browser
http://localhost:8080/
```


## Production compilation and server

``` text
# build the client bundle and the prerendering bundle
npm run build

# start the node.js server in production mode
npm run start

# open this url in your browser
http://localhost:80/
```


## License

Copyright (c) 2012-2015 Tobias Koppers [![Gittip donate button](http://img.shields.io/gittip/sokra.png)](https://www.gittip.com/sokra/)

MIT (http://www.opensource.org/licenses/mit-license.php)
