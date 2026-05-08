import { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

function RevenueOverTimeChart() {
  const [data, setData] = useState([]);
  const [explainText, setExplainText] = useState('');
  const [showExplain, setShowExplain] = useState(false);

  useEffect(() => {
    const fetchRevenueData = async () => {
      try {
        const res = await fetch('http://localhost:5001/api/analytics/revenue-over-time');

        if (!res.ok) {
          throw new Error('Failed to fetch revenue data.');
        }

        const revenueData = await res.json();

        const formattedData = revenueData.map((row) => ({
          order_day: new Date(row.order_day).toLocaleDateString(),
          revenue: Number(row.revenue),
        }));

        setData(formattedData);
      } catch (error) {
        console.error('Error fetching revenue over time:', error);
      }
    };

    fetchRevenueData();
  }, []);

  const fetchExplain = async () => {
    try {
      const res = await fetch('http://localhost:5001/api/explain/revenue-over-time');

      if (!res.ok) {
        throw new Error('Failed to fetch explain output.');
      }

      const text = await res.json();
      setExplainText(text);
      setShowExplain((prev) => !prev);
    } catch (error) {
      console.error('Error fetching revenue explain:', error);
      setExplainText('Failed to fetch EXPLAIN ANALYZE output.');
      setShowExplain(true);
    }
  };

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h5 className="card-title mb-1">Revenue Over Time</h5>
            <p className="text-muted mb-0 small">
              Daily revenue calculated from quantity × unit price.
            </p>
          </div>

          <button className="btn btn-outline-secondary btn-sm" onClick={fetchExplain}>
            {showExplain ? 'Hide Query Plan' : 'View Query Plan'}
          </button>
        </div>

        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="order_day" />
              <YAxis />
              <Tooltip
                formatter={(value) =>
                  Number(value).toLocaleString(undefined, {
                    style: 'currency',
                    currency: 'USD',
                  })
                }
              />
              <Line type="monotone" dataKey="revenue" strokeWidth={2} dot={false} />
            </LineChart>
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

export default RevenueOverTimeChart;