Photo Journal App
=================

This app allows you to upload images and group them by day, or city (future). It is journal-like in the sense that you can add a short description either per day, per picture, or both.

## The Stack ##

| Component       | Tech                |
| :-------------- |:------------------- |
| Backend         | Node.js             |
| Template Engine | Jade                |
| Architecture    | RESTful API exposed |
| Frontend        | Pure JavaScript     |

## Working on this Project ##

1. Clone repo:

    ```bash
    git clone https://github.com/cdavis27/photo-journal-app.git
    ```

2. Install dependency packages:

    ```bash
    npm install && bower install
    ```

3. Ensure your local MongoDB server is running (in a different terminal):

    ```bash
    mongod
    ```

    *Note: mongo database location can be set in `config/database.js`*

4. Run the NodeJS app by running:

    ```bash
    node app
    ```

    Alternatively, use `nodemon` to auto-detect when server files are changed:

    ```bash
    npm install nodemon --global
    nodemon app
    ```