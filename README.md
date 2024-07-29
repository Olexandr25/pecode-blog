# Pecode Blog

This project is a blog application built with Nest.js for the backend and Next.js for the frontend.

## Clone the Repository

Run the following command to clone the repository:

```sh
git clone git@github.com:Olexandr25/pecode-blog.git
cd pecode-blog
```

## Install Backend Dependencies

In the first terminal, ensure you are in the `pecode-back` directory and install dependencies:

```sh
cd pecode-back
npm install
```

## Install Frontend Dependencies

In the second terminal, ensure you are in the `pecode-front` directory and install dependencies:

```sh
cd pecode-front
npm install
```

## Environment Configuration for Backend

Create a `.env` file in the `pecode-back` directory based on the example file `.env.example`:

```sh
cp .env.example .env
```

## Environment Configuration for Frontend

Create a `.env` file in the `pecode-front` directory based on the example file `.env.example`:

```sh
cp .env.example .env
```

## Start the Backend Server

In the first terminal, ensure you are in the `pecode-back` directory and start the server:

```sh
npm run start:dev
```

## Start the Frontend Server

In the second terminal, ensure you are in the `pecode-front` directory and start the server:

```sh
npm run dev
```

## Access the Applications

- **Frontend:** Open your browser and navigate to [http://localhost:3000](http://localhost:3000).
- **Backend API:** API documentation is available at [http://localhost:4000/api](http://localhost:4000/api).

## Swagger API Documentation

Swagger documentation for the API is available at [http://localhost:4000/api](http://localhost:4000/api). It provides detailed information about the available API endpoints and allows you to test them directly from the browser.

## Additional Information

This project uses Nest.js for the backend and Next.js for the frontend. To ensure everything works correctly, make sure you set up the environment variables as specified in the `.env.example` files and start the servers in the correct order.

If you have any questions or issues, please contact the project author or create an issue in the repository.
