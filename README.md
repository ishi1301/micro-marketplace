🛍️ Micro Marketplace App

A full-stack micro marketplace app built with Node.js, Express, MongoDB, React (Vite), and React Native.

✨ Features

🔑 Authentication

User registration & login (JWT based)

Password hashing using bcrypt

🛍️ Products

Create, Read, Update, Delete products

Search + pagination

❤️ Favorites

Add/remove favorite products

🎨 UI

Responsive design

Clean product cards

Smooth navigation

⚙️ Tech Stack

Frontend: React (Vite), Axios, React Router
Backend: Node.js, Express
Database: MongoDB Atlas
Mobile: React Native (Expo)

🧪 API Endpoints
POST /auth/register
POST /auth/login

GET /products
POST /products
GET /products/:id
PUT /products/:id
DELETE /products/:id

POST /favorites/:id
DELETE /favorites/:id
GET /favorites

▶️ Run Locally
Backend
cd backend
npm install
npm run dev

Frontend
cd web
npm install
npm run dev

Seed Script

Run the following to populate database:
cd backend  
node seed.js

🚀 Live Links

🌐 Frontend: https://micro-marketplace.vercel.app

🔗 Backend API: https://marketplace-backend-ezd4.onrender.com

🔐 Test Credentials

Email: xyz@text.com  

Password: xyz



