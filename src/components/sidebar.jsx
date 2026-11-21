
function Sidebar({ navItems, activePage, setActivePage }) {
  return (
    <aside className="sidebar">
      <div className="logo">
        <div className="logo-icon">G</div>
        <div>
          <h2>GateTracker</h2>
          <span>Visitor Management</span>
        </div>
      </div>

      <div className="nav-heading">MENU</div>

      <nav>
        {navItems.map((item) => (
          <button
            key={item}
            className={`nav-item ${activePage === item ? "active" : ""}`}
            onClick={() => setActivePage(item)}
          >
            {item}
          </button>
        ))}
      </nav>

      <div className="sidebar-bottom">
        <div className="sidebar-footer-icon">G</div>
        <div>
          <strong>Gate Management</strong>
          <p>Visitor Control System</p>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
