function StatsCard({ title, value, icon, color, subtitle }) {
  return (
    <div className="stat-card">
      <div className="stat-top">
        <span>{title}</span>
        <div className={`stat-icon ${color}`}>{icon}</div>
      </div>

      <h2>{value}</h2>

      {subtitle && <p>{subtitle}</p>}
    </div>
  );
}

export default StatsCard;