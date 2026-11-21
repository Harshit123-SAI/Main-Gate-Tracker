function Header({ activePage }) {
  return (
    <header className="topbar">
      <div>
        <h1>{activePage}</h1>
        <p>Manage and monitor gate visitor activity.</p>
      </div>

      <div className="profile">
        <div className="avatar">A</div>
        <div>
          <strong>Gate Administrator</strong>
          <small>Administrator</small>
        </div>
      </div>
    </header>
  );
}

export default Header;