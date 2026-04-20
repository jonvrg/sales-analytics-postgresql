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