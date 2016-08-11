# [gdg.es](https://gdg.es) [![Build status](https://travis-ci.org/GDGSpain/gdg.es.svg?branch=develop)](https://travis-ci.org/GDGSpain/gdg.es)

The GDG Spain official website

### Setup

To work on the GDG Spain website, clone the repository.

#### Prerequisites

Install [polymer-cli](https://github.com/Polymer/polymer-cli):

```
npm install -g polymer-cli
```

#### Install dependencies

```
npm install && bower install
```

#### Start the development server

This command serves the app at `http://localhost:8080` and provides basic URL
routing for the app:

```
polymer serve
```

#### Build

This command performs HTML, CSS, and JS minification on the application
dependencies, and generates a `service-worker.js` file with code to pre-cache
the dependencies based on the entrypoint and fragments specified in
`polymer.json`. The minified files are output to the `build/unbundled` folder,
and are suitable for serving from a HTTP/2+Push compatible server.

In addition the command also creates a fallback `build/bundled` folder,
generated using fragment bundling, suitable for serving from non
H2/push-compatible servers or to clients that do not support H2/Push.

```
gulp polymer-build
```

### License

Copyright (c) 2016 GDG Spain

This code may only be used under the MIT style license found at [LICENSE.txt](LICENSE.txt)
