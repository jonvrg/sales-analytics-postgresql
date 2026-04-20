# Sales Analytics PostgreSQL Dashboard

A PostgreSQL-backed e-commerce sales analytics dashboard built using the Online Retail dataset via UCI Machine Learning Repository. The project focuses on database internals, especially **B-tree indexing**, **query planning**, and **MVCC**, and maps those internals to user-facing application operations such as recent-order lookup, product search, country filtering, and inserting new orders.

## Tech Stack

- PostgreSQL
- pgAdmin 4
- Node.js + Express
- React + Vite
- Bootstrap

## Application Operations

The dashboard supports these main operations:

### 1. Recent Orders by Date
- Application: shows recent orders from the latest 7-day period in the dataset
- Database internals: uses a B-tree index on `order_date`
- Why it matters: enables index range scans instead of scanning the whole table

### 2. Product Search
- Application: searches products by keyword
- Database internals: product search with `ILIKE '%term%'` can trigger a sequential scan
- Why it matters: query structure affects whether an index can be used

### 3. Filter by Country
- Application: filters rows by country
- Database internals: non-indexed filter results in sequential scan / parallel sequential scan
- Why it matters: PostgreSQL must inspect many rows when no useful index exists

### 4. Insert New Order
- Application: inserts a new sales record through the dashboard
- Database internals: PostgreSQL uses MVCC to handle concurrent reads and writes
- Why it matters: supports live transaction-style workloads without heavy locking

## Notes

- The dataset is historical, so "recent" means recent **relative to the latest timestamp in the dataset**, not the current real-world date.
- If you insert test rows during development, delete them before submission/demo.
- Do **not** commit your real `.env` file to GitHub.

## Project Structure

```text
sales-analytics-postgresql/
├── backend/
│   ├── .env.example
│   ├── db.js
│   ├── package.json
│   ├── server.js
│   └── routes/
│       └── orders.js
├── database/
│   ├── OnlineRetail.csv
│   ├── schema.sql
│   ├── cleanup.sql
│   ├── indexes.sql
│   └── demo_queries.sql
├── frontend/
│   ├── package.json
│   ├── index.html
│   ├── vite.config.js
│   └── src/
└── README.md
```

## Requirements

Install these first:

- PostgreSQL
- pgAdmin 4
- Node.js and npm

## 1. Create the PostgreSQL database

Open pgAdmin and create a database named:

```sql
CREATE DATABASE sales_analytics;
```

## 2. Run the schema

Open the `sales_analytics` database in pgAdmin Query Tool and run:

- `database/schema.sql`

This creates:
- `orders_raw_text`
- `orders`

## 3. Import the dataset CSV

In pgAdmin:

1. Expand:
   - `sales_analytics`
   - `Schemas`
   - `public`
   - `Tables`
2. Right-click `orders_raw_text`
3. Choose **Import/Export Data**
4. Import `database/OnlineRetail.csv`

Recommended import settings:
- Format: `csv`
- Header: `Yes`

## 4. Clean and load the final table

Run:
- `database/cleanup.sql`
This moves cleaned rows from `orders_raw_text` into `orders`.

## 5. Create indexes

Run:
- `database/indexes.sql`

This creates:
- `idx_orders_order_date`
- `idx_orders_product`

## 6. Verify the database

Run:
- `database/demo_queries.sql`

This includes:
- row count check
- sample row preview
- `EXPLAIN ANALYZE` queries for the demo

## 7. Set up the backend

Go into the backend folder:

```bash
cd backend
npm install
```

Create a `.env` file by copying `.env.example`:

```bash
cp .env.example .env
```
Then edit `.env` and fill in your PostgreSQL password.

Start the backend:
```bash
node server.js
```

Backend runs at:

```text
http://localhost:5001
```

You can test it in the browser:
```text
http://localhost:5001/
http://localhost:5001/api/orders/recent
```

## 8. Set up the frontend

Open a new terminal:
```bash
cd frontend
npm install
npm run dev
```

Frontend runs at:
```text
http://localhost:5173
```