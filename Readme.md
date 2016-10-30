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
5. Compile typescript
    ```
    npm run app
    ```
6. Launch Node.js server.

    ```
    npm run server
    ```
7. Front-end part (Angular) can be reached through [http://e-shop.dev:8000](http://e-shop.dev:8000), back-end (hapi) through [http://e-shop.dev:3000](http://e-shop.dev:3000).
8. (For Windows users only) Navigate to ```C:\Windows\System32\drivers\etc``` and add ```127.0.0.1 e-shop.dev``` to ```hosts``` file.

## Dev notes
- After changes in back-end Node.js server must be restarted.
- After changes in front-end TypeScript compiler must be launched.

    ```
    node_modules/.bin/tsc
    ```
- OR for easier front-end development run ```npm start```. It will automatically compile Angular after every edit.
