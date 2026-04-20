function InsertOrderForm() {
    return (
      <div className="card shadow-sm h-100">
        <div className="card-body">
          <h4 className="card-title mb-3">Insert New Order</h4>
  
          <div className="row g-3">
            <div className="col-md-6">
              <input className="form-control" placeholder="Invoice No" />
            </div>
            <div className="col-md-6">
              <input className="form-control" placeholder="Stock Code" />
            </div>
            <div className="col-12">
              <input className="form-control" placeholder="Product" />
            </div>
            <div className="col-md-4">
              <input className="form-control" placeholder="Quantity" />
            </div>
            <div className="col-md-4">
              <input className="form-control" placeholder="Unit Price" />
            </div>
            <div className="col-md-4">
              <input className="form-control" placeholder="Customer ID" />
            </div>
            <div className="col-12">
              <input className="form-control" placeholder="Country" />
            </div>
          </div>
  
          <button className="btn btn-success mt-3">Insert Order</button>
        </div>
      </div>
    )
  }
  
  export default InsertOrderForm