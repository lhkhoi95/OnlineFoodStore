# Overview
This project is a full-stack web application for an online food store, built using Next.js for the frontend and Express.js for the backend. It features a product catalog, user authentication, shopping cart functionality, and order processing.

# Demo Images
## Home Page
![home](https://github.com/lhkhoi95/OnlineFoodStore/assets/59894272/ba99e360-2023-4c8b-8ed0-30fffb9c1117)

## Products
![products](https://github.com/lhkhoi95/OnlineFoodStore/assets/59894272/64e81361-8222-4381-b1a1-21c57fdc0214)

## Cart
![cart](https://github.com/lhkhoi95/OnlineFoodStore/assets/59894272/cf5110ad-d516-4cc7-b1fe-5f6680491fba)

## Checkout - Stripe
![checkout_stripe](https://github.com/lhkhoi95/OnlineFoodStore/assets/59894272/b95c7ed6-7acc-4763-9b1c-8e9ca189005f)

## Payment Success
![payment_success](https://github.com/lhkhoi95/OnlineFoodStore/assets/59894272/0afa71e5-dbab-4588-a78d-5aa3fcec66db)

## Project Structure

The project is divided into two main directories:

- `frontend/`: Contains the Next.js application including pages, components, and utilities for the client-side.
- `api/`: Contains the Express.js application for the backend API, including routes, models, and helpers for server-side logic.

### Frontend

- Built with Next.js
- State management using Zustand
- Styling with Tailwind CSS

### Backend

- Built with Express.js
- MongoDB for database with Mongoose ODM
- Authentication using JWT

### Features
- Product browsing
- User registration & Google Login using NextAuth
- Shoping Cart and Checkout
- Order History

## Getting Started

### Prerequisites

- Node.js
- npm or yarn
- MongoDB

### Running the Frontend

1. Navigate to the `frontend` directory:

```bash
cd frontend
```
2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```
Open http://localhost:3001 to view the application in the browser.

### Running the Backend
1. Navigate to the `api` directory:
```bash
cd api
```
2. Install dependencies:
```bash
npm install
```
3. Start the server
```bash
npm start
```
The API server will be running on http://localhost:3000

### Environmental Setup
1. Navigate to the `api` directory.
2. Rename the `.env.example` to `.env`
3. Change the DB_CONNECTION to the MongoDB collection url of your database.
4. Change the JWT_SECRET.
5. Navigate to the `frontend` directory.
6. Rename `.env.example` to `.env.local`
7. Modify the GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, and stripe keys.

