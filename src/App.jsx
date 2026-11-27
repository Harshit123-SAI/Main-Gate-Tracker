import { useEffect, useState } from "react";
import "./App.css";
import Sidebar from "./components/sidebar";
import StatsCard from "./components/StatsCard";
import VisitorTable from "./components/VisitorTable";
import VisitorForm from "./components/VisitorForm";
import Header from "./components/Header";
import DashboardStats from "./components/DashboardStats";
import VisitorSearch from "./components/VisitorSearch";
import Toast from "./components/Toast";
import Login from "./components/Login";
import Footer from "./components/Footer";

const STORAGE_KEY = "main-gate-tracker-visitors";

function App() {
  const [visitors, setVisitors] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [activePage, setActivePage] = useState("Dashboard");
  const [loggedIn, setLoggedIn] = useState(false);
const [userRole, setUserRole] = useState("");
  const [search, setSearch] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const [showForm, setShowForm] = useState(false);
  const [toast, setToast] = useState({
  message: "",
  type: "success",
});

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    purpose: "",
    personToMeet: "",
    organization: "",
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(visitors));
  }, [visitors]);
  useEffect(() => {
  if (!toast.message) return;

  const timer = setTimeout(() => {
    setToast({ message: "", type: "success" });
  }, 3000);

  return () => clearTimeout(timer);
}, [toast.message]);

  const today = new Date().toLocaleDateString("en-CA");

  const totalVisitorsToday = visitors.filter(
    (visitor) => visitor.entryDate === today
  ).length;

  const currentlyInside = visitors.filter(
    (visitor) => visitor.status === "Inside"
  ).length;

  const exitedVisitors = visitors.filter(
    (visitor) => visitor.status === "Exited"
  ).length;
const filteredVisitors = visitors.filter((visitor) => {
  const searchText = search.toLowerCase();

  const matchesSearch =
    visitor.name.toLowerCase().includes(searchText) ||
    visitor.phone.includes(searchText) ||
    visitor.purpose.toLowerCase().includes(searchText) ||
    visitor.personToMeet.toLowerCase().includes(searchText);

  const matchesDate = dateFilter
    ? visitor.entryDate === dateFilter
    : true;

  return matchesSearch && matchesDate;
});
  

  function handleInputChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleAddVisitor(e) {
    e.preventDefault();

    const now = new Date();

    const newVisitor = {
      id: crypto.randomUUID(),
      ...formData,
      entryDate: now.toLocaleDateString("en-CA"),
      entryTime: now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      exitTime: "",
      status: "Inside",
    };

    setVisitors((prev) => [newVisitor, ...prev]);
    setToast({
  message: "Visitor added successfully!",
  type: "success",
});

    setFormData({
      name: "",
      phone: "",
      purpose: "",
      personToMeet: "",
      organization: "",
    });

    setShowForm(false);
  }

  function handleExit(id) {
  setVisitors((prev) =>
    prev.map((visitor) =>
      visitor.id === id
        ? {
            ...visitor,
            status: "Exited",
            exitTime: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          }
        : visitor
    )
  );

  setToast({
    message: "Visitor exit marked successfully!",
    type: "success",
  });
}

  function handleDelete(id) {
  setVisitors((prev) => prev.filter((visitor) => visitor.id !== id));

  setToast({
    message: "Visitor record deleted successfully!",
    type: "success",
  });
}
function handleExportCSV() {
    if (pageVisitors.length === 0) {
      alert("No visitor records available to export.");
      return;
    }

    const headers = [
      "Name",
      "Phone",
      "Purpose",
      "Meeting With",
      "Organization",
      "Date",
      "Entry Time",
      "Exit Time",
      "Status",
    ];

    const rows = pageVisitors.map((visitor) => [
      visitor.name,
      visitor.phone,
      visitor.purpose,
      visitor.personToMeet,
      visitor.organization,
      visitor.entryDate,
      visitor.entryTime,
      visitor.exitTime,
      visitor.status,
    ]);

    const csvContent = [headers, ...rows]
      .map((row) =>
        row
          .map((value) => `"${String(value ?? "").replace(/"/g, '""')}"`)
          .join(",")
      )
      .join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "visitor-records.csv";
    link.click();

    setTimeout(() => URL.revokeObjectURL(url), 1000);
}
  const navItems = [
    "Dashboard",
    "Visitor Records",
    "Currently Inside",
    "History",
  ];
  const sortedVisitors = [...filteredVisitors].sort((a, b) => {
  if (sortOrder === "newest") {
    return new Date(`${b.entryDate} ${b.entryTime}`) -
           new Date(`${a.entryDate} ${a.entryTime}`);
  }

  return new Date(`${a.entryDate} ${a.entryTime}`) -
         new Date(`${b.entryDate} ${b.entryTime}`);
});

const pageVisitors =
  activePage === "Currently Inside"
    ? sortedVisitors.filter((visitor) => visitor.status === "Inside")
    : activePage === "History"
      ? sortedVisitors.filter((visitor) => visitor.status === "Exited")
      : sortedVisitors;
      if (!loggedIn) {
  return (
    <Login
      onLogin={(role) => {
        setUserRole(role);
        setLoggedIn(true);
      }}
    />
  );
}

  return (
    <div className="app">
      <Toast message={toast.message} type={toast.type} />
      {/* Sidebar */}
      <Sidebar
  navItems={navItems}
  activePage={activePage}
  setActivePage={setActivePage}
/>
      {/* Main Content */}
      
      <main className="main-content">
    <Header
  activePage={activePage}
  userRole={userRole}
  onLogout={() => {
    setLoggedIn(false);
    setUserRole("");
  }}
  
/>


        {/* Dashboard */}
        {activePage === "Dashboard" && (
          <>
            <section className="welcome">
              <div>
                <h2>Welcome to GateTrack</h2>
                <p>
                  Monitor visitor entries and exits from one central
                  dashboard.
                </p>
              </div>
              <div className="welcome-icon">⌂</div>
            </section>

          <DashboardStats
  totalVisitorsToday={totalVisitorsToday}
  currentlyInside={currentlyInside}
  exitedVisitors={exitedVisitors}
  totalRecords={visitors.length}
/>
          </>
        )}

        {/* Records */}
        <section className="records">
          <div className="record-header">
            <div>
              <h2>
                {activePage === "Dashboard"
                  ? "Recent Gate Records"
                  : activePage}
              </h2>
              <p>Visitor entry and exit details.</p>
            </div>

            <div className="record-actions">
  <VisitorSearch search={search} setSearch={setSearch} />
  <div className="sort-filter">
  <select
    value={sortOrder}
    onChange={(e) => setSortOrder(e.target.value)}
  >
    <option value="newest">Newest First</option>
    <option value="oldest">Oldest First</option>
  </select>
</div>
<div className="date-filter">
  <input
    type="date"
    value={dateFilter}
    onChange={(e) => setDateFilter(e.target.value)}
  />

  {dateFilter && (
    <button onClick={() => setDateFilter("")}>
      Clear Date
    </button>
  )}
</div>
  {userRole === "Admin" && (
  <button
    className="export-btn"
    onClick={handleExportCSV}
  >
    ↓ Export CSV
  </button>
)}

  {userRole === "Admin" && (
  <button
    className="primary-btn"
    onClick={() => setShowForm(true)}
  >
    + Add Visitor
  </button>
)}
</div>
          </div>
<VisitorTable
  pageVisitors={pageVisitors}
  activePage={activePage}
  handleExit={handleExit}
  handleDelete={handleDelete}
  userRole={userRole}
/>

            {pageVisitors.length === 0 && (
              <div className="empty-state">
                <div className="empty-icon">♙</div>
                <h3>No visitor records found</h3>
                <p>
                  Add a visitor or change your search to see records.
                </p>
              {userRole === "Admin" && (
  <button
    className="primary-btn"
    onClick={() => setShowForm(true)}
  >
    + Register Visitor
  </button>
)}
              </div>
            )}

        </section>

        {/* Add Visitor Modal */}
      {showForm && (
  <VisitorForm
    formData={formData}
    handleInputChange={handleInputChange}
    handleAddVisitor={handleAddVisitor}
    setShowForm={setShowForm}
  />
)}
<Footer />
      </main>
    </div>
  );
}

export default App;
