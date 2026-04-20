import Header from './components/Header'
import SearchPanel from './components/SearchPanel'
import InsertOrderForm from './components/InsertOrderForm'
import OrdersTable from './components/OrdersTable'
import ExplainPanel from './components/ExplainPanel'

function App() {
  const sampleOrders = [
    {
      id: 1,
      invoice_no: '536365',
      product: 'WHITE HANGING HEART T-LIGHT HOLDER',
      quantity: 6,
      order_date: '2010-12-01 08:26:00',
      unit_price: 2.55,
      country: 'United Kingdom',
    },
    {
      id: 2,
      invoice_no: '536365',
      product: 'WHITE METAL LANTERN',
      quantity: 6,
      order_date: '2010-12-01 08:26:00',
      unit_price: 3.39,
      country: 'United Kingdom',
    },
  ]

  const sampleExplain = `Index Scan using idx_orders_order_date on orders
Index Cond: ((order_date >= '2011-12-01 00:00:00') AND (order_date < '2011-12-08 00:00:00'))
Execution Time: 6.323 ms`

  return (
    <div className="container py-4">
      <Header />

      <div className="row g-4 mb-4">
        <div className="col-lg-6">
          <SearchPanel />
        </div>
        <div className="col-lg-6">
          <InsertOrderForm />
        </div>
      </div>

      <div className="row g-4">
        <div className="col-lg-8">
          <OrdersTable orders={sampleOrders} />
        </div>
        <div className="col-lg-4">
          <ExplainPanel explainText={sampleExplain} />
        </div>
      </div>
    </div>
  )
}

export default App