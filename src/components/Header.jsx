
function Header({ activePage, userRole, onLogout }) {
  return (
    <header className="topbar">
      <div>
        <h1>{activePage}</h1>
        <p>ABESEC Ghaziabad</p>
        <p>Manage and monitor gate visitor activity.</p>
      </div>

      <div className="profile">
        <div className="avatar">
          {userRole === "Admin" ? "A" : "S"}
        </div>

        <div>
          <strong>
            {userRole === "Admin" ? "Gate Administrator" : "Student"}
          </strong>
          <small>{userRole}</small>
        </div>

        <button className="logout-btn" onClick={onLogout}>
          Logout
        </button>
      </div>
    </header>
  );
}

export default Header;
