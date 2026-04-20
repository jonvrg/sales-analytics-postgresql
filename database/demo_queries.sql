-- Verify row count
SELECT COUNT(*) FROM orders;

-- Preview sample rows
SELECT * FROM orders LIMIT 10;

-- Indexed date-range query
EXPLAIN ANALYZE
SELECT *
FROM orders
WHERE order_date >= TIMESTAMP '2011-12-01 00:00:00'
  AND order_date < TIMESTAMP '2011-12-08 00:00:00';

-- Product substring search
EXPLAIN ANALYZE
SELECT *
FROM orders
WHERE product ILIKE '%WHITE HANGING HEART%';

-- Non-indexed filter
EXPLAIN ANALYZE
SELECT *
FROM orders
WHERE country = 'France';


--Testing creating, selecting, and deleting
SELECT *
FROM orders
WHERE invoice_no = 'TEST123';

DELETE FROM orders
WHERE invoice_no = 'TEST123';

-- Last 7 days relative to latest dataset timestamp
SELECT id, invoice_no, product, quantity, order_date, unit_price, country
FROM orders
WHERE order_date >= (
    SELECT MAX(order_date) - INTERVAL '7 days'
    FROM orders
)
ORDER BY order_date
LIMIT 50;

-- Last 30 days relative to latest dataset timestamp
SELECT id, invoice_no, product, quantity, order_date, unit_price, country
FROM orders
WHERE order_date >= (
    SELECT MAX(order_date) - INTERVAL '30 days'
    FROM orders
)
ORDER BY order_date
LIMIT 50;