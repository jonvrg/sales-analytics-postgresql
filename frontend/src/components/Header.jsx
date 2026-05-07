function Header() {
  return (
    <div className="mb-4">
      <h1>Sales Analytics Dashboard</h1>

      <p className="text-muted mb-2">
        PostgreSQL-backed e-commerce analytics with focus on B-tree indexing,
        query planning, and MVCC.
      </p>

      <div className="alert alert-light border mb-0">
        <strong>Dataset:</strong>{' '}
        <a
          href="https://archive.ics.uci.edu/dataset/352/online+retail"
          target="_blank"
          rel="noreferrer"
        >
          Online Retail dataset
        </a>{' '}
        from the UC Irvine Machine Learning Repository. This transactional
        dataset contains UK-based online retail orders from 2010–2011 and is
        used here to analyze sales trends and PostgreSQL query performance.
      </div>
    </div>
  );
}

export default Header;