# 🍫 Choco - 10-Minute Hyper-Local Delivery Platform

Choco is a high-performance, hyper-local instant (10-minute) delivery platform. Built with a modern technical stack featuring **Next.js 16 (App Router)**, **React 19**, **Drizzle ORM**, **PostgreSQL**, and **Tailwind CSS v4**, Choco implements the complex mechanics of real-time inventory allocation, pincode-based dark-store routing, and automated courier dispatching.

---

## 🚀 Architectural Overview & Order Lifecycle

Choco leverages a hyper-local logistics engine. Instead of querying a global catalog, the system determines product availability and dispatch capability based on the customer's geographical location (pincode). 

The diagram below details the end-to-end flow of order placement, local warehouse routing, real-time stock verification, and automated driver dispatch:

---

## 🛠️ Tech Stack & Dependencies

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Framework** | [Next.js 16.0.3 (App Router)](file:///c:/choco-10MinDelivery-Nextjs/package.json#L41) | Server-side rendering, API routes, and optimized routing |
| **Frontend Runtime** | [React 19.2.0](file:///c:/choco-10MinDelivery-Nextjs/package.json#L47) | Concurrent UI rendering and component architecture |
| **Database ORM** | [Drizzle ORM v0.44.7](file:///c:/choco-10MinDelivery-Nextjs/package.json#L39) | Type-safe SQL schema definition and query generation |
| **Database** | PostgreSQL | Relational database storage with indexation support |
| **State Management** | [TanStack React Query v5](file:///c:/choco-10MinDelivery-Nextjs/package.json#L33) | Client-side caching, optimistic state updates, and polling |
| **Authentication** | [NextAuth v4.24.13](file:///c:/choco-10MinDelivery-Nextjs/package.json#L42) | Secure authentication with Google OAuth integration |
| **Security Layer** | Custom Middleware | Role-Based Access Control (RBAC) protecting admin paths |
| **Styling & UI** | Tailwind CSS v4 & Radix UI | Utility-first styling with responsive, accessible primitives |
| **Validation** | Zod | Runtime type safety and schema validation (API & Forms) |

---

## 🏗️ Core Engineering Challenges & Solutions

### 1. Pincode-Based Dark-store Mapping
* **Complexity**: Delivery must happen within 10 minutes, necessitating micro-fulfillment centers (dark-stores) serving strict local zones.
* **Implementation**: The [`warehouses`](file:///c:/choco-10MinDelivery-Nextjs/src/lib/db/schema.ts#L27) table maps specific dark-stores to service areas via pincode columns. A database index is maintained on the `pincode` field to allow sub-millisecond retrieval of the dispatching warehouse during checkout.

### 2. Regional Inventory Partitioning
* **Complexity**: Stock values differ by location. E.g., chocolate might be in stock in Warehouse A but completely depleted in Warehouse B.
* **Implementation**: The [`inventories`](file:///c:/choco-10MinDelivery-Nextjs/src/lib/db/schema.ts#L62) table acts as a join table linking individual product SKUs to specific warehouse locations. The order endpoint performs verification against localized stock tables before finalizing transactions, avoiding order-cancellation overheads.

### 3. Automated Courier Dispatch
* **Complexity**: Instant delivery requires immediately securing a courier.
* **Implementation**: When an order passes stock validation, the system queries the [`deliveryPersons`](file:///c:/choco-10MinDelivery-Nextjs/src/lib/db/schema.ts#L52) table for a courier who is registered at that matching warehouse and is not currently delivering another order (`orderId` is null). This partner is immediately bound to the order ID, locking their availability state.

### 4. Admin Middleware and Protected Client Routing
* **Complexity**: Administrative dashboards must be inaccessible to standard customers.
* **Implementation**: Built a custom authorization middleware layer in [`proxy.ts`](file:///c:/choco-10MinDelivery-Nextjs/src/proxy.ts) using NextAuth JWT inspection. It matches all paths under `/admin/:path*` and checks `token.role === "admin"`. If a user fails the check, routing is blocked at the edge.

---

## 📁 Repository Structure

```
choco-10MinDelivery-Nextjs/
├── drizzle/                     # Drizzle SQL migration files
├── public/                      # Static assets and uploaded product assets
│   └── assets/                  # Product images uploaded by administrators
├── src/
│   ├── app/                     # Next.js App Router (Routing Pages & APIs)
│   │   ├── (client)/            # E-commerce frontend portal (Pages & Components)
│   │   │   ├── product/[id]/    # Pincode validation & Single Product view
│   │   │   └── _components/     # Modular client widgets (Hero, Header, Footer)
│   │   ├── admin/               # Administrator Console
│   │   │   ├── products/        # Product administration (CRUD panel)
│   │   │   ├── warehouses/      # Dark-store setup
│   │   │   ├── deliver-persons/ # Fleet registry management
│   │   │   ├── orders/          # Live order monitors
│   │   │   └── inventories/     # SKU Stock tracking
│   │   └── api/                 # Next.js Serverless API endpoints
│   ├── components/              # Shared reusable components (Shadcn UI)
│   ├── http/                    # Axios clients & React Query API wrappers
│   │   ├── client.ts            # Network client configuration
│   │   └── api.ts               # Server endpoint contract hooks
│   ├── lib/
│   │   ├── auth/                # NextAuth session rules & OAuth hooks
│   │   ├── db/                  # Drizzle client, Connection pool, & Schemas
│   │   └── validators/          # Zod schema definitions for request parsing
│   ├── provider/                # Session & Query Context Providers
│   ├── types/                   # Ambient TypeScript declaration files
│   └── proxy.ts                 # NextAuth Middleware route protection Rules
├── drizzle.config.ts            # Configuration rules for migrations
├── migrate.ts                   # Drizzle standalone execution migration runner
├── package.json                 # Project manifest & command scripts
└── tsconfig.json                # TypeScript configurations
```

---

## 🗄️ Database Entity-Relationship Model

The PostgreSQL database structure is managed entirely through Drizzle schemas located in [`src/lib/db/schema.ts`](file:///c:/choco-10MinDelivery-Nextjs/src/lib/db/schema.ts). Below is a mapping of how the relations are structured:

* **`users`**: Contains account profiles (FName, LName, Email, Provider, Avatar Image) and user `role` (defaulting to `"customer"`, updatable to `"admin"`).
* **`products`**: Catalog table storing product name, description, price, and local asset image path.
* **`warehouses`**: Dark-stores indexed by their serviceable `pincode`.
* **`orders`**: Links a `userId` to a `productId` with delivery details (quantity, address, status, and pincode).
* **`deliveryPersons`**: Fleet agents stationed at a specific `warehouse_id`. Includes a nullable reference to `order_id` indicating their current dispatch load.
* **`inventories`**: Tracks stock units (SKUs) of a specific `product_id` located inside a `warehouse_id`. Includes an optional linkage to an `orders_id` to bind inventory units to specific checkout records.

---

## ⚙️ Development Setup Guide

Follow these steps to run a copy of this project locally.

### 1. Prerequisites
Ensure you have the following installed on your machine:
* **Node.js** (v18.x or v20.x+ recommended)
* **PostgreSQL** database server running locally or hosted online (e.g. Supabase, Neon)

### 2. Project Installation
Clone the repository and install the project dependencies:
```bash
npm install
```

### 3. Setup Environment Variables
Create a file named `.env.local` in the project root directory. Use the structure provided in the [`.env.example`](file:///c:/choco-10MinDelivery-Nextjs/.env.example) file:
```env
DATABASE_URL=postgresql://username:password@localhost:5432/choco_db
NEXT_PUBLIC_BACKEND_URL=http://localhost:3000/api
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret
NEXTAUTH_SECRET=your-random-generated-secret-string
NEXTAUTH_URL=http://localhost:3000
```
> [!NOTE]
> Make sure to replace the values above with your local database connection credentials and Google Cloud Developer Console credentials.

### 4. Database Migrations
Run the following scripts to generate and run Drizzle migrations:

* **Generate Migration files**: parses schema updates and writes SQL migration scripts to the `drizzle/` directory:
  ```bash
  npm run db:generate
  ```

* **Execute Migrations**: applies the SQL changes directly to your PostgreSQL database:
  ```bash
  npm run db:run
  ```

### 5. Running the Application
Start the Next.js development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to interact with the customer landing portal, and navigate to `/admin` to access the administrator command center (Google account authentication required).
