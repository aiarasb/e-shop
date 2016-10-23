E-Shop
===

## Quick start

1. Clone this repository.
2. Navigate to cloned directory.
3. Boot the machine up and ssh into it after the provision:

  ```
  vagrant up
  vagrant ssh
  ```
4. Install dependencies:

    ```
    npm install
    ```
5. Launch Node.js server.

    ```
    node server.js
    ```
6. Front-end part (Angular) can be reached through [http://e-shop.dev:8000](http://e-shop.dev:8000), back-end (hapi) through [http://e-shop.dev:3000](http://e-shop.dev:3000).

## Dev notes
After changes in back-end Node.js server must be restarted.
After changes in front-end TypeScript compiler must be launched.

    ```
    node_modules/.bin/tsc
    ```
