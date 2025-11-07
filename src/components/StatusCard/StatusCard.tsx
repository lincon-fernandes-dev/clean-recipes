const StatsCard: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: string;
}> = ({ icon, label, value }) => (
  <div className="bg-card border border-border rounded-xl p-4 flex items-center space-x-3 hover:shadow-md transition-shadow duration-300">
    <div className="p-2 bg-primary bg-opacity-10 rounded-lg text-primary">
      {icon}
    </div>
    <div>
      <p className="text-2xl font-bold text-primary">{value}</p>
      <p className="text-sm text-secondary">{label}</p>
    </div>
  </div>
);
export default StatsCard;
