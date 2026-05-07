function KpiCards({ summary }) {
    const formatNumber = (value) => {
      return Number(value || 0).toLocaleString();
    };
  
    const formatCurrency = (value) => {
      return Number(value || 0).toLocaleString(undefined, {
        style: 'currency',
        currency: 'USD',
      });
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
      <div className="row g-3 mb-4">
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
    );
  }
  
  export default KpiCards;