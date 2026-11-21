import StatsCard from "./StatsCard";

function DashboardStats({
  totalVisitorsToday,
  currentlyInside,
  exitedVisitors,
  totalRecords,
}) {
  return (
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
        value={totalRecords}
        icon="▤"
        color="purple"
        subtitle="All saved visitor records"
      />
    </section>
  );
}

export default DashboardStats;