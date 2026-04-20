function ExplainPanel({ explainText }) {
    return (
      <div className="card shadow-sm">
        <div className="card-body">
          <h4 className="card-title mb-3">EXPLAIN ANALYZE</h4>
          <pre className="explain-box">{explainText}</pre>
        </div>
      </div>
    )
  }
  
  export default ExplainPanel