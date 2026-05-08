import { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

function TopProductsChart() {
  const [data, setData] = useState([]);
  const [explainText, setExplainText] = useState('');
  const [showExplain, setShowExplain] = useState(false);

  useEffect(() => {
    const fetchTopProducts = async () => {
      try {
        const res = await fetch('http://localhost:5001/api/analytics/top-products');

        if (!res.ok) {
          throw new Error('Failed to fetch top products.');
        }

        const productsData = await res.json();

        const formattedData = productsData.map((row) => ({
          product:
            row.product.length > 25
              ? `${row.product.slice(0, 25)}...`
              : row.product,
          fullProduct: row.product,
          revenue: Number(row.revenue),
        }));

        setData(formattedData);
      } catch (error) {
        console.error('Error fetching top products:', error);
      }
    };

    fetchTopProducts();
  }, []);

  const fetchExplain = async () => {
    try {
      const res = await fetch('http://localhost:5001/api/explain/top-products');

      if (!res.ok) {
        throw new Error('Failed to fetch top products query plan.');
      }

      const text = await res.json();
      setExplainText(text);
      setShowExplain((prev) => !prev);
    } catch (error) {
      console.error('Error fetching top products explain:', error);
      setExplainText('Failed to fetch EXPLAIN ANALYZE output.');
      setShowExplain(true);
    }
  };

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h5 className="card-title mb-1">Top Products by Revenue</h5>
            <p className="text-muted mb-0 small">
              Highest revenue products calculated from quantity × unit price.
            </p>
          </div>

          <button className="btn btn-outline-secondary btn-sm" onClick={fetchExplain}>
            {showExplain ? 'Hide Query Plan' : 'View Query Plan'}
          </button>
        </div>

        <div style={{ width: '100%', height: 350 }}>
          <ResponsiveContainer>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="product" angle={-20} textAnchor="end" height={80} />
              <YAxis />
              <Tooltip
                formatter={(value) =>
                  Number(value).toLocaleString(undefined, {
                    style: 'currency',
                    currency: 'USD',
                  })
                }
                labelFormatter={(_, payload) => {
                  if (payload && payload.length > 0) {
                    return payload[0].payload.fullProduct;
                  }
                  return '';
                }}
              />
              <Bar dataKey="revenue" fill="#3182ce" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {showExplain && (
            <pre className="query-plan-box">
                {explainText}
            </pre>
        )}
      </div>
    </div>
  );
}

export default TopProductsChart;