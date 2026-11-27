
function VisitorTable({ pageVisitors, activePage, handleExit, handleDelete, userRole }) {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Visitor</th>
            <th>Phone</th>
            <th>Purpose</th>
            <th>Meeting With</th>
            <th>Date</th>
            <th>Entry</th>
            <th>Exit</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {pageVisitors
            .slice(0, activePage === "Dashboard" ? 5 : undefined)
            .map((visitor) => (
              <tr key={visitor.id}>
                <td>
                  <strong>{visitor.name}</strong>
                  <small className="table-sub">
                    {visitor.organization || "Individual visitor"}
                  </small>
                </td>

                <td>{visitor.phone}</td>
                <td>{visitor.purpose}</td>
                <td>{visitor.personToMeet}</td>
                <td>{visitor.entryDate}</td>
                <td>{visitor.entryTime}</td>
                <td>{visitor.exitTime || "—"}</td>

                <td>
                  <span className={`status ${visitor.status.toLowerCase()}`}>
                    {visitor.status}
                  </span>
                </td>

              <td>
  <div className="action-buttons">
    {userRole === "Admin" && visitor.status === "Inside" && (
      <button
        className="exit-btn"
        onClick={() => handleExit(visitor.id)}
      >
        Exit
      </button>
    )}

    {userRole === "Admin" && (
      <button
        className="delete-btn"
        onClick={() => handleDelete(visitor.id)}
        title="Delete record"
      >
        Delete
      </button>
    )}
  </div>
</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default VisitorTable;

