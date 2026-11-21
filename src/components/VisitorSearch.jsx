function VisitorSearch({ search, setSearch }) {
  return (
    <div className="search-box">
      <span>⌕</span>
      <input
        type="text"
        placeholder="Search visitors..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}

export default VisitorSearch;