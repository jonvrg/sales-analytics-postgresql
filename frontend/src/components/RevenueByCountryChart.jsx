import { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';

function RevenueByCountryChart() {
  const [allData, setAllData] = useState([]);
  const [excludeUK, setExcludeUK] = useState(false);
  const [explainText, setExplainText] = useState('');
  const [showExplain, setShowExplain] = useState(false);

  useEffect(() => {
    const fetchRevenueByCountry = async () => {
      try {
        const res = await fetch('http://localhost:5001/api/analytics/revenue-by-country');

        if (!res.ok) {
          throw new Error('Failed to fetch revenue by country.');
        }

        const countryData = await res.json();

        const formattedData = countryData.map((row) => ({
          country: row.country,
          revenue: Number(row.revenue),
        }));

        setAllData(formattedData);
      } catch (error) {
        console.error('Error fetching revenue by country:', error);
      }
    };

    fetchRevenueByCountry();
  }, []);

  const chartData = excludeUK
    ? allData.filter((row) => row.country !== 'United Kingdom')
    : allData;

  const formatCurrency = (value) => {
    return Number(value || 0).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });
  };

  const fetchExplain = async () => {
    try {
      const res = await fetch('http://localhost:5001/api/explain/revenue-by-country');

      if (!res.ok) {
        throw new Error('Failed to fetch revenue by country query plan.');
      }

      const text = await res.json();
      setExplainText(text);
      setShowExplain((prev) => !prev);
    } catch (error) {
      console.error('Error fetching revenue by country explain:', error);
      setExplainText('Failed to fetch EXPLAIN ANALYZE output.');
      setShowExplain(true);
    }
  };

  const colors = [
    '#3182ce',
    '#63b3ed',
    '#2b6cb0',
    '#90cdf4',
    '#4299e1',
    '#2c5282',
    '#bee3f8',
    '#1a365d',
    '#76e4f7',
    '#00b5d8',
  ];

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start mb-3">
          <div>
            <h5 className="card-title mb-1">Revenue by Country</h5>
            <p className="text-muted mb-0 small">
              Bar chart shows country ranking; pie chart shows revenue share.
            </p>

            {excludeUK && (
              <p className="text-muted mb-0 small">
                United Kingdom is excluded to make smaller country differences easier to compare.
              </p>
            )}
          </div>

          <div className="d-flex gap-2">
            <button
              className={`btn btn-sm ${excludeUK ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setExcludeUK((prev) => !prev)}
            >
              {excludeUK ? 'Include UK' : 'Exclude UK'}
            </button>

            <button className="btn btn-outline-secondary btn-sm" onClick={fetchExplain}>
              {showExplain ? 'Hide Query Plan' : 'View Query Plan'}
            </button>
          </div>
        </div>

        <div className="row g-4">
          <div className="col-lg-7">
            <h6 className="mb-2">Revenue Ranking</h6>

            <div style={{ width: '100%', height: 380 }}>
              <ResponsiveContainer>
                <BarChart
                  data={chartData}
                  layout="vertical"
                  margin={{ top: 10, right: 30, left: 30, bottom: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    type="number"
                    tickFormatter={(value) =>
                      `$${Number(value).toLocaleString('en-US')}`
                    }
                  />
                  <YAxis
                    dataKey="country"
                    type="category"
                    width={130}
                    interval={0}
                  />
                  <Tooltip formatter={(value) => formatCurrency(value)} />
                  <Bar dataKey="revenue" fill="#3182ce" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="col-lg-5">
            <h6 className="mb-2">Revenue Share</h6>

            <div style={{ width: '100%', height: 380 }}>
              <ResponsiveContainer>
              <PieChart>
                <Pie
                    data={chartData}
                    dataKey="revenue"
                    nameKey="country"
                    cx="50%"
                    cy="45%"
                    outerRadius={105}
                    label={({ country, percent }) =>
                    `${country}: ${(percent * 100).toFixed(1)}%`
                    }
                    labelLine
                >
                    {chartData.map((entry, index) => (
                    <Cell
                        key={entry.country}
                        fill={colors[index % colors.length]}
                    />
                    ))}
                </Pie>

                <Tooltip formatter={(value) => formatCurrency(value)} />
                <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {showExplain && (
          <pre className="bg-light border rounded p-3 mt-3 small">
            {explainText}
          </pre>
        )}
      </div>
    </div>
  );
}

export default RevenueByCountryChart;