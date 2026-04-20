import { useState } from 'react';

function SearchPanel({ onRunQuery }) {
  const [operation, setOperation] = useState('recent');
  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onRunQuery(operation, value);
  };

  return (
    <div className="card shadow-sm h-100">
      <div className="card-body">
        <h4 className="card-title mb-3">Search / Filter</h4>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Operation</label>
            <select
              className="form-select"
              value={operation}
              onChange={(e) => setOperation(e.target.value)}
            >
              <option value="recent">Recent Orders by Date</option>
              <option value="product">Search Product</option>
              <option value="country">Filter by Country</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Search Value</label>
            <input
              className="form-control"
              placeholder="e.g. France or WHITE HANGING HEART"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>

          <button className="btn btn-primary">Run Query</button>
        </form>
      </div>
    </div>
  );
}

export default SearchPanel;