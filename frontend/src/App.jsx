import { useState, useEffect } from 'react';
import Header from './components/Header';
import SearchPanel from './components/SearchPanel';
import InsertOrderForm from './components/InsertOrderForm';
import OrdersTable from './components/OrdersTable';
import ExplainPanel from './components/ExplainPanel';
import KpiCards from './components/KpiCards';
import RevenueOverTimeChart from './components/RevenueOverTimeChart';
import TopProductsChart from './components/TopProductsChart';

function App() {
  const [orders, setOrders] = useState([]);
  const [explainText, setExplainText] = useState('');
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState(null);

  const fetchSummary = async () => {
    try {
      const res = await fetch('http://localhost:5001/api/analytics/summary');
  
      if (!res.ok) {
        throw new Error('Failed to fetch summary.');
      }
  
      const data = await res.json();
      setSummary(data);
    } catch (error) {
      console.error('Error fetching summary:', error);
    }
  };
  
  useEffect(() => {
    fetchSummary();
  }, []);

  const runQuery = async (operation, value) => {
    setLoading(true);

    try {
      let ordersUrl = '';
      let explainUrl = '';

      if (operation === 'recent') {
        ordersUrl = `http://localhost:5001/api/orders/recent`;
        explainUrl = `http://localhost:5001/api/explain/recent`;
      } else if (operation === 'product') {
        ordersUrl = `http://localhost:5001/api/orders/product?search=${encodeURIComponent(value)}`;
        explainUrl = `http://localhost:5001/api/explain/product?search=${encodeURIComponent(value)}`;
      } else if (operation === 'country') {
        ordersUrl = `http://localhost:5001/api/orders/country?country=${encodeURIComponent(value)}`;
        explainUrl = `http://localhost:5001/api/explain/country?country=${encodeURIComponent(value)}`;
      }

      const [ordersRes, explainRes] = await Promise.all([
        fetch(ordersUrl),
        fetch(explainUrl),
      ]);

      if (!ordersRes.ok || !explainRes.ok) {
        throw new Error('Failed to fetch data from backend.');
      }

      const ordersData = await ordersRes.json();
      const explainData = await explainRes.json();

      setOrders(ordersData);
      setExplainText(explainData);
    } catch (error) {
      console.error('Error running query:', error);
      setOrders([]);
      setExplainText('Failed to fetch query results.');
    } finally {
      setLoading(false);
    }
  };

  const insertOrder = async (newOrder) => {
    try {
      const res = await fetch('http://localhost:5001/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newOrder),
      });

      if (!res.ok) {
        throw new Error('Failed to insert order.');
      }

      const inserted = await res.json();
      setOrders((prev) => [inserted, ...prev]);
      fetchSummary();
    } catch (error) {
      console.error('Error inserting order:', error);
    }
  };

  return (
    <div className="container py-4">
      <Header />

      <KpiCards summary={summary} />
      <RevenueOverTimeChart />
      <TopProductsChart />

      <div className="row g-4 mb-4">
        <div className="col-lg-6">
          <SearchPanel onRunQuery={runQuery} />
        </div>
        <div className="col-lg-6">
          <InsertOrderForm onInsert={insertOrder} />
        </div>
      </div>
  
      <div className="row g-4 mb-4">
        <div className="col-12">
          <ExplainPanel explainText={explainText} />
        </div>
      </div>
  
      <div className="row g-4">
        <div className="col-12">
          <OrdersTable orders={orders} loading={loading} />
        </div>
      </div>
    </div>
  );
}

export default App;