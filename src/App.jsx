import { useEffect, useState } from "react";
import "./App.css";
import Sidebar from "./components/sidebar";
import StatsCard from "./components/StatsCard";
import VisitorTable from "./components/VisitorTable";
import VisitorForm from "./components/VisitorForm";
import Header from "./components/Header";

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
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);

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

    return (
      visitor.name.toLowerCase().includes(searchText) ||
      visitor.phone.includes(searchText) ||
      visitor.purpose.toLowerCase().includes(searchText) ||
      visitor.personToMeet.toLowerCase().includes(searchText)
    );
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

    setFormData({
      name: "",
      phone: "",
      purpose: "",
      personToMeet: "",
      organization: "",
    });

    setShowForm(false);
  }

  function handleExit(visitorId) {
    const now = new Date();

    setVisitors((prev) =>
      prev.map((visitor) =>
        visitor.id === visitorId
          ? {
              ...visitor,
              status: "Exited",
              exitTime: now.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }),
            }
          : visitor
      )
    );
  }

  function handleDelete(visitorId) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this visitor record?"
    );

    if (!confirmed) return;

    setVisitors((prev) => prev.filter((visitor) => visitor.id !== visitorId));
  }

  const navItems = [
    "Dashboard",
    "Visitor Records",
    "Currently Inside",
    "History",
  ];

  const pageVisitors =
    activePage === "Currently Inside"
      ? filteredVisitors.filter((visitor) => visitor.status === "Inside")
      : activePage === "History"
        ? filteredVisitors.filter((visitor) => visitor.status === "Exited")
        : filteredVisitors;

  return (
    <div className="app">
      {/* Sidebar */}
      <Sidebar
  navItems={navItems}
  activePage={activePage}
  setActivePage={setActivePage}
/>
      {/* Main Content */}
      <main className="main-content">
      <Header activePage={activePage} />

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

            <section className="stats">
  <StatsCard
    title="Total Visitors Today"
    value={totalVisitorsToday}
    icon="♙"
    color="blue"
    subtitle="Today's registered entries"
  />

  <StatsCard
    title="Currently Inside"
    value={currentlyInside}
    icon="↗"
    color="green"
    subtitle="Visitors inside premises"
  />

  <StatsCard
    title="Exited Visitors"
    value={exitedVisitors}
    icon="↙"
    color="orange"
    subtitle="Exit recorded"
  />

  <StatsCard
    title="Total Records"
    value={visitors.length}
    icon="▤"
    color="purple"
    subtitle="All saved visitor records"
  />
</section>
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
              <input
                type="search"
                placeholder="Search visitors..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <button
                className="primary-btn"
                onClick={() => setShowForm(true)}
              >
                + Add Visitor
              </button>
            </div>
          </div>
<VisitorTable
  pageVisitors={pageVisitors}
  activePage={activePage}
  handleExit={handleExit}
  handleDelete={handleDelete}
/>

            {pageVisitors.length === 0 && (
              <div className="empty-state">
                <div className="empty-icon">♙</div>
                <h3>No visitor records found</h3>
                <p>
                  Add a visitor or change your search to see records.
                </p>
                <button
                  className="primary-btn"
                  onClick={() => setShowForm(true)}
                >
                  + Register Visitor
                </button>
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
      </main>
    </div>
  );
}

export default App;
