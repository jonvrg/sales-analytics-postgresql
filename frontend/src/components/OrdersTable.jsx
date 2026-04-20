function OrdersTable({ orders }) {
    return (
      <div className="card shadow-sm">
        <div className="card-body">
          <h4 className="card-title mb-3">Orders</h4>
          <div className="table-responsive">
            <table className="table table-striped table-sm align-middle">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Invoice</th>
                  <th>Product</th>
                  <th>Qty</th>
                  <th>Date</th>
                  <th>Price</th>
                  <th>Country</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.invoice_no}</td>
                    <td>{order.product}</td>
                    <td>{order.quantity}</td>
                    <td>{order.order_date}</td>
                    <td>{order.unit_price}</td>
                    <td>{order.country}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
  
  export default OrdersTable