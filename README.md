# Burak — backend

Backend for **Burak**, a restaurant ordering service. A REST API serves the React client (members, products, orders), and a server-rendered admin panel lets the restaurant manage its menu and users.

## Stack

- **Runtime:** Node.js, Express, TypeScript
- **Database:** MongoDB with Mongoose
- **Auth:** JWT in cookies for the API, sessions (stored in MongoDB) for the admin panel, bcrypt password hashing
- **Admin panel:** EJS views rendered on the server
- **Uploads:** Multer
- **Logging:** Morgan

## Project structure

```
src/server.ts          entry point: connects to MongoDB, starts the server
src/app.ts             Express app, sessions, middleware
src/router.ts          REST API used by the React client
src/router-admin.ts    server-rendered admin panel routes
src/controllers/       request handlers (member, product, order, restaurant)
src/models/            services with the business logic
src/schema/            Mongoose schemas (Member, Product, Order, OrderItem, View)
src/libs/              types, enums, utilities
src/views/             EJS templates for the admin panel
```

## Features

- Member sign-up, login and top users
- Product catalogue with search, pagination and view counting
- Orders with order items and status updates
- Admin panel: restaurant sign-up and login, product create and edit, user management

## Getting started

```bash
npm install
```

Create `.env` in the project root:

```
PORT=3003
MONGO_URL=<your MongoDB connection string>
SECRET_TOKEN=<JWT signing secret>
SESSION_SECRET=<session secret>
```

```bash
npm run start:dev
```

Build and run for production:

```bash
npm run build
npm start
```
