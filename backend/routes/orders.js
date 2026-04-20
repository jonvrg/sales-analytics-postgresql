const express = require('express');
const pool = require('../db');

const router = express.Router();

// Recent orders
router.get('/orders/recent', async (_req, res) => {
    try {
      const result = await pool.query(`
        SELECT id, invoice_no, product, quantity, order_date, unit_price, country
        FROM orders
        WHERE order_date >= (
          SELECT MAX(order_date) - INTERVAL '7 days'
          FROM orders
        )
        ORDER BY order_date DESC
        LIMIT 50
      `);
  
      res.json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to fetch recent orders.' });
    }
});

// Product search
router.get('/orders/product', async (req, res) => {
  try {
    const search = req.query.search || '';

    const result = await pool.query(
      `
      SELECT id, invoice_no, product, quantity, order_date, unit_price, country
      FROM orders
      WHERE product ILIKE $1
      ORDER BY order_date
      LIMIT 50
      `,
      [`%${search}%`]
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch product orders.' });
  }
});

// Country filter
router.get('/orders/country', async (req, res) => {
  try {
    const country = req.query.country || '';

    const result = await pool.query(
      `
      SELECT id, invoice_no, product, quantity, order_date, unit_price, country
      FROM orders
      WHERE country = $1
      ORDER BY order_date
      LIMIT 50
      `,
      [country]
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch country orders.' });
  }
});

// Insert order
router.post('/orders', async (req, res) => {
  try {
    const {
      invoice_no,
      stock_code,
      product,
      quantity,
      order_date,
      unit_price,
      customer_id,
      country,
    } = req.body;

    const result = await pool.query(
      `
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
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *
      `,
      [
        invoice_no,
        stock_code,
        product,
        quantity,
        order_date,
        unit_price,
        customer_id,
        country,
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to insert order.' });
  }
});

// EXPLAIN recent
router.get('/explain/recent', async (_req, res) => {
    try {
      const result = await pool.query(`
        EXPLAIN ANALYZE
        SELECT *
        FROM orders
        WHERE order_date >= (
          SELECT MAX(order_date) - INTERVAL '7 days'
          FROM orders
        )
      `);
  
      res.json(result.rows.map((r) => r['QUERY PLAN']).join('\n'));
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to explain recent query.' });
    }
});

// EXPLAIN product
router.get('/explain/product', async (req, res) => {
  try {
    const search = req.query.search || '';

    const result = await pool.query(
      `
      EXPLAIN ANALYZE
      SELECT *
      FROM orders
      WHERE product ILIKE $1
      `,
      [`%${search}%`]
    );

    res.json(result.rows.map((r) => r['QUERY PLAN']).join('\n'));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to explain product query.' });
  }
});

// EXPLAIN country
router.get('/explain/country', async (req, res) => {
  try {
    const country = req.query.country || '';

    const result = await pool.query(
      `
      EXPLAIN ANALYZE
      SELECT *
      FROM orders
      WHERE country = $1
      `,
      [country]
    );

    res.json(result.rows.map((r) => r['QUERY PLAN']).join('\n'));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to explain country query.' });
  }
});

module.exports = router;