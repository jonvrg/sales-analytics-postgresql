function SearchPanel() {
    return (
      <div className="card shadow-sm h-100">
        <div className="card-body">
          <h4 className="card-title mb-3">Search / Filter</h4>
  
          <div className="mb-3">
            <label className="form-label">Operation</label>
            <select className="form-select">
              <option>Recent Orders by Date</option>
              <option>Search Product</option>
              <option>Filter by Country</option>
            </select>
          </div>
  
          <div className="mb-3">
            <label className="form-label">Search Value</label>
            <input className="form-control" placeholder="e.g. France or WHITE HANGING HEART" />
          </div>
  
          <button className="btn btn-primary">Run Query</button>
        </div>
      </div>
    )
  }
  
  export default SearchPanel