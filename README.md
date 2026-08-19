# Stock App (TradePro)

A full-stack stock trading platform built as a Zerodha-style clone. It consists of three parts:

| Part | Port | Description |
| ---- | ---- | ----------- |
| `backend` | 3002 | Node.js / Express REST API with MongoDB, JWT authentication |
| `frontend` | 3000 | Public marketing/landing site (React + React Bootstrap) with Sign Up / Login |
| `dashboard` | 3001 | Trading dashboard (React + MUI) for holdings, orders, positions, and funds |

---

## Prerequisites

- **Node.js** (v16 or later)
- **npm** (comes with Node.js)
- **MongoDB** — a running instance or a cloud URI (e.g. MongoDB Atlas)

---

## Installation

### 1. Backend

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` folder (see `.env` variables below):

```env
PORT=3002
MONGODB_URI=mongodb://<username>:<password>@<host>:<port>/<dbname>
MONGODB_USERNAME=<username>
MONGODB_PASSWORD=<password>
JWT_SECRET=<any-long-random-string>
```

Start the API server:

```bash
npm start          # runs nodemon index.js
```

### 2. Frontend (landing site)

```bash
cd frontend
npm install
npm start          # http://localhost:3000
```

### 3. Dashboard

```bash
cd dashboard
npm install
npm start          # http://localhost:3001
```

All three parts must be running at the same time for the app to work.

---

## Project Structure

```
Stock App/
├── backend/                  # REST API server
│   ├── .env                  # config (PORT, MongoDB, JWT secret)
│   ├── index.js              # Express app + all trading endpoints
│   ├── controllers/
│   │   └── authController.js # signup + login logic (bcrypt, JWT)
│   ├── middleware/
│   │   └── authMiddleware.js # verifies JWT on protected routes
│   ├── models/               # Mongoose model wrappers
│   │   ├── UserModel.js
│   │   ├── HoldingsModel.js
│   │   ├── OrdersModel.js
│   │   ├── PositionsMode.js  # (filename kept as-is)
│   │   └── FundsModel.js
│   ├── routes/
│   │   └── authRoutes.js     # POST /auth/signup, POST /auth/login
│   └── schemas/              # Mongoose schema definitions
│       ├── UserSchema.js
│       ├── HoldingsSchema.js
│       ├── OrdersSchema.js
│       ├── PositionsSchema.js
│       └── FundsSchema.js
│
├── frontend/                 # Public landing site (React + React Bootstrap)
│   ├── public/
│   │   ├── media/images/     # static images
│   │   └── index.html        # loads Bootstrap 5 + Font Awesome CDN
│   └── src/
│       ├── index.js          # routes: /, /signup, /login, /about, /product, /pricing, /support
│       ├── index.css         # global styles + brand color (#387ed1)
│       ├── test/hero.test.js # sample component test
│       └── landing_page/
│           ├── Navbar.js     # top navigation (Bootstrap)
│           ├── Footer.js
│           ├── OpenAccount.js
│           ├── NotFound.js
│           ├── home/         # landing page sections (HomePage, Hero, Stats, Pricing, Education, Award)
│           ├── login/Login.js        # React Bootstrap login form
│           ├── signup/SignUp.js      # React Bootstrap signup form
│           ├── about/        # AboutPage, Hero, Team
│           ├── product/      # ProductPage, Hero, LeftSection, RightSection, Universe
│           ├── pricing/      # PricingPage, Hero, Brokerage
│           └── support/      # SupportPage, Hero, CreateTicket
│
└── dashboard/                # Trading dashboard (React + MUI)
    └── src/
        ├── index.js          # routes: /login, /signup, protected /*
        ├── api.js            # axios instance, baseURL :3002, JWT header
        ├── auth/
        │   ├── AuthContext.js    # token state (login/logout)
        │   ├── Login.js          # token via ?token= URL + direct login form
        │   ├── Signup.js
        │   └── ProtectedRoute.js # redirects to /login if no token
        ├── components/
        │   ├── Home.js, TopBar.js, Menu.js, Dashboard.js
        │   ├── Summary.js, Holdings.js, Orders.js, Positions.js, Funds.js
        │   ├── WatchList.js, BuyActionWindow.js (+ .css)
        │   ├── GeneralContext.js # buy/sell window state (BUY/SELL modes)
        │   ├── Apps.js, VerticalGraph.js, DoughnoutChart.js
        │   └── ...
        └── data/data.js        # static fallback data
```

---

## Data Model (MongoDB / Mongoose)

All schemas live in `backend/schemas/` (each wrapped by a model in `backend/models/`).

| Collection | Fields |
| ---------- | ------ |
| `user` | `name`, `email` (unique), `password` (bcrypt hash) |
| `holdings` | `userId` (ref user), `name`, `qty`, `avg`, `price`, `net`, `day`, timestamps |
| `positions` | `userId` (ref user), `product`, `name`, `qty`, `avg`, `price`, `net`, `day`, `isLoss`, timestamps |
| `orders` | `userId` (ref user), `name`, `qty`, `price`, `mode` (BUY/SELL), timestamps |
| `funds` | `userId` (ref user), `availableBalance`, `usedMargin`, `openingBalance`, timestamps |

Every trading document is scoped to its owner via `userId`, so each user only ever sees their own data.

---

## Application Flow

### 1. User signs up (frontend → backend)

- User submits the form on `frontend` → `/signup` (`SignUp.js`).
- `POST http://localhost:3002/auth/signup` sends `{ name, email, password }`.
- `authController.signup` validates the fields (400 if missing), checks for duplicate email (409), hashes the password with **bcrypt** (salt rounds = 10), saves the user, and returns `201`.
- The user is redirected to the login page.

### 2. User logs in (frontend → backend → dashboard)

- User submits the form on `frontend` → `/login` (`Login.js`).
- `POST http://localhost:3002/auth/login` sends `{ email, password }`.
- `authController.login` finds the user, compares the password with **bcrypt.compare**, and on success issues a **JWT** (`expiresIn: 1h`) containing `userId`, `name`, `email`.
- Both wrong-email and wrong-password cases return a generic `401 Invalid email or password`.

### 3. Token handoff between apps

- The frontend and dashboard run on different ports (`3000` / `3001`), so they do **not** share `localStorage`.
- The frontend stores the token in its own `localStorage` and redirects the browser to:

```
http://localhost:3001/login?token=<JWT>
```

- The dashboard `Login.js` reads the `token` query parameter, stores it in its own `localStorage` via `AuthContext.login()`, cleans the URL with `history.replaceState`, and navigates to the protected dashboard.
- **Alternative:** the dashboard has its own login form at `/login`, which calls `/auth/login` directly and stores the returned token — same result, no URL handoff.

### 4. Using the dashboard (dashboard → backend)

- Every request goes through `api.js` (axios instance with `baseURL: http://localhost:3002`).
- An interceptor automatically attaches the header `Authorization: Bearer <token>` from `localStorage`.
- `ProtectedRoute` blocks all routes if no token exists and redirects to `/login`.
- Backend protected endpoints (`authMiddleware`) decode the JWT (401 on missing/malformed/expired tokens) and load only the data belonging to `req.user.userId`.
- The buy/sell modal (`BuyActionWindow`, opened from the WatchList via `GeneralContext`) posts `{ name, qty, price, mode }` to `/newOrder`.

### Dashboard routes

| Path | Component | Purpose |
| ---- | --------- | ------- |
| `/` | `Summary` | Portfolio summary |
| `/orders` | `Orders` | Order history |
| `/holdings` | `Holdings` | Current holdings |
| `/positions` | `Positions` | Open positions |
| `/funds` | `Funds` | Add funds / view balance |
| `/apps` | `Apps` | App shortcuts |

---

## Backend API Endpoints

| Method | Endpoint       | Auth  | Request body            | Response / Status                         |
| ------ | -------------- | ----- | ----------------------- | ----------------------------------------- |
| POST   | `/auth/signup` | No    | `{ name, email, password }` | `201` registered; `400` missing fields; `409` duplicate email |
| POST   | `/auth/login`  | No    | `{ email, password }`   | `200` `{ token }`; `400`/`401` on bad input |
| GET    | `/allholdings` | JWT   | —                       | `200` user's holdings array               |
| GET    | `/allPositions`| JWT   | —                       | `200` user's open positions array         |
| GET    | `/allOrders`   | JWT   | —                       | `200` user's order history array          |
| POST   | `/newOrder`    | JWT   | `{ name, qty, price, mode }` | `200` placed order; `400`/`500` on failure |
| POST   | `/addFunds`    | JWT   | `{ amount }`            | `200` updated funds; `400` if `amount <= 0` (upserts the funds doc) |
| GET    | `/funds`       | JWT   | —                       | `200` `{ availableBalance, usedMargin, openingBalance }` (zeros if none) |

---

## Tech Stack

| Part | Stack |
| ---- | ----- |
| **Frontend** | React 19, React Router v7, React Bootstrap, Bootstrap 5, axios |
| **Dashboard** | React 18, React Router v6, MUI v5 (`@mui/material`), Chart.js 4 + `react-chartjs-2`, axios |
| **Backend** | Node.js, Express 5, Mongoose 9, bcrypt, jsonwebtoken, cors, dotenv, nodemon |

> Note: `passport`, `passport-local`, and `passport-local-mongoose` are listed in `backend/package.json` but are **not used** — auth is implemented with bcrypt + JWT.

---

## Testing

The frontend uses Jest + React Testing Library (`react-scripts test`):

```bash
cd frontend
npm test
```

Example: `src/test/hero.test.js` renders the homepage `Hero` and asserts the headline, subtitle, CTA button, and hero image.

---

## Security Notes

- Passwords are hashed with **bcrypt** (10 salt rounds) — never stored in plain text.
- JWTs expire after **1 hour**; expired or invalid tokens are rejected with `401`.
- The token is kept in `localStorage` and sent as `Authorization: Bearer <token>`, so the JWT is visible to any JS on the same origin (standard for this kind of demo app; a production app would prefer `httpOnly` cookies).
- The cross-port handoff passes the JWT as a URL query parameter (`?token=`), which can leak via browser history / logs — acceptable for local development.

---

## Common Commands

| Command                  | Where        | Purpose                     |
| ------------------------ | ------------ | --------------------------- |
| `npm start`              | backend      | Run API server (nodemon)    |
| `npm start`              | frontend     | Run landing site            |
| `npm start`              | dashboard    | Run trading dashboard       |
| `npm run build`          | frontend/dashboard | Create production build |
| `npm test`               | frontend     | Run tests (e.g. `test/hero.test.js`) |