# Getting Started

## About the project

This project is for managing github issues moe effeiciently. Frontend using **React Native** and **TypeScript**. Backend using **JavaScript** and cloud database (**MongoDB** in this project) to save/update the issue-related status.

## Start backend server

1. Go to the directory.

    ```bash
    cd backend
    ```

2. Copy the `.env.example` file as `.env` and change the environment variable if needed.

    ```bash
    cp .env.example .env
    ```

3. Install the dependencies.

    ```bash
    npm install
    ```

4. Start the server.

    ```bash
    npm start
    ```

5. That's it! Now you can check the server on localhost.


## Start frontend server

1. Go to the directory. 

    ```bash
    cd frontend
    ```

2. Copy the `.env.example` file as `.env` and change the environment variable if needed.

    ```bash
    cp .env.example .env
    ```

3. Install the dependencies.

    ```bash
    yarn
    ```

3. Start the server.

    ```bash
    yarn start
    ```

4. That's it! Now you can check the server on localhost.

---

## Deploy backend server

1. Go to the directory.

    ```bash
    cd backend
    ```

2. Set the configuration and ensure choosing the correct target project for deploying

    ```bash
    gcloud init
    ```

3. Deploy to GCP

    ```bash
    gcloud app deploy
    ```

## Deploy frontend server

1. Go to the directory.

    ```bash
    cd frontend
    ```
2. Create a production build.

    ```bash
    yarn build
    ```

3. Set the configuration and ensure choosing the correct target project for deploying

    ```bash
    gcloud init
    ```

4. Deploy to GCP

    ```bash
    gcloud app deploy
    ```