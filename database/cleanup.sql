INSERT INTO orders (
    invoice_no,
    stock_code,
    product,
    quantity,
    order_date,
    unit_price,
    customer_id,
    country
)
SELECT
    "InvoiceNo",
    "StockCode",
    "Description",
    CAST(NULLIF("Quantity", '') AS INT),
    to_timestamp("InvoiceDate", 'MM/DD/YY HH24:MI'),
    CAST(NULLIF("UnitPrice", '') AS NUMERIC(10,2)),
    "CustomerID",
    "Country"
FROM orders_raw_text
WHERE "Quantity" <> 'Quantity'
  AND NULLIF("Quantity", '') IS NOT NULL
  AND NULLIF("UnitPrice", '') IS NOT NULL;day2k2