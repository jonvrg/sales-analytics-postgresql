import { useState } from 'react';

function ExplainPanel({ explainText }) {
  const [showExplain, setShowExplain] = useState(true);

  const hasExplainText = explainText && explainText.trim().length > 0;

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h3 className="mb-1">EXPLAIN ANALYZE</h3>
            <p className="text-muted mb-0 small">
            Run a query (Recent Orders by Date, Search Product, or Filter By Country) to view PostgreSQL's execution plan and performance metrics.
            </p>
          </div>

          {hasExplainText && (
            <button
              className="btn btn-outline-secondary btn-sm"
              onClick={() => setShowExplain((prev) => !prev)}
            >
              {showExplain ? 'Hide Results' : 'Show Results'}
            </button>
          )}
        </div>

        {!hasExplainText && (
          <div className="alert alert-info mb-0">
            Run a query from the Search / Filter panel to display the PostgreSQL
            query plan. This will show whether PostgreSQL used an index scan,
            sequential scan, sorting, filtering, and the total execution time.
          </div>
        )}

        {hasExplainText && showExplain && (
          <pre
            className="border rounded p-3 small mb-0"
            style={{
              backgroundColor: '#0f172a',
              color: '#e5e7eb',
              whiteSpace: 'pre-wrap',
              overflowX: 'auto',
              maxHeight: '420px',
            }}
          >
            {explainText}
          </pre>
        )}

        {hasExplainText && !showExplain && (
          <div className="alert alert-secondary mb-0">
            Query plan hidden.
          </div>
        )}
      </div>
    </div>
  );
}

export default ExplainPanel;