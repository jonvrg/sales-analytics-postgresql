import { useState } from 'react';

function InsertOrderForm({ onInsert }) {
  const [form, setForm] = useState({
    invoice_no: '',
    stock_code: '',
    product: '',
    quantity: '',
    order_date: '',
    unit_price: '',
    customer_id: '',
    country: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onInsert({
      ...form,
      quantity: Number(form.quantity),
      unit_price: Number(form.unit_price),
    });

    setForm({
      invoice_no: '',
      stock_code: '',
      product: '',
      quantity: '',
      order_date: '',
      unit_price: '',
      customer_id: '',
      country: '',
    });
  };

  return (
    <div className="card shadow-sm h-100">
      <div className="card-body">
        <h4 className="card-title mb-3">Insert New Order</h4>

        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-6">
              <input className="form-control" name="invoice_no" placeholder="Invoice No" value={form.invoice_no} onChange={handleChange} />
            </div>
            <div className="col-md-6">
              <input className="form-control" name="stock_code" placeholder="Stock Code" value={form.stock_code} onChange={handleChange} />
            </div>
            <div className="col-12">
              <input className="form-control" name="product" placeholder="Product" value={form.product} onChange={handleChange} />
            </div>
            <div className="col-md-4">
              <input className="form-control" name="quantity" placeholder="Quantity" value={form.quantity} onChange={handleChange} />
            </div>
            <div className="col-md-4">
              <input className="form-control" name="unit_price" placeholder="Unit Price" value={form.unit_price} onChange={handleChange} />
            </div>
            <div className="col-md-4">
              <input className="form-control" name="customer_id" placeholder="Customer ID" value={form.customer_id} onChange={handleChange} />
            </div>
            <div className="col-12">
              <input className="form-control" name="country" placeholder="Country" value={form.country} onChange={handleChange} />
            </div>
            <div className="col-12">
              <input className="form-control" name="order_date" placeholder="Order Date (YYYY-MM-DD HH:MM:SS)" value={form.order_date} onChange={handleChange} />
            </div>
          </div>

          <button className="btn btn-success mt-3">Insert Order</button>
        </form>
      </div>
    </div>
  );
}

export default InsertOrderForm;