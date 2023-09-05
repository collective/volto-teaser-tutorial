# volto-teaser-tutorial

[Volto](https://github.com/plone/volto) add-on

## Features

## Getting started

### Try volto-teaser-tutorial with Docker

      git clone https://github.com/collective/volto-teaser-tutorial.git
      cd volto-teaser-tutorial
      make
      make start

Go to http://localhost:3000

### Add volto-teaser-tutorial to your Volto project

1. Make sure you have a [Plone backend](https://plone.org/download) up-and-running at http://localhost:8080/Plone

   ```Bash
   docker compose up backend
   ```

1. Start Volto frontend

- If you already have a volto project, just update `package.json`:

  ```JSON
  "addons": [
      "volto-teaser-tutorial"
  ],

  "dependencies": {
      "volto-teaser-tutorial": "*"
  }
  ```

- If not, create one:

  ```
  npm install -g yo @plone/generator-volto
  yo @plone/volto my-volto-project --canary --addon volto-teaser-tutorial
  cd my-volto-project
  ```

1. Install new add-ons and restart Volto:

   ```
   yarn
   yarn start
   ```

1. Go to http://localhost:3000

1. Happy editing!

## Release

See [RELEASE.md](https://github.com/eea/volto-addon-template/blob/master/RELEASE.md).

## How to contribute

See [DEVELOP.md](https://github.com/collective/volto-teaser-tutorial/blob/master/DEVELOP.md).

## Copyright and license

The Initial Owner of the Original Code is European Environment Agency (EEA).
All Rights Reserved.

See [LICENSE.md](https://github.com/eea/volto-addon-template/blob/master/LICENSE.md) for details.
