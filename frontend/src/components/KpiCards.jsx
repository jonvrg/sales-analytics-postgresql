import { useState } from 'react';

function KpiCards({ summary }) {
  const [explainText, setExplainText] = useState('');
  const [showExplain, setShowExplain] = useState(false);

  const formatNumber = (value) => {
    return Number(value || 0).toLocaleString();
  };

  const formatCurrency = (value) => {
    return Number(value || 0).toLocaleString(undefined, {
      style: 'currency',
      currency: 'USD',
    });
  };

  const fetchExplain = async () => {
    try {
      const res = await fetch('http://localhost:5001/api/explain/summary');

      if (!res.ok) {
        throw new Error('Failed to fetch KPI query plan.');
      }

      const text = await res.json();
      setExplainText(text);
      setShowExplain((prev) => !prev);
    } catch (error) {
      console.error('Error fetching KPI explain:', error);
      setExplainText('Failed to fetch EXPLAIN ANALYZE output for KPI summary.');
      setShowExplain(true);
    }
  };

  if (!summary) {
    return (
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <p className="mb-0 text-muted">Loading summary metrics...</p>
        </div>
      </div>
    );
  }

  const cards = [
    {
      label: 'Total Revenue',
      value: formatCurrency(summary.total_revenue),
    },
    {
      label: 'Total Orders',
      value: formatNumber(summary.total_orders),
    },
    {
      label: 'Quantity Sold',
      value: formatNumber(summary.total_quantity),
    },
    {
      label: 'Avg Line Value',
      value: formatCurrency(summary.avg_line_value),
    },
    {
      label: 'Avg Unit Price',
      value: formatCurrency(summary.avg_unit_price),
    },
  ];

  return (
    <div className="mb-4">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h5 className="mb-0">Key Performance Indicators</h5>

        <button className="btn btn-outline-secondary btn-sm" onClick={fetchExplain}>
          {showExplain ? 'Hide KPI Query Plan' : 'View KPI Query Plan'}
        </button>
      </div>

      <div className="row g-3">
        {cards.map((card) => (
          <div className="col-md" key={card.label}>
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <p className="text-muted mb-1 small">{card.label}</p>
                <h4 className="mb-0">{card.value}</h4>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showExplain && (
        <pre className="bg-light border rounded p-3 mt-3 small">
          {explainText}
        </pre>
      )}
    </div>
  );
}

export default KpiCards;