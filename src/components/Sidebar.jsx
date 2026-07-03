import { NavLink } from 'react-router-dom';

const menuItems = [
  { label: 'Dashboard', to: '/dashboard', icon: '📊' },
  { label: 'My Courses', to: '/learning', icon: '📚' },
  { label: 'My Projects', to: '/project', icon: '🗂️' },
  { label: 'My Groups', to: '/groups', icon: '👫🏻' },
  { label: 'Achievements', to: '/achievements', icon: '🏆' }
];

export default function Sidebar() {
  return (
    <aside className="card menu">
      <h3>Menu</h3>
      {menuItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) => `menu-item ${isActive ? 'active' : ''}`}
        >
          <span className="menu-icon">{item.icon}</span>
          <span>{item.label}</span>
        </NavLink>
      ))}
      <div className="menu-divider"></div>
      <div className="menu-progress">
        <p className="progress-label">Weekly Goal</p>
        <div className="progress-bar-wrap">
          <div className="progress-bar-fill w-68"></div>
        </div>
        <p className="progress-pct">68% complete</p>
      </div>
    </aside>
  );
}
