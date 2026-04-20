-- Drop final table first, then raw table (full reset if exists)
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS orders_raw_text;

-- Raw import table: matches CSV columns as text
CREATE TABLE orders_raw_text (
    "InvoiceNo" TEXT,
    "StockCode" TEXT,
    "Description" TEXT,
    "Quantity" TEXT,
    "InvoiceDate" TEXT,
    "UnitPrice" TEXT,
    "CustomerID" TEXT,
    "Country" TEXT
);

-- Final cleaned application table
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    invoice_no TEXT,
    stock_code TEXT,
    product TEXT,
    quantity INT,
    order_date TIMESTAMP,
    unit_price NUMERIC(10,2),
    customer_id TEXT,
    country TEXT
);