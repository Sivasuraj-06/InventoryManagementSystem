# Inventory Management Dashboard

Build and deploy a complete full-stack Inventory Management Dashboard application using Next.js, Redux, Node.js, and AWS.

This project provides a step-by-step implementation of a full-stack inventory system using:
- **Next.js** for the frontend
- **Tailwind CSS** for styling
- **Material UI Data Grid** for advanced table handling
- **Redux Toolkit** and **Redux Toolkit Query** for state management and data fetching

The backend is powered by **Node.js** with **Prisma ORM**, connected to a **PostgreSQL database**.

AWS services are integrated, including:
- RDS (database)
- EC2 (compute)
- API Gateway
- Amplify (frontend hosting)
- S3 (storage)

---
## Live Demo

You can access the deployed application here:

**Deployed App:**  
https://master.d115tpy17nl4ew.amplifyapp.com/dashboard

---

## Overview

This is a full-stack inventory management application with a responsive and theme-aware dashboard to track:
- Products
- Sales
- Expenses
- Users

The project follows a **monorepo structure**:
- `client` → Next.js frontend
- `server` → Express.js backend

---

## Features

- **Interactive Dashboard**
  - Displays sales, purchases, and expenses using charts and stat cards

- **Product Management**
  - Add, search, and view products

- **Inventory Overview**
  - Data grid with product details (price, rating, stock)

- **Expense Tracking**
  - Category-wise expense analysis with filters

- **User Management**
  - View all registered users

- **Responsive Design**
  - Works across devices

- **Dark / Light Mode**
  - Theme switching support

---

## Tech Stack

### Frontend
- Next.js
- React
- TypeScript
- Redux Toolkit
- Tailwind CSS
- Recharts
- Material UI Data Grid

### Backend
- Node.js
- Express.js
- TypeScript
- Prisma ORM
- PostgreSQL

### Infrastructure (AWS)
- RDS
- EC2
- API Gateway
- Amplify
- S3

---

## Project Structure

```text
.
├── client/     # Frontend (Next.js)
└── server/     # Backend (Express.js)
    └── prisma/
        ├── migrations/
        ├── seedData/
        └── schema.prisma

```

## Getting Started

### Prerequisites

-   Node.js (v18+)
-   npm
-   PostgreSQL

------------------------------------------------------------------------

## 1. Clone the Repository

``` bash
git clone https://github.com/Sivasuraj-06/InventoryManagementSystem.git
cd InventoryManagementSystem
```

------------------------------------------------------------------------

## 2. Configure Backend (Server)

``` bash
cd server
npm install
```

### Environment Variables

Create a `.env` file:

``` env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
PORT=3001
```

### Run Migrations

``` bash
npx prisma migrate dev
```

### Seed Database

``` bash
npm run seed
```

### Start Server

``` bash
npm run dev
```

Backend runs on: http://localhost:3001

------------------------------------------------------------------------

## 3. Configure Frontend (Client)

``` bash
cd client
npm install
```

### Environment Variables

Create a `.env.local` file:

``` env
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001
```

### Start Client

``` bash
npm run dev
```

Frontend runs on: http://localhost:3000

------------------------------------------------------------------------

## API Endpoints

| Method | Endpoint     | Description                          |
|--------|-------------|--------------------------------------|
| GET    | /dashboard  | Fetch dashboard metrics              |
| GET    | /products   | Get all products (with search)       |
| POST   | /products   | Create a product                     |
| GET    | /users      | Get all users                        |
| GET    | /expenses   | Get expenses grouped by category     |
