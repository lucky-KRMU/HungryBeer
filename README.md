# 🍺 HungryBeer - Full MERN Stack Platform

**HungryBeer** is a full-stack MERN (MongoDB, Express, React, Node.js) platform built with **MVC (Model-View-Controller)** architecture in the backend and an energetic **Yellow, Black & Red** themed React frontend celebrating craft brews, microbreweries, and gourmet pub food alongside classic delivery favorites.

---

## 🏛️ System Architecture (MERN + MVC)

```
Zomato/
├── backend/                       # Dedicated Node.js & Express MVC Backend
│   ├── config/                    # Database connection (Mongoose)
│   │   └── db.js
│   ├── models/                    # M (Models) in MVC
│   │   ├── User.js                # Buyer / Seller / Admin with JWT & bcrypt
│   │   ├── Restaurant.js          # Brewery / Restaurant profile & settings
│   │   ├── MenuItem.js            # Craft beers, growlers, food dishes
│   │   ├── Order.js               # Orders with live tracking status
│   │   ├── TableBooking.js        # Brewery dine-in table reservations
│   │   └── Review.js              # Ratings and customer reviews
│   ├── controllers/               # C (Controllers) in MVC
│   │   ├── authController.js      # Register, Login, Profile
│   │   ├── buyer/                 # Buyer controllers
│   │   │   ├── restaurantController.js
│   │   │   ├── orderController.js
│   │   │   ├── tableController.js
│   │   │   └── reviewController.js
│   │   └── seller/                # Seller controllers
│   │       ├── restaurantController.js
│   │       ├── menuController.js
│   │       ├── orderController.js
│   │       ├── tableController.js
│   │       └── analyticsController.js
│   ├── routes/                    # API Route declarations
│   │   ├── authRoutes.js          # /api/auth/*
│   │   ├── buyerRoutes.js         # /api/buyer/*
│   │   └── sellerRoutes.js        # /api/seller/*
│   ├── middleware/                # JWT Auth & Error Handling
│   │   ├── authMiddleware.js      # Bearer token verification & Role access
│   │   └── errorHandler.js        # Mongoose & API error formatter
│   ├── data/                      # Database seed script
│   │   └── seedData.js
│   ├── server.js                  # Express application entry point (Port 5001)
│   └── package.json
│
├── src/                           # React Frontend (Vite + Tailwind CSS)
│   ├── components/                # Modular UI components
│   ├── pages/                     # Dedicated views
│   │   ├── AuthPage.jsx           # Dedicated Login & Sign-up page
│   │   └── SellerDashboard.jsx    # Dedicated Seller Partner & Taproom portal
│   ├── services/
│   │   └── api.js                 # API client with JWT support
│   └── data/
│       └── mockData.js
```

---

## 🚀 Running the MERN Stack

### 1. Start the Backend API (Port 5001)
```bash
cd backend
npm install
node server.js
```

### 2. Seed Database (Optional)
```bash
cd backend
npm run seed
```

### 3. Start the Frontend (Port 5173)
```bash
npm install
npm run dev
```

---

## 🔌 API Endpoints Reference

### 🔐 Authentication (`/api/auth`)
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/api/auth/register` | Public | Register new user as `buyer` or `seller` |
| `POST` | `/api/auth/login` | Public | Authenticate user & get signed JWT token |
| `GET` | `/api/auth/me` | Private | Get currently authenticated profile |
| `PUT` | `/api/auth/profile` | Private | Update name, phone, or delivery address |

---

### 🛒 Buyer APIs (`/api/buyer`)
| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/api/buyer/restaurants` | Public | Search, filter (beer on tap, veg, happy hours, express), and sort |
| `GET` | `/api/buyer/restaurants/:id` | Public | Get brewery profile + full menu grouped by category |
| `POST` | `/api/buyer/orders` | Buyer | Place order with coupon discount & delivery notes |
| `GET` | `/api/buyer/orders` | Buyer | View user's order history |
| `GET` | `/api/buyer/orders/:id` | Buyer | Get live order status & delivery rider tracking |
| `PUT` | `/api/buyer/orders/:id/cancel` | Buyer | Cancel order if still in `Placed` status |
| `POST` | `/api/buyer/tables` | Buyer | Reserve a brewery table with party size & time slot |
| `GET` | `/api/buyer/tables` | Buyer | View user's table reservations |
| `POST` | `/api/buyer/reviews` | Buyer | Submit a rating & review for a restaurant |

---

### 🍻 Seller APIs (`/api/seller`)
*(Protected with JWT + role `seller` or `admin`)*

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/seller/restaurant` | Get seller's registered brewery / restaurant profile |
| `POST` | `/api/seller/restaurant` | Create or update restaurant info, cuisines, timings, address |
| `PUT` | `/api/seller/restaurant/toggle-status` | Toggle restaurant OPEN / CLOSED for orders |
| `GET` | `/api/seller/menu` | List all menu items for seller's kitchen |
| `POST` | `/api/seller/menu` | Add a new craft beer, growler, or dish |
| `PUT` | `/api/seller/menu/:id` | Update menu item details or price |
| `DELETE` | `/api/seller/menu/:id` | Delete a menu item |
| `PUT` | `/api/seller/menu/:id/toggle-stock` | Toggle item In Stock / Sold Out |
| `GET` | `/api/seller/orders` | View incoming orders (filter by status) |
| `PUT` | `/api/seller/orders/:id/status` | Update status: `Accepted` → `Preparing` → `Out for Delivery` → `Delivered` |
| `GET` | `/api/seller/tables` | View taproom table reservations |
| `PUT` | `/api/seller/tables/:id/status` | Confirm or complete table reservations |
| `GET` | `/api/seller/analytics` | Total sales revenue, orders count, table metrics, and top items |
